// Product handlers and route registration.
// Create is public; reads are public.
import express, { Request, Response } from 'express';
import multer from 'multer';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../services/auth';
import { uploadToS3, deleteFromS3, getKeyFromUrl } from '../services/s3';

const store = new ProductStore();

// Configure multer for memory storage (file buffer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Only accept images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

/** Get all products, optionally filtered by category */
const index = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;
    const products = category
      ? await store.indexByCategory(category)
      : await store.index();
    res.json(products);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

/** Get one product by id */
const show = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params.id;
    const product = await store.show(productId);
    res.json(product);
  } catch (err) {
    const error = err as Error;
    if (error.message.includes('not found')) {
      res.status(404).json(error.message);
    } else {
      res.status(400).json(error.message);
    }
  }
};

/** Create a new product */
const create = async (req: Request, res: Response) => {
  try {
    const p: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct = await store.create(p);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

/** Update a product */
const update = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params.id;
    const p: Partial<Product> = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const updatedProduct = await store.update(productId, p);
    res.json(updatedProduct);
  } catch (err) {
    const error = err as Error;
    if (error.message.includes('not found')) {
      res.status(404).json(error.message);
    } else {
      res.status(400).json(error.message);
    }
  }
};

/** Delete a product */
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params.id;
    const deletedProduct = await store.delete(productId);
    res.json(deletedProduct);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

/** Get top 5 popular products */
const popular = async (_req: Request, res: Response) => {
  try {
    const products = await store.getTopProducts();
    res.json(products);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

/** Upload product image to S3 */
const uploadImage = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params.id;

    if (!req.file) {
      return res.status(400).json('No image file provided');
    }

    // Get the existing product to check if it has an old image
    const product = await store.show(productId);

    // Delete old image from S3 if it exists
    if (product.image_url) {
      try {
        const oldKey = getKeyFromUrl(product.image_url);
        await deleteFromS3(oldKey);
      } catch (error) {
        console.warn('Failed to delete old image:', error);
      }
    }

    // Upload new image to S3
    const key = `products/${productId}-${Date.now()}.${req.file.mimetype.split('/')[1]}`;
    const imageUrl = await uploadToS3(req.file, key);

    // Update product with new image URL
    const updatedProduct = await store.update(productId, {
      image_url: imageUrl,
    });

    res.json(updatedProduct);
  } catch (err) {
    const error = err as Error;
    if (error.message.includes('not found')) {
      res.status(404).json(error.message);
    } else {
      res.status(400).json(error.message);
    }
  }
};

/** Register product endpoints */
const productRoutes = (app: express.Application) => {
  app.get('/products/popular', popular);
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, deleteProduct);
  app.post(
    '/products/:id/image',
    verifyAuthToken,
    upload.single('image'),
    uploadImage
  );
};

export default productRoutes;


-- Clear existing products first
DELETE FROM products;

-- Reset the sequence to start from 1
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- Insert 16 products matching S3 images
INSERT INTO products (name, price, category, image_url) VALUES
('Gaming Laptop', 129999, 'Electronics', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/1.jpg'),
('Laptop', 89999, 'Electronics', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/2.jpg'),
('Phone', 79999, 'Electronics', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/3.jpg'),
('Mouse', 2999, 'Electronics', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/4.jpg'),
('JavaScript Book', 4999, 'Books', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/5.jpg'),
('Mug', 1499, 'Home', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/6.jpg'),
('Desktop PC', 149999, 'Electronics', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/7.jpg'),
('Gaming Mouse', 6999, 'Electronics', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/8.jpg'),
('Desk Chair', 24999, 'Furniture', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/9.jpg'),
('Desk Lamp', 3499, 'Home', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/10.jpg'),
('Coffee Maker', 4999, 'Home', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/11.jpg'),
('Backpack', 5999, 'Accessories', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/12.jpg'),
('Water Bottle', 1999, 'Accessories', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/13.jpg'),
('Notebook Set', 2499, 'Stationery', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/14.jpg'),
('USB Cable', 1299, 'Electronics', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/15.jpg'),
('Headphones', 7999, 'Electronics', 'https://storefront-product-images-yazan.s3.eu-north-1.amazonaws.com/products/16.jpg');

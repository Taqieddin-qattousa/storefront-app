// Upload local images to S3 and update database
require('dotenv').config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

async function uploadImage(productId, imagePath) {
  try {
    // Read the image file
    const fileBuffer = fs.readFileSync(imagePath);
    const fileName = path.basename(imagePath);
    const s3Key = `products/${fileName}`;
    
    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: s3Key,
      Body: fileBuffer,
      ContentType: 'image/jpeg',
    });
    
    await s3Client.send(command);
    
    // Get the public URL
    const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
    
    // Update database
    await pool.query(
      'UPDATE products SET image_url = $1 WHERE id = $2',
      [imageUrl, productId]
    );
    
    console.log(`✅ Product ${productId}: ${fileName} -> ${imageUrl}`);
    return imageUrl;
  } catch (error) {
    console.error(`❌ Error uploading product ${productId}:`, error.message);
  }
}

async function uploadAll() {
  console.log('🚀 Starting upload to S3...\n');
  
  const imagesDir = path.join(__dirname, '../frontend/public/assets/images/products');
  
  // Get all jpg files
  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg'));
  
  for (const file of files) {
    const productId = parseInt(file.replace('.jpg', ''));
    if (!isNaN(productId)) {
      const imagePath = path.join(imagesDir, file);
      await uploadImage(productId, imagePath);
    }
  }
  
  console.log('\n✨ Upload complete!');
  await pool.end();
  process.exit(0);
}

uploadAll();

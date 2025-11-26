/* Add image_url column to products table for storing S3 URLs */
ALTER TABLE products ADD COLUMN image_url VARCHAR(500);
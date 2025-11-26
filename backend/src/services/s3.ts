// AWS S3 service for uploading and managing product images
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET } =
  process.env;

// Initialize S3 client
const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID as string,
    secretAccessKey: AWS_SECRET_ACCESS_KEY as string,
  },
});

/**
 * Upload a file to S3
 * @param file - The file buffer and metadata from multer
 * @param key - The S3 object key (filename)
 * @returns The public URL of the uploaded file
 */
export const uploadToS3 = async (
  file: { buffer: Buffer; mimetype: string },
  key: string
): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);

  // Return the public URL
  return `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`;
};

/**
 * Delete a file from S3
 * @param key - The S3 object key (filename)
 */
export const deleteFromS3 = async (key: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: key,
  });

  await s3Client.send(command);
};

/**
 * Get a presigned URL for private file access (optional, for future use)
 * @param key - The S3 object key (filename)
 * @param expiresIn - URL expiration time in seconds (default: 1 hour)
 * @returns A presigned URL
 */
export const getPresignedUrl = async (
  key: string,
  expiresIn: number = 3600
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
};

/**
 * Extract the S3 key from a full S3 URL
 * @param url - The full S3 URL
 * @returns The S3 key (filename)
 */
export const getKeyFromUrl = (url: string): string => {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
};

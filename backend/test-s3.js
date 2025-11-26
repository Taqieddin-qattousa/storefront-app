// Quick test script to verify S3 connection
require('dotenv').config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function testS3() {
  try {
    console.log('Testing S3 connection...');
    console.log(`Bucket: ${process.env.AWS_S3_BUCKET}`);
    console.log(`Region: ${process.env.AWS_REGION}`);
    
    // Upload a simple test file
    const testContent = 'S3 Test - ' + new Date().toISOString();
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: 'test.txt',
      Body: Buffer.from(testContent),
      ContentType: 'text/plain',
    });
    
    await s3Client.send(command);
    
    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/test.txt`;
    console.log('✅ SUCCESS! S3 is working!');
    console.log(`Test file uploaded to: ${url}`);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

testS3();

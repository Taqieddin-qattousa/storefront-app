# AWS S3 Setup Guide for Product Images

This guide walks you through setting up AWS S3 for storing product images in the storefront application.

## Prerequisites

- AWS Account (Free tier is sufficient)
- Basic understanding of AWS IAM and S3

## Step 1: Create an S3 Bucket

1. **Log in to AWS Console**: https://console.aws.amazon.com/
2. **Navigate to S3**: Search for "S3" in the services search bar
3. **Click "Create bucket"**
4. **Configure bucket**:
   - **Bucket name**: `storefront-products-images` (must be globally unique)
   - **Region**: `us-east-1` (or your preferred region)
   - **Object Ownership**: ACLs enabled
   - **Block Public Access**: UNCHECK "Block all public access"
     - ⚠️ Check the acknowledgment box
   - **Bucket Versioning**: Disabled (optional)
   - **Default encryption**: Enabled (SSE-S3)
5. **Click "Create bucket"**

## Step 2: Configure Bucket Policy for Public Read

1. **Go to your bucket** → **Permissions** tab
2. **Scroll to "Bucket policy"** → Click **Edit**
3. **Paste this policy** (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

4. **Click "Save changes"**

## Step 3: Enable CORS (Cross-Origin Resource Sharing)

1. **In your bucket** → **Permissions** tab
2. **Scroll to "Cross-origin resource sharing (CORS)"** → Click **Edit**
3. **Paste this configuration**:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

4. **Click "Save changes"**

## Step 4: Create IAM User for Programmatic Access

1. **Navigate to IAM**: Search for "IAM" in AWS Console
2. **Click "Users"** → **"Add users"**
3. **User details**:
   - **User name**: `storefront-s3-uploader`
   - **Access type**: Select "Programmatic access"
4. **Click "Next: Permissions"**

### Attach Permissions

**Option A: Use existing policy (simpler)**
1. **Click "Attach existing policies directly"**
2. **Search for** `AmazonS3FullAccess`
3. **Check the box** next to it

**Option B: Create custom policy (more secure, recommended for production)**
1. **Click "Create policy"**
2. **Choose "JSON" tab**
3. **Paste this policy** (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME"
    }
  ]
}
```

4. **Click "Next: Tags"** → **Next: Review**
5. **Name**: `StorefrontS3UploadPolicy`
6. **Click "Create policy"**
7. **Go back** to the user creation tab, refresh policies, and attach your new policy

### Complete User Creation

1. **Click "Next: Tags"** (optional, skip)
2. **Click "Next: Review"**
3. **Click "Create user"**

### Download Credentials ⚠️ IMPORTANT

1. **Copy or download** the credentials:
   - **Access key ID**: (looks like `AKIAIOSFODNN7EXAMPLE`)
   - **Secret access key**: (looks like `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`)
2. **⚠️ This is your ONLY chance to view the secret key!**
3. **Click "Download .csv"** as a backup

## Step 5: Configure Your Application

### Backend Configuration

1. **Copy `.env.example` to `.env`**:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edit `backend/.env`** and add:
   ```env
   AWS_ACCESS_KEY_ID=your-access-key-id-here
   AWS_SECRET_ACCESS_KEY=your-secret-access-key-here
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=storefront-products-images
   ```

3. **Replace the placeholder values** with your actual credentials from Step 4

## Step 6: Test the Setup

### Option 1: Upload via API (Using Postman/cURL)

1. **Start your backend server**:
   ```bash
   cd backend
   npm start
   ```

2. **Get an auth token** (login or create user first)

3. **Upload an image**:
   ```bash
   curl -X POST http://localhost:3000/products/1/image \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -F "image=@/path/to/your/image.jpg"
   ```

4. **Check the response** - should include `image_url` with S3 URL

### Option 2: Manual S3 Upload Test

1. **Go to your S3 bucket** in AWS Console
2. **Click "Upload"** → Select an image
3. **Set permissions** → Predefined ACLs → **"Grant public-read access"**
4. **Click "Upload"**
5. **Copy the Object URL** and test in browser

## Step 7: Verify Frontend Integration

1. **Start frontend**:
   ```bash
   cd frontend
   npm start
   ```

2. **Open browser** → Navigate to products
3. **Images should load** from S3 URLs (or local fallback if no S3 URL)

## Troubleshooting

### "Access Denied" when accessing images

- **Check bucket policy** - ensure public read access is enabled
- **Check object ACL** - each uploaded object should have public-read ACL
- **Check Block Public Access settings** - should be OFF

### "Invalid credentials" error

- **Verify AWS credentials** in `.env` file
- **Check IAM user permissions** - must have S3 Put/Get/Delete permissions
- **Regenerate access keys** if compromised

### Images not uploading

- **Check file size** - max 5MB (configurable in `products.ts`)
- **Check file type** - only images allowed (jpg, png, gif, webp)
- **Check auth token** - upload endpoint requires authentication
- **Check backend logs** for specific error messages

### CORS errors in browser

- **Enable CORS** on S3 bucket (Step 3)
- **Restart backend** after changing CORS settings

## Security Best Practices

1. **Never commit credentials** to Git
   - `.env` is already in `.gitignore`
   - Use `.env.example` as template

2. **Use IAM policies with least privilege**
   - Grant only necessary S3 permissions
   - Restrict to specific bucket/prefix

3. **Rotate access keys** regularly
   - Generate new keys every 90 days
   - Delete old keys after rotation

4. **Use environment-specific buckets**
   - Development: `storefront-dev-images`
   - Production: `storefront-prod-images`

5. **Enable CloudWatch logging** (optional)
   - Monitor S3 access patterns
   - Set up alerts for unusual activity

## Cost Estimation

**AWS Free Tier (12 months)**:
- 5GB storage
- 20,000 GET requests
- 2,000 PUT requests

**Beyond Free Tier** (typical usage):
- Storage: $0.023 per GB/month
- GET requests: $0.0004 per 1,000
- PUT requests: $0.005 per 1,000

**Example**: 1000 product images (avg 100KB each):
- Storage: ~100MB = $0.002/month
- 10,000 views/month = $0.004
- **Total: ~$0.01/month** (negligible)

## Alternative: CloudFront CDN (Optional)

For production, consider adding CloudFront for faster global delivery:

1. **Create CloudFront distribution** pointing to S3 bucket
2. **Update** image URLs to use CloudFront domain
3. **Benefits**: Faster loading, caching, HTTPS

## Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

## Support

If you encounter issues:
1. Check AWS CloudWatch logs
2. Review backend console logs
3. Verify all environment variables are set
4. Test S3 access with AWS CLI: `aws s3 ls s3://your-bucket-name`

---

✅ **Setup Complete!** Your storefront now uses AWS S3 for scalable, professional image storage.

# Deployment Guide - Render + Neon (100% Free)

Deploy both frontend and backend to Render with a Neon PostgreSQL database - completely free, no payment method required.

## Why Render for Everything?

- **Backend**: Web Service for Express API (free tier with 750 hours/month)
- **Frontend**: Static Site for Angular app (free forever)
- **Simple**: One platform, easier management than splitting services
- **Cost**: $0.00/month

## Prerequisites

- GitHub account
- Git installed locally
- Render account (sign up at https://render.com)

---

## Step 1: Set Up Neon Database (5 minutes)

1. **Sign up for Neon**
   - Go to https://neon.tech
   - Click "Sign Up" and use GitHub login
   - No credit card required!

2. **Create a Project**
   - Click "Create Project"
   - Name: `mystore-db`
   - Region: Choose closest to you
   - Click "Create Project"

3. **Get Connection String**
   - You'll see a connection string like:
     ```
     postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb
     ```
   - **Copy this** - you'll need it for Render

4. **Run Migrations & Seed Data**
   
   **Option A: Using Neon SQL Editor (Easiest)**
   - Go to Neon dashboard → SQL Editor
   - Copy and run each migration file in order:
     1. `backend/migrations/sqls/20251026160438-create-users-table-up.sql`
     2. `backend/migrations/sqls/20251026161545-create-products-table-up.sql`
     3. `backend/migrations/sqls/20251026161403-create-orders-table-up.sql`
     4. `backend/migrations/sqls/20251125135641-add-image-url-to-products-up.sql`
   - Then run `backend/seed-products.sql` to add 16 products

   **Option B: Using Command Line**
   ```bash
   export DATABASE_URL="your-neon-connection-string"
   cd backend
   npx db-migrate up --env production
   psql "$DATABASE_URL" < seed-products.sql
   ```

5. **Verify Data**
   - In Neon SQL Editor, run:
     ```sql
     SELECT COUNT(*) FROM products;
     ```
   - Should return 16

---

## Step 2: Deploy Backend on Render (5 minutes)

1. **Push Your Code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin master
   ```

2. **Create a Web Service**
   - Go to https://render.com dashboard
   - Click "New +" → "Web Service"
   - Click "Connect Account" and authorize GitHub
   - Select your repository

3. **Configure Web Service**
   - **Name**: `mystore-api` (or any name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `master`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/server.js`
   - **Instance Type**: Free

4. **Add Environment Variables**
   
   Click "Advanced" → "Add Environment Variable" and add each:
   
   **Required:**
   ```
   NODE_ENV=production
   DATABASE_URL=your-neon-connection-string-from-step-1
   BCRYPT_PASSWORD=your_secure_random_pepper_string
   SALT_ROUNDS=10
   TOKEN_SECRET=your_secure_random_jwt_secret
   PORT=3000
   ```
   
   **Optional (only if using Auth0 login):**
   ```
   AUTH0_DOMAIN=your-auth0-domain
   AUTH0_AUDIENCE=your-auth0-audience
   ```
   
   **Optional (only if uploading new images to S3):**
   ```
   AWS_ACCESS_KEY_ID=your-key
   AWS_SECRET_ACCESS_KEY=your-secret
   AWS_REGION=eu-north-1
   AWS_S3_BUCKET=your-bucket
   ```
   
   > ⚠️ **Security Note**: Generate strong random strings for `BCRYPT_PASSWORD` and `TOKEN_SECRET`. Never commit these to Git!

5. **Create Web Service**
   - Click "Create Web Service"
   - Wait 2-4 minutes for deployment
   - You'll get a URL like: `https://mystore-api-xxxx.onrender.com`

6. **Verify Backend**
   ```bash
   curl https://mystore-api-xxxx.onrender.com/
   # Should return: "Welcome to the Store API!"
   
   curl https://mystore-api-xxxx.onrender.com/products
   # Should return: [array of 16 products with images]
   ```

---

## Step 3: Deploy Frontend on Render (5 minutes)

1. **Update Frontend to Point to Render Backend**
   
   Edit `frontend/src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://mystore-api-xxxx.onrender.com', // Your backend URL
     auth0: {
       domain: 'your-auth0-domain',
       clientId: 'your-auth0-client-id',
       authorizationParams: {
         redirect_uri: window.location.origin,
         // audience: 'https://storefront-api' // Keep commented for login to work
       },
       httpInterceptor: {
         allowedList: [
           {
             uri: 'https://mystore-api-xxxx.onrender.com/users*',
             tokenOptions: {
               authorizationParams: {
                 // audience: 'https://storefront-api'
               }
             }
           },
           {
             uri: 'https://mystore-api-xxxx.onrender.com/orders*',
             tokenOptions: {
               authorizationParams: {
                 // audience: 'https://storefront-api'
               }
             }
           }
         ]
       }
     }
   };
   ```

2. **Update Services (Optional - if not using environment.apiUrl)**
   
   If your services use hardcoded `/api`, update them:
   ```typescript
   // In each service file (product.service.ts, order.service.ts, user.service.ts)
   private apiUrl = 'https://mystore-api-xxxx.onrender.com/products';
   ```

3. **Commit and Push**
   ```bash
   git add .
   git commit -m "Configure frontend for Render deployment"
   git push origin master
   ```

4. **Create Static Site on Render**
   - In Render dashboard, click "New +" → "Static Site"
   - Connect the same GitHub repository

5. **Configure Static Site**
   - **Name**: `mystore` (or any name)
   - **Root Directory**: `frontend`
   - **Branch**: `master`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist/frontend/browser`

6. **Create Static Site**
   - Click "Create Static Site"
   - Wait 2-3 minutes for build
   - You'll get a URL like: `https://mystore-xxxx.onrender.com`

---

## Step 4: Update Auth0 (If Using Login)

If you want Auth0 login to work:

1. Go to Auth0 Dashboard → Applications → Settings
2. Add your Render frontend URL to:
   - **Allowed Callback URLs**: `https://mystore-xxxx.onrender.com`
   - **Allowed Logout URLs**: `https://mystore-xxxx.onrender.com`
   - **Allowed Web Origins**: `https://mystore-xxxx.onrender.com`
3. Save changes

---

## Step 5: Test Your Deployment

1. **Visit your frontend URL**: `https://mystore-xxxx.onrender.com`
2. **Verify products load**: You should see 16 products with images
3. **Test add to cart**: Add items and view cart
4. **Test checkout** (requires Auth0 setup):
   - Click "Proceed to Checkout"
   - Should redirect to Auth0 login
   - After login, should show order form

---

## Troubleshooting

### Products Not Loading

1. **Check backend is running**
   ```bash
   curl https://mystore-api-xxxx.onrender.com/products
   ```
   - Should return array of products

2. **Check browser console**
   - Press F12 → Console tab
   - Look for CORS or network errors

3. **Verify DATABASE_URL**
   - Go to Render → mystore-api → Environment
   - Check DATABASE_URL is set correctly

4. **Check Neon database**
   - Go to Neon SQL Editor
   - Run: `SELECT COUNT(*) FROM products;`
   - Should return 16

### CORS Errors

If you see CORS errors in browser console:
- Backend already has CORS enabled for all origins (`Access-Control-Allow-Origin: *`)
- Check that frontend is calling the correct backend URL
- Verify environment.ts has the right backend URL

### Backend Not Starting

1. **Check logs**
   - Go to Render → mystore-api → Logs
   - Look for error messages

2. **Common issues:**
   - Missing environment variables
   - Database connection failed (check DATABASE_URL)
   - Port already in use (Render auto-assigns port)

### Auth0 Login Not Working

1. **Verify callback URLs** in Auth0 match your Render frontend URL
2. **Check audience is commented out** in environment.ts
3. **Clear browser cache** and try again
4. **Check Auth0 credentials** in environment.ts

---

## Cost Breakdown

- ✅ **Neon Database**: Free forever (0.5GB storage)
- ✅ **Render Backend**: Free (750 hours/month, spins down after inactivity)
- ✅ **Render Frontend**: Free forever (100GB bandwidth/month)
- ✅ **Total**: **$0.00/month**

> ⚠️ **Note**: Free tier backend spins down after 15 minutes of inactivity. First request after spin-down takes ~30 seconds to wake up.

---

## Updating Your Deployment

Any time you push to GitHub, Render will automatically redeploy:

```bash
git add .
git commit -m "Update feature"
git push origin master
```

- Backend redeploys in ~2-4 minutes
- Frontend redeploys in ~2-3 minutes

---

## Next Steps

1. **Add demo URL to README**:
   ```markdown
   🌐 **Live Demo**: https://mystore-xxxx.onrender.com
   ```

2. **Test all features**:
   - Product listing ✓
   - Product details ✓
   - Add to cart ✓
   - Checkout (with login) ✓
   - Order confirmation ✓

3. **Share with reviewers**:
   - Provide your frontend URL
   - Mention that backend may take 30s to wake up on first visit
   - Include test credentials if using Auth0

---

## Environment Variables Reference

### Backend (Render Web Service)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment mode | `production` |
| `DATABASE_URL` | Yes | Neon connection string | `postgresql://user:pass@...` |
| `BCRYPT_PASSWORD` | Yes | Pepper for password hashing | Random string |
| `SALT_ROUNDS` | Yes | Bcrypt salt rounds | `10` |
| `TOKEN_SECRET` | Yes | JWT signing secret | Random string |
| `PORT` | Yes | Server port (auto-set by Render) | `3000` |
| `AUTH0_DOMAIN` | Optional | Auth0 domain | `dev-xxx.us.auth0.com` |
| `AUTH0_AUDIENCE` | Optional | Auth0 API audience | `https://storefront-api` |
| `AWS_ACCESS_KEY_ID` | Optional | AWS access key | Only if uploading images |
| `AWS_SECRET_ACCESS_KEY` | Optional | AWS secret key | Only if uploading images |
| `AWS_REGION` | Optional | AWS region | `eu-north-1` |
| `AWS_S3_BUCKET` | Optional | S3 bucket name | Only if uploading images |

### Frontend (Render Static Site)

- No environment variables needed! Configuration is in `environment.ts` file.

---

## Support

- **Render Docs**: https://render.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Issues**: Open an issue in your GitHub repo

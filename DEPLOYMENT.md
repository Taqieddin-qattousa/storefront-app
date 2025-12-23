# Deployment Guide - Render + Neon (100% Free)

This guide will help you deploy the myStore application to Render with a Neon PostgreSQL database - completely free, no payment method required.

## Why Render?

- **Backend**: Web Service for Express API (always-on free tier)
- **Frontend**: Static Site for Angular app (free hosting)
- **One platform**: Easier to manage than splitting across Vercel + Render

## Prerequisites

- GitHub account
- Git installed locally
- Render account (sign up at https://render.com)

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
   - **Copy this** - you'll need it for Vercel

4. **Run Migrations & Seed Data**
   
   Option A: Using connection string directly
   ```bash
   # Set the DATABASE_URL
   export DATABASE_URL="your-neon-connection-string"
   
   # Run migrations
   cd backend
   npx db-migrate up --env production
   
   # Seed database
   psql "$DATABASE_URL" < seed-products.sql
   ```

   Option B: Using Neon SQL Editor
   - Go to Neon dashboard → SQL Editor
   - Copy contents of `backend/migrations/sqls/*-up.sql` files
   - Run them in order
   - Copy contents of `backend/seed-products.sql`
   - Run it

## Step 2: Backend on Render (Recommended)

We recommend hosting the Express backend on Render and the Angular frontend on Vercel. Render is designed for long‑running Node services, while Vercel excels at static frontends.

1. **Create a Web Service on Render**
   - Go to https://render.com → New + → Web Service
   - Connect your GitHub repo
   - Under “Root Directory”, set `backend`
   - Environment: `Node`
   - Region: choose closest

2. **Build & Start Commands**
   - Build Command: `npm install && npm run build`
   - Start Command: `node dist/server.js`
   - Health Check Path: `/` (returns "Welcome to the Store API!")

3. **Environment Variables (Render → Settings → Environment)**
   - `NODE_ENV=production`
   - `DATABASE_URL=your-neon-connection-string`
   - `BCRYPT_PASSWORD=your_pepper_string`
   - `SALT_ROUNDS=10`
   - `TOKEN_SECRET=your_jwt_secret_string`
   - Optional (only if needed): `AUTH0_DOMAIN`, `AUTH0_AUDIENCE`
   - Optional (only if uploading to S3): `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET`

4. **Deploy**
   - Click “Create Web Service”
   - Wait for build to finish (~2–4 minutes)
   - You’ll get a URL like: `https://store-api-xxxx.onrender.com`
   - Verify:
     ```bash
     curl https://store-api-xxxx.onrender.com/
     curl https://store-api-xxxx.onrender.com/products
     ```

## Step 3: Frontend on Vercel (5 minutes)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin master
   ```

2. **Sign up for Vercel**
   - Go to https://vercel.com
   - Click "Sign Up" and use GitHub login
   - No credit card required!

3. **Import Project**
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

4. **Route API calls to Render**
   - After your Render backend is live, update the rewrite so the frontend’s `/api/*` calls go to Render.
   - In `vercel.json`, change the `/api/(.*)` route `dest` to your Render URL, e.g.:
     ```json
     {
       "routes": [
         { "src": "/api/(.*)", "dest": "https://store-api-xxxx.onrender.com/api/$1" },
         { "src": "/(.*)", "dest": "frontend/dist/frontend/browser/$1" }
       ]
     }
     ```
   - Redeploy the Vercel project.

5. **Configure Environment Variables**
   
   Click "Environment Variables" and add (frontend usually needs none unless you introduce dynamic config):
   
   ```
   # (Typically none required for static frontend.)
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll get a URL like: `https://mystore-xxx.vercel.app`

## Step 4: Update Auth0 (If Using)

If you want Auth0 login to work:

1. Go to Auth0 Dashboard → Applications → Settings
2. Add your Vercel URL to:
   - Allowed Callback URLs: `https://mystore-xxx.vercel.app`
   - Allowed Logout URLs: `https://mystore-xxx.vercel.app`
   - Allowed Web Origins: `https://mystore-xxx.vercel.app`

## Step 5: Test Your Deployment

1. Visit your Vercel URL
2. You should see 16 products (if you seeded the database)
3. Test adding to cart
4. Test checkout (requires Auth0 setup)

## Troubleshooting

### No Products Showing
- Make sure you ran the seed script on Neon database
- Check Vercel deployment logs for errors

### Database Connection Error
- Verify `DATABASE_URL` is correct in Render environment variables
- Check Neon database is running (it auto-pauses after inactivity but wakes up on first request)

### Auth0 Not Working
- Verify callback URLs include your Vercel domain
- Check Auth0 credentials in Vercel environment variables

## Cost

- ✅ **Neon**: Free forever (0.5GB storage, enough for demo)
- ✅ **Vercel**: Free forever (100GB bandwidth/month)
- ✅ **Total**: $0.00/month

## Updating Your Deployment

Any time you push to GitHub, Vercel will automatically redeploy:

```bash
git add .
git commit -m "Update feature"
git push origin master
```

Vercel will rebuild and deploy in ~2 minutes.

## Demo URL

Once deployed, add your live URL to the README:

```markdown
🌐 **Live Demo**: https://your-app.vercel.app
```

Share this link with reviewers!

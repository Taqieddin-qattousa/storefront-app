# Auth0 Setup Guide

This guide walks you through setting up Auth0 authentication for the Storefront application.

## Prerequisites

- An Auth0 account (sign up at [auth0.com](https://auth0.com))
- Backend and frontend applications running locally

## Step 1: Create an Auth0 Application

1. Log in to your [Auth0 Dashboard](https://manage.auth0.com)
2. Navigate to **Applications** → **Applications** in the sidebar
3. Click **Create Application**
4. Name your application (e.g., "Storefront Frontend")
5. Select **Single Page Web Applications**
6. Click **Create**

## Step 2: Configure Application Settings

In your newly created application's **Settings** tab:

1. **Allowed Callback URLs**: Add `http://localhost:4200`
2. **Allowed Logout URLs**: Add `http://localhost:4200`
3. **Allowed Web Origins**: Add `http://localhost:4200`
4. Click **Save Changes**

## Step 3: Get Your Application Credentials

From the **Settings** tab, copy:

- **Domain** (e.g., `dev-abc123.us.auth0.com`)
- **Client ID** (e.g., `aBcD1234567890eFgHiJ`)

## Step 4: Create an API (Optional but Recommended)

If you want to protect your backend API with Auth0 tokens:

1. Navigate to **Applications** → **APIs**
2. Click **Create API**
3. Name your API (e.g., "Storefront API")
4. Set **Identifier** to a unique value (e.g., `https://storefront-api`)
   - This will be your `AUTH0_AUDIENCE` value
5. Leave **Signing Algorithm** as `RS256`
6. Click **Create**

## Step 5: Configure Frontend Environment

1. Copy the environment example file:
   ```bash
   cd frontend/src/environments
   cp environment.example.ts environment.ts
   cp environment.example.ts environment.prod.ts
   ```

2. Update `environment.ts` with your Auth0 credentials:
   ```typescript
   export const environment = {
     production: false,
     auth0: {
       domain: 'YOUR_AUTH0_DOMAIN', // e.g., 'dev-abc123.us.auth0.com'
       clientId: 'YOUR_AUTH0_CLIENT_ID', // From Step 3
       authorizationParams: {
         redirect_uri: window.location.origin,
         audience: 'YOUR_AUTH0_API_IDENTIFIER', // From Step 4 (optional)
       },
       httpInterceptor: {
         allowedList: [
           {
             uri: '/api/*',
             tokenOptions: {
               authorizationParams: {
                 audience: 'YOUR_AUTH0_API_IDENTIFIER', // Match above
               },
             },
           },
         ],
       },
     },
   };
   ```

3. Update `environment.prod.ts` with the same values (or production Auth0 app credentials)

## Step 6: Configure Backend Environment (Optional)

If you created an API in Step 4, add Auth0 configuration to your backend:

1. Copy the environment example file:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Add your Auth0 configuration to `.env`:
   ```env
   AUTH0_DOMAIN=dev-abc123.us.auth0.com
   AUTH0_AUDIENCE=https://storefront-api
   ```

> **Note**: The backend will work with or without Auth0 configuration. If Auth0 is not configured, it falls back to the existing custom JWT authentication.

## Step 7: Test Authentication

1. Start both backend and frontend servers:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run watch

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

2. Open `http://localhost:4200` in your browser

3. Click **Login** in the header
   - You should be redirected to Auth0's Universal Login page

4. Sign up or log in with your credentials
   - You can use email/password or social connections (Google, GitHub, etc.)

5. After successful login:
   - You should be redirected back to the application
   - Your name should appear in the header
   - You can now access protected routes (Checkout, Confirmation)

6. Click **Logout** to end your session

## Step 8: Enable Social Connections (Optional)

To allow users to log in with Google, GitHub, etc.:

1. In Auth0 Dashboard, go to **Authentication** → **Social**
2. Click on a provider (e.g., **Google**)
3. Toggle **Enable** and follow the setup instructions
4. Click **Save**

Your users can now log in with social accounts!

## Testing Protected Routes

1. **Without Authentication**:
   - Add items to cart
   - Click "Proceed to Checkout"
   - You should be redirected to the home page (not authenticated)

2. **With Authentication**:
   - Click **Login** and authenticate
   - Add items to cart
   - Click "Proceed to Checkout"
   - You should successfully reach the checkout page

## Troubleshooting

### "Callback URL mismatch" Error

- Ensure `http://localhost:4200` is added to **Allowed Callback URLs** in Auth0 Dashboard
- Check that `redirect_uri` in `environment.ts` matches your application URL

### "Invalid audience" Error

- Verify the `audience` in `environment.ts` matches your API Identifier from Auth0
- Ensure your API is enabled in Auth0 Dashboard

### Backend Returns 401 "Invalid Token"

- Check that `AUTH0_DOMAIN` and `AUTH0_AUDIENCE` in backend `.env` match your Auth0 settings
- Verify the backend is running and `.env` file is loaded
- Check the terminal output for specific JWT verification errors

### Login Button Does Nothing

- Open browser DevTools Console for JavaScript errors
- Verify Auth0 credentials in `environment.ts` are correct
- Check that `@auth0/auth0-angular` package is installed

### Token Not Attached to API Requests

- Verify the HTTP interceptor is configured in `app.config.ts`
- Check that the request URL matches the pattern in `httpInterceptor.allowedList`
- Open Network tab in DevTools and check the `Authorization` header

## Security Best Practices

1. **Never commit environment files with real credentials**
   - The `.gitignore` already excludes `environment.ts` and `.env`
   - Only commit `.example` files with placeholder values

2. **Use different Auth0 applications for development and production**
   - Create separate Auth0 apps for dev and prod environments
   - Update `environment.prod.ts` with production credentials

3. **Enable Multi-Factor Authentication (MFA)**
   - Go to **Security** → **Multi-factor Auth** in Auth0 Dashboard
   - Enable MFA for additional security

4. **Monitor Auth0 Logs**
   - Check **Monitoring** → **Logs** in Auth0 Dashboard
   - Review failed login attempts and token verification errors

## Resources

- [Auth0 Angular Quickstart](https://auth0.com/docs/quickstart/spa/angular)
- [Auth0 Dashboard](https://manage.auth0.com)
- [Auth0 Node.js API Quickstart](https://auth0.com/docs/quickstart/backend/nodejs)
- [Express JWT Documentation](https://github.com/auth0/express-jwt)

# Getting Started

Quick guide to get the Storefront application running locally.

## ⚡ Super Quick Start

```bash
# 1. Start Backend
cd backend
npm install
docker compose up -d
npm run db:up
npm run dev

# 2. In a new terminal, start Frontend
cd frontend
npm install
npm start

# 3. Open browser
# http://localhost:4200
```

That's it! The frontend automatically connects to the backend via proxy.

## 📋 Step-by-Step Guide

### Step 1: Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start PostgreSQL database
docker compose up -d

# Run migrations to create tables
npm run db:up

# Start backend server
npm run dev
```

✅ Backend running at: **http://localhost:3000**

Test it:
```bash
curl http://localhost:3000/products
```

### Step 2: Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
# or
ng serve
```

✅ Frontend running at: **http://localhost:4200**

The proxy is **automatically configured** - no extra steps needed!

## 🔍 Verification

### Check Backend
```bash
curl http://localhost:3000/products
# Should return JSON array of products
```

### Check Frontend
Open **http://localhost:4200** in your browser

You should see:
- Navigation header with "Storefront" logo
- Product list with cards
- Each product shows name, category, price
- Cart icon in header (with badge when items added)

## ❓ Troubleshooting

### Products Not Loading

**Symptom:** Empty product list or "Loading..." forever

**Fix:** Make sure backend is running
```bash
# Check if backend is up
curl http://localhost:3000/products

# If not, start it
cd backend
npm run dev
```

### Database Connection Error

**Symptom:** Backend crashes with "ECONNREFUSED"

**Fix:** Start PostgreSQL
```bash
cd backend
docker compose up -d
```

### Port Already in Use

**Symptom:** "Port 3000 already in use" or "Port 4200 already in use"

**Fix:**
```bash
# Find and kill the process
# For Linux/Mac:
lsof -ti:3000 | xargs kill -9
lsof -ti:4200 | xargs kill -9

# Or use different ports:
PORT=3001 npm run dev  # Backend
ng serve --port 4201   # Frontend
```

### Migrations Not Run

**Symptom:** Backend error about missing tables

**Fix:**
```bash
cd backend
npm run db:up
```

## 🎯 What's Next?

Once everything is running:

1. **Browse Products** - http://localhost:4200
2. **Add to Cart** - Click "Add to Cart" on any product
3. **View Cart** - Click the cart icon in header
4. **Checkout** - Click "Proceed to Checkout"
5. **Complete Order** - Fill form and submit

## 📚 More Information

- [Full README](README.md) - Complete project documentation
- [Backend API Docs](backend/README.md) - API endpoints and auth
- [Frontend Docs](frontend/README.md) - Angular app features
- [Design System](frontend/DESIGN_SYSTEM.md) - UI design tokens

## 🎨 Features to Explore

- **Cart Persistence** - Cart saves to localStorage
- **Free Shipping** - Orders over $50 get free shipping
- **Form Validation** - Try submitting empty checkout form
- **Responsive Design** - Resize browser to see mobile view
- **Animations** - Hover over products and buttons

Enjoy building! 🚀

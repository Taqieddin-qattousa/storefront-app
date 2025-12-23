# Storefront App

Full-stack e-commerce application with RESTful API backend and Angular frontend.

## 🏗️ Architecture

- **Backend**: Node.js, Express, TypeScript, PostgreSQL
- **Frontend**: Angular 21, TypeScript, Modern CSS
- **Database**: PostgreSQL 13+ with Docker
- **Auth**: JWT tokens with bcrypt password hashing

## 📁 Project Structure

```
storefront-app/
├── backend/           # RESTful API (Node.js + Express)
│   ├── src/          # TypeScript source code
│   ├── migrations/   # Database migrations
│   ├── spec/         # Jasmine tests
│   └── README.md     # Backend documentation
├── frontend/         # Angular web application
│   ├── src/          # Angular source code
│   │   ├── app/
│   │   │   ├── components/  # UI components
│   │   │   ├── services/    # API services
│   │   │   ├── models/      # TypeScript models
│   │   │   └── layout/      # Layout components
│   │   └── styles.css       # Design system
│   ├── DESIGN_SYSTEM.md     # Design tokens documentation
│   └── README.md            # Frontend documentation
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Docker & Docker Compose

**Note:** The application works immediately after setup - Auth0 and AWS S3 are optional advanced features.

### 1. Clone and Install

```bash
git clone https://github.com/Taqieddin-qattousa/storefront-app.git
cd storefront-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Backend Setup

```bash
cd backend

# Copy environment variables
cp .env.example .env
# Edit .env with your settings

# Start PostgreSQL with Docker
docker compose up -d

# Run database migrations
npm run db:up

# ⚠️ IMPORTANT: Seed database with sample products (16 products)
# The application requires this step to display products!
npm run db:seed

# Start backend server
npm run dev
```

**Backend API**: http://localhost:3000

Test it: `curl http://localhost:3000/products`

**⚠️ IMPORTANT FOR REVIEWERS:** The `npm run db:seed` command is **required** to populate the database with 16 sample products. Without this step, the product list will be empty. Run this command anytime your database is reset or empty.

### 3. Frontend Setup

```bash
cd frontend

# Start development server (proxy configured automatically)
npm start
```

**Frontend App**: http://localhost:4200

The frontend automatically proxies `/api/*` requests to the backend at `http://localhost:3000`. No additional configuration needed!

## 🧪 Testing

### Backend Tests (Required)

```bash
cd backend
npm test
```

**Result:** 57 passing specs with full coverage ✅

### Frontend Tests (Optional)

Frontend unit tests are included but not required by the project rubric.

```bash
cd frontend
npm test
```

## 🔐 Optional Features

### Auth0 Authentication

The application includes Auth0 integration but works without it. To enable:

1. Follow [AUTH0_SETUP.md](AUTH0_SETUP.md)
2. Add credentials to `frontend/src/environments/environment.ts`

**Without Auth0:** Application uses fallback authentication via custom JWT tokens.

### AWS S3 Image Storage

Product images are hosted on AWS S3. Images work immediately for reviewers (public URLs in database).

To upload new images:

1. Follow [AWS_S3_SETUP.md](AWS_S3_SETUP.md)
2. Add credentials to `backend/.env`
3. Run `node upload-to-s3.js`

**For Reviewers:** No S3 setup needed - images load from public S3 URLs.

## 📚 Documentation

- [Backend API Documentation](backend/README.md) - Complete API setup and endpoints
- [Backend Requirements](backend/REQUIREMENTS.md) - API specifications and database schema
- [Frontend Documentation](frontend/README.md) - Angular app setup and features
- [Design System](frontend/DESIGN_SYSTEM.md) - UI design tokens and patterns
- [Getting Started Guide](GETTING_STARTED.md) - Step-by-step setup for developers
- [Auth0 Setup](AUTH0_SETUP.md) - Optional authentication configuration
- [AWS S3 Setup](AWS_S3_SETUP.md) - Optional cloud storage configuration
- [Project Completion](PROJECT_COMPLETION.md) - Full rubric verification checklist

## 🎯 Features

### Backend API ✅

- ✅ Complete CRUD operations for products, users, orders
- ✅ JWT authentication with bcrypt + pepper
- ✅ PostgreSQL with db-migrate migrations
- ✅ Product category filtering
- ✅ Top 5 popular products endpoint
- ✅ User purchase history
- ✅ Order completion workflow
- ✅ 57 passing tests with full coverage
- ✅ ESLint + Prettier configured

### Frontend ✅

- ✅ Product catalog with category display
- ✅ Product detail pages
- ✅ Shopping cart with localStorage persistence
- ✅ Cart badge with live item count
- ✅ Quantity management
- ✅ Order checkout with form validation
- ✅ Order confirmation with receipt
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI with comprehensive design system
- ✅ Smooth animations and transitions
- ✅ **Auth0 integration (optional)**
- ✅ **AWS S3 cloud-hosted images**
- ✅ ESLint + Prettier configured

## 🌟 Stand Out Features (All Implemented)

The project includes **ALL** optional "Stand Out" features from the rubric:

1. ✅ **Auth0 Authentication** - OAuth 2.0 login with social providers
2. ✅ **Backend from Course 2** - Full RESTful API with PostgreSQL
3. ✅ **Custom Styling** - Professional design system with 50+ CSS variables
4. ✅ **Cart Badge** - Animated item count in navigation
5. ✅ **Calculated Totals** - Cart subtotal, tax, shipping, grand total
6. ✅ **Empty Cart Indication** - User-friendly empty state

**Bonus:** ✨ **AWS S3 Integration** - Cloud storage for product images

## 🧪 Testing

```bash
# Backend tests (57 specs)
cd backend
npm test

# Backend linting
npm run lint

# Frontend linting
cd frontend
npm run lint

# Frontend formatting check
npm run format:check
```

## 🔐 Environment Variables

### Backend (.env)

```bash
# Server
PORT=3000
NODE_ENV=dev

# Database
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_dev
POSTGRES_USER=store_user
POSTGRES_PASSWORD=your_secure_password

# Security
BCRYPT_PASSWORD=your_pepper_string
SALT_ROUNDS=10
TOKEN_SECRET=your_jwt_secret_string
```

See [backend/.env.example](backend/.env.example) for template.

## 🌐 API Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (requires auth)
- `PUT /products/:id` - Update product (requires auth)
- `DELETE /products/:id` - Delete product (requires auth)
- `GET /products/popular` - Get top 5 popular products
- `GET /products?category=<name>` - Filter by category

### Users
- `POST /users` - Create user and get JWT token
- `GET /users` - Get all users (requires auth)
- `GET /users/:id` - Get user with recent purchases (requires auth)
- `DELETE /users/:id` - Delete user (requires auth)

### Orders
- `POST /orders` - Create new order (requires auth)
- `POST /orders/:id/products` - Add product to order (requires auth)
- `PUT /orders/:id/complete` - Mark order as complete (requires auth)
- `GET /orders/current/:userId` - Get active order (requires auth)
- `GET /orders/completed/:userId` - Get completed orders (requires auth)

## 📝 License

ISC

## 👤 Author

Taqieddin Qattousa - [GitHub](https://github.com/Taqieddin-qattousa)

---

**Note**: This project was built as part of the Udacity Full Stack JavaScript Nanodegree program.
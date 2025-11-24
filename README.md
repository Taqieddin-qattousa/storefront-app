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

# Start backend server
npm run dev
```

**Backend API**: http://localhost:3000

Test it: `curl http://localhost:3000/products`

### 3. Frontend Setup

```bash
cd frontend

# Start development server (proxy configured automatically)
npm start
```

**Frontend App**: http://localhost:4200

The frontend automatically proxies `/api/*` requests to the backend at `http://localhost:3000`.

## 📚 Documentation

- [Backend API Documentation](backend/README.md) - Complete API setup and endpoints
- [Backend Requirements](backend/REQUIREMENTS.md) - API specifications and database schema
- [Frontend Documentation](frontend/README.md) - Angular app setup and features
- [Design System](frontend/DESIGN_SYSTEM.md) - UI design tokens and patterns

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
- ✅ Responsive design
- ✅ Modern UI with comprehensive design system
- ✅ Smooth animations and transitions
- ✅ ESLint + Prettier configured

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
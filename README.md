# Storefront App

Full-stack e-commerce application with RESTful API backend and Angular frontend.

## 🏗️ Architecture

- **Backend**: Node.js, Express, TypeScript, PostgreSQL
- **Frontend**: Angular, TypeScript, CSS
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
├── frontend/         # Angular web application (Coming soon)
│   ├── src/          # Angular source code
│   └── README.md     # Frontend documentation
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Angular CLI: `npm install -g @angular/cli`

### Backend Setup

```bash
cd backend
npm install
docker compose up -d
npm run db:up
npm run dev
```

**Backend API**: http://localhost:3000

### Frontend Setup (Coming Soon)

```bash
cd frontend
npm install
ng serve
```

**Frontend App**: http://localhost:4200

## 📚 Documentation

- [Backend API Documentation](backend/README.md) - Complete API setup and endpoints
- [Backend Requirements](backend/REQUIREMENTS.md) - API specifications and database schema
- Frontend Documentation - Coming soon

## 🧪 Testing

```bash
# Backend tests (57 specs)
cd backend
npm test

# Frontend tests
cd frontend
ng test
```

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

### Frontend 🚧

- 🚧 Product catalog and search
- 🚧 Shopping cart management
- 🚧 User authentication UI
- 🚧 Order checkout and history
- 🚧 Responsive design with Angular Material

## 🔐 Environment Variables

Copy `backend/.env.example` and configure:

- Database credentials
- JWT secret
- Bcrypt pepper

See [backend/README.md](backend/README.md) for details.

## 🚀 API Endpoints

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
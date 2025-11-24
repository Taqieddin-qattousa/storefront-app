# Storefront Frontend

Angular 21 frontend application for the Storefront e-commerce project.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Backend server running on `http://localhost:3000`

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Backend Server First

**Important:** The frontend requires the backend API to be running.

```bash
# In the backend directory
cd ../backend
npm run dev
```

The backend should start on `http://localhost:3000`

### 3. Start Frontend Development Server

```bash
npm start
# or
ng serve
```

Open your browser and navigate to `http://localhost:4200/`

**Note:** The proxy is automatically configured. All `/api/*` requests will be forwarded to `http://localhost:3000`

## Available Scripts

- `npm start` - Start development server with proxy (default port 4200)
- `npm run build` - Build for production
- `npm run lint` - Check code for linting errors
- `npm run lint:fix` - Auto-fix linting errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted
- `npm run clean` - Run lint:fix and format together
- `npm test` - Run unit tests

## Proxy Configuration

The application uses a proxy to avoid CORS issues during development. The proxy configuration is in `proxy.conf.json` and is automatically applied when running `ng serve`.

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
```

All requests to `/api/*` are proxied to the backend server at `http://localhost:3000`.

## Project Structure

```
src/
├── app/
│   ├── components/         # UI components
│   │   ├── cart/          # Shopping cart page
│   │   ├── checkout/      # Checkout form
│   │   ├── confirmation/  # Order confirmation
│   │   ├── product-item/  # Product card component
│   │   ├── product-item-detail/  # Product detail page
│   │   └── product-list/  # Products listing page
│   ├── layout/            # Layout components
│   │   └── header/        # Navigation header
│   ├── models/            # TypeScript interfaces
│   ├── services/          # API and business logic services
│   ├── app.routes.ts      # Route configuration
│   └── app.config.ts      # App configuration
├── styles.css             # Global styles & design system
└── index.html             # Main HTML file
```

## Features

- ✅ Product browsing with category display
- ✅ Product detail view
- ✅ Shopping cart with quantity management
- ✅ Cart persistence (localStorage)
- ✅ Checkout with form validation
- ✅ Order confirmation with receipt
- ✅ Responsive design
- ✅ Modern UI with design system

## Design System

The application uses a comprehensive design system with CSS variables:

- **Colors:** Primary (blue), Accent (green), Semantic colors
- **Typography:** 8 font sizes, 4 font weights
- **Spacing:** 7-step scale (4px to 64px)
- **Shadows:** 6 elevation levels
- **Animations:** Smooth transitions and hover effects

See `DESIGN_SYSTEM.md` for detailed documentation.

## Development Notes

### API Integration

All API calls go through services in `src/app/services/`:
- `product.ts` - Product operations (GET /api/products, GET /api/products/:id)
- `cart.ts` - Cart state management (client-side)
- `order.ts` - Order operations (POST /api/orders)

### State Management

- Cart state uses RxJS BehaviorSubject
- Cart persists in localStorage
- No external state management library needed

### Styling

- Component styles use scoped CSS
- Global design tokens in `styles.css`
- Consistent spacing, colors, and typography
- Mobile-first responsive design

## Troubleshooting

### No Products Loading

**Problem:** Products don't load, empty page or loading spinner forever

**Solution:** Make sure the backend server is running on `http://localhost:3000`

```bash
# Check if backend is running
curl http://localhost:3000/products

# If not, start it
cd ../backend
npm run dev
```

### CORS Errors

**Problem:** CORS errors in browser console

**Solution:** The proxy should handle this automatically. Make sure:
1. You're using `ng serve` (not a different server)
2. The proxy.conf.json file exists
3. Backend is running on port 3000

### Port Already in Use

**Problem:** Port 4200 is already in use

**Solution:** Either stop the other process or run on a different port:

```bash
ng serve --port 4201
```

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [RxJS Documentation](https://rxjs.dev)

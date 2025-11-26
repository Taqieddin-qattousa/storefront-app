# Product Images

Store product images in this directory.

## File Naming Convention

Use product IDs for consistency:
- `1.jpg` - Gaming Laptop
- `2.jpg` - Wireless Mouse
- `3.jpg` - Mechanical Keyboard
- etc.

Or use descriptive names:
- `gaming-laptop.jpg`
- `wireless-mouse.jpg`
- `mechanical-keyboard.jpg`

## Image Specifications

- **Size**: 800x800px to 1000x1000px
- **Aspect Ratio**: 1:1 (square)
- **Format**: JPG or WebP
- **File Size**: Under 200KB (optimized)
- **Background**: White or transparent preferred

## Usage in Code

Images are referenced from the database `image` column:
```typescript
// If image column has: "gaming-laptop.jpg"
imageUrl = `/assets/images/products/gaming-laptop.jpg`
```

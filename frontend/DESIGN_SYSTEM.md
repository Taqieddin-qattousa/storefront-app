# Design System Reference

Quick reference guide for the storefront design system.

---

## 🎨 Color Palette

### Primary (Blue)
```css
--primary-500: #2196f3  /* Main brand color */
--primary-600: #1e88e5  /* Hover states */
--primary-700: #1976d2  /* Active states */
```

### Accent (Green)
```css
--accent-500: #4caf50   /* Success, CTAs */
--accent-600: #43a047   /* Hover */
--accent-700: #388e3c   /* Active */
```

### Semantic Colors
```css
--success: #4caf50      /* Success messages */
--warning: #ff9800      /* Warnings, notices */
--error: #f44336        /* Errors, delete */
--info: #2196f3         /* Information */
```

### Neutrals
```css
--gray-50: #fafafa      /* Lightest backgrounds */
--gray-100: #f5f5f5     /* Light backgrounds */
--gray-200: #eeeeee     /* Borders light */
--gray-400: #bdbdbd     /* Borders medium */
--gray-600: #757575     /* Text secondary */
--gray-800: #424242     /* Text primary */
```

---

## 📐 Spacing Scale

```css
--space-xs: 0.25rem     /* 4px - Tight spacing */
--space-sm: 0.5rem      /* 8px - Small gaps */
--space-md: 1rem        /* 16px - Default */
--space-lg: 1.5rem      /* 24px - Section spacing */
--space-xl: 2rem        /* 32px - Large gaps */
--space-2xl: 3rem       /* 48px - Major sections */
--space-3xl: 4rem       /* 64px - Page padding */
```

### Usage Examples
```css
padding: var(--space-md);              /* 16px all sides */
gap: var(--space-lg);                  /* 24px grid gap */
margin-bottom: var(--space-xl);        /* 32px section break */
```

---

## 🔤 Typography

### Font Sizes
```css
--font-size-xs: 0.75rem      /* 12px - Labels, badges */
--font-size-sm: 0.875rem     /* 14px - Secondary text */
--font-size-base: 1rem       /* 16px - Body text */
--font-size-lg: 1.125rem     /* 18px - Emphasized text */
--font-size-xl: 1.25rem      /* 20px - Small headings */
--font-size-2xl: 1.5rem      /* 24px - H3, card titles */
--font-size-3xl: 1.875rem    /* 30px - H2, section titles */
--font-size-4xl: 2.25rem     /* 36px - H1, page titles */
```

### Font Weights
```css
--font-weight-normal: 400    /* Body text */
--font-weight-medium: 500    /* Labels, navigation */
--font-weight-semibold: 600  /* Card titles, buttons */
--font-weight-bold: 700      /* Headings, emphasis */
```

### Line Heights
```css
--line-height-tight: 1.25    /* Headings */
--line-height-normal: 1.5    /* Body text */
--line-height-relaxed: 1.75  /* Long-form content */
```

---

## 🌊 Shadows (Elevation)

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05)         /* Subtle hover */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08)         /* Buttons, inputs */
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1)          /* Cards */
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.12)        /* Dropdowns, hover cards */
--shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.15)       /* Modals */
--shadow-2xl: 0 16px 32px rgba(0, 0, 0, 0.18)      /* Mega menus */
```

### Elevation Layers
- **Ground (0)**: Background, page
- **Flat (xs)**: Buttons, inputs (default)
- **Raised (sm-md)**: Cards, sections
- **Floating (lg-xl)**: Dropdowns, tooltips
- **Modal (2xl)**: Dialogs, popovers

---

## 🔘 Border Radius

```css
--radius-sm: 4px       /* Buttons, small elements */
--radius-md: 8px       /* Cards, inputs */
--radius-lg: 12px      /* Large cards */
--radius-xl: 16px      /* Hero sections */
--radius-full: 9999px  /* Pills, badges */
```

---

## ⚡ Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)    /* Hover states */
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1)    /* Button clicks */
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1)    /* Complex animations */
```

### Usage
```css
transition: all var(--transition-base);           /* Multiple properties */
transition: transform var(--transition-fast);     /* Specific property */
```

---

## 🎯 Button Styles

### Primary Button (CTA)
```css
background: linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%);
color: var(--text-inverse);
padding: var(--space-md) var(--space-xl);
border-radius: var(--radius-md);
box-shadow: var(--shadow-sm);

/* Hover */
transform: translateY(-2px);
box-shadow: var(--shadow-lg);
```

### Secondary Button (Outlined)
```css
background: transparent;
color: var(--primary-600);
border: 2px solid var(--primary-500);
padding: var(--space-md) var(--space-xl);

/* Hover */
background: var(--primary-500);
color: var(--text-inverse);
```

### Danger Button
```css
background: var(--bg-primary);
color: var(--error);
border: 2px solid var(--error);

/* Hover */
background: var(--error);
color: var(--text-inverse);
```

---

## 📝 Form Elements

### Input Fields
```css
border: 2px solid var(--border-light);
border-radius: var(--radius-md);
padding: var(--space-sm) var(--space-md);
font-size: var(--font-size-base);

/* Focus */
border-color: var(--primary-500);
box-shadow: 0 0 0 3px var(--primary-50);

/* Error */
border-color: var(--error);
box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
```

### Labels
```css
font-size: var(--font-size-sm);
color: var(--text-secondary);
font-weight: var(--font-weight-semibold);
margin-bottom: var(--space-sm);
```

---

## 🃏 Card Components

### Product Card
```css
background: var(--bg-primary);
border-radius: var(--radius-lg);
box-shadow: var(--shadow-sm);
border: 1px solid var(--border-light);
padding: var(--space-lg);

/* Hover */
transform: translateY(-6px);
box-shadow: var(--shadow-xl);
border-color: var(--primary-200);
```

### Content Card
```css
background: var(--bg-primary);
border-radius: var(--radius-lg);
box-shadow: var(--shadow-md);
padding: var(--space-2xl);
border: 1px solid var(--border-light);
```

---

## 🎬 Animations

### Fade In (Page Load)
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

animation: fadeIn var(--transition-base);
```

### Slide Up (Notifications)
```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Pulse (Badges)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */

/* Small devices (phones) */
@media (max-width: 480px) {
  /* Single column, larger touch targets */
}

/* Medium devices (tablets) */
@media (max-width: 768px) {
  /* 2-column grids, adjusted spacing */
}

/* Large devices (desktops) */
@media (max-width: 992px) {
  /* Multi-column, full features */
}

/* Extra large devices */
@media (min-width: 1200px) {
  /* Maximum width containers */
}
```

---

## 🎨 Gradient Usage

### Primary Gradient
```css
background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
```

### Success Gradient
```css
background: linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%);
```

### Text Gradient
```css
background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## 🔍 Focus States (Accessibility)

### Ring Style
```css
outline: none;
box-shadow: 0 0 0 3px var(--primary-50);
border-color: var(--primary-500);
```

### Button Focus
```css
button:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

---

## 💡 Best Practices

### Do's ✅
- Use design tokens (CSS variables) for all values
- Follow spacing scale for consistency
- Apply appropriate elevation (shadows)
- Include hover, focus, and disabled states
- Test on mobile devices
- Use semantic color names

### Don'ts ❌
- Hard-code colors or spacing
- Use arbitrary values (e.g., `padding: 13px`)
- Forget focus states
- Over-animate (keep it subtle)
- Ignore contrast ratios
- Mix sizing units inconsistently

---

## 🛠️ Quick Reference

### Common Patterns

**Page Container:**
```css
max-width: 1200px;
margin: 0 auto;
padding: var(--space-3xl) var(--space-xl);
```

**Grid Layout:**
```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: var(--space-2xl);
```

**Button with Lift:**
```css
transition: all var(--transition-base);

&:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

**Focus Ring:**
```css
&:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-50);
}
```

---

This design system ensures consistency, maintainability, and a professional appearance across your entire application!

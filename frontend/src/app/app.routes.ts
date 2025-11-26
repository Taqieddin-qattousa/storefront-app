import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductItemDetail } from './components/product-item-detail/product-item-detail';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';
import { Confirmation } from './components/confirmation/confirmation';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'products', component: ProductList },
  { path: 'product/:id', component: ProductItemDetail },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout, canActivate: [authGuard] },
  { path: 'confirmation', component: Confirmation, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];

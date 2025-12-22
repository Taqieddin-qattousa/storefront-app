import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart-item';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    // Ensure quantity is between 1 and 99
    if (quantity < 1) {
      quantity = 1;
    }
    if (quantity > 99) {
      quantity = 99;
    }
    this.cartService.updateQuantity(productId, quantity);
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  getItemTotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  getShippingCost(): number {
    // Free shipping for orders over $50 (5000 cents)
    return this.total >= 5000 ? 0 : 9.99;
  }

  getGrandTotal(): number {
    return this.total + this.total * 0.1 + this.getShippingCost();
  }

  proceedToCheckout(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/checkout']);
      } else {
        alert('Please login or sign up to proceed with checkout.');
        // Optionally trigger login
        this.authService.login();
      }
    });
  }
}

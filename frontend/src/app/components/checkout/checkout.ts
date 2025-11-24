import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  checkoutForm!: FormGroup;
  cartItems: CartItem[] = [];
  total: number = 0;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Initialize form with validation
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      creditCard: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    });

    // Get cart items
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.checkoutForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop if form is invalid
    if (this.checkoutForm.invalid) {
      return;
    }

    // Create order object
    const order = {
      ...this.checkoutForm.value,
      items: this.cartItems,
      total: this.total,
      date: new Date(),
    };

    // Store order in localStorage for confirmation page
    localStorage.setItem('lastOrder', JSON.stringify(order));

    // Clear cart
    this.cartService.clearCart();

    // Navigate to confirmation
    this.router.navigate(['/confirmation']);
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
}

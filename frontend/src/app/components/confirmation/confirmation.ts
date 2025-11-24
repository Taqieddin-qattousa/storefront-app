import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../models/cart-item';

interface Order {
  firstName: string;
  lastName: string;
  address: string;
  creditCard: string;
  items: CartItem[];
  total: number;
  date: Date;
}

@Component({
  selector: 'app-confirmation',
  imports: [CommonModule, RouterLink],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation implements OnInit {
  order: Order | null = null;
  orderNumber: string = '';

  ngOnInit(): void {
    // Retrieve order from localStorage
    const savedOrder = localStorage.getItem('lastOrder');

    if (savedOrder) {
      this.order = JSON.parse(savedOrder);
      // Generate random order number
      this.orderNumber = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();

      // Clear order from localStorage after displaying
      localStorage.removeItem('lastOrder');
    }
  }

  getItemTotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  getShippingCost(): number {
    if (!this.order) {
      return 0;
    }
    // Free shipping for orders over $50 (5000 cents)
    return this.order.total >= 5000 ? 0 : 9.99;
  }

  getTotalWithTax(): number {
    return this.order ? this.order.total * 1.1 + this.getShippingCost() : 0;
  }

  getMaskedCreditCard(): string {
    if (!this.order) {
      return '';
    }
    const card = this.order.creditCard;
    return `**** **** **** ${card.slice(-4)}`;
  }
}

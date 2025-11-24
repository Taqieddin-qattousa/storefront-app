import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'shopping_cart';
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.cartItems = JSON.parse(saved);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItems));
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }

    this.saveToLocalStorage();
    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.product.id !== productId);
    this.saveToLocalStorage();
    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find((item) => item.product.id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveToLocalStorage();
        this.cartSubject.next([...this.cartItems]);
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveToLocalStorage();
    this.cartSubject.next([]);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }
}

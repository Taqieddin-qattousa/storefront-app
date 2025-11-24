import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  @Input() product!: Product;
  @Output() itemAdded = new EventEmitter<{ product: Product; quantity: number }>();

  quantity: number = 1;
  showSuccess: boolean = false;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
    this.itemAdded.emit({ product: this.product, quantity: this.quantity });

    // Show success message
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, 2000);

    // Reset quantity to 1
    this.quantity = 1;
  }

  onQuantityChange(): void {
    // Ensure quantity is at least 1
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }
}

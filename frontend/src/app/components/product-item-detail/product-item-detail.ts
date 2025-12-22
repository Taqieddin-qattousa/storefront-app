import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item-detail',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-item-detail.html',
  styleUrl: './product-item-detail.css',
})
export class ProductItemDetail implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  errorMessage: string = '';
  quantity: number = 1;
  showSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadProduct(+id);
    } else {
      this.errorMessage = 'Invalid product ID';
      this.loading = false;
    }
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.errorMessage = 'Product not found';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);

      // Show success message
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);

      // Reset quantity to 1
      this.quantity = 1;
    }
  }

  onQuantityChange(): void {
    // Ensure quantity is between 1 and 99
    if (this.quantity < 1) {
      this.quantity = 1;
    }
    if (this.quantity > 99) {
      this.quantity = 99;
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}

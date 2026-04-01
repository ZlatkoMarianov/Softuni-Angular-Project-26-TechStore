import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../core/services/toast.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product } from '../../shared/interfaces/product';

@Component({
  selector: 'app-my-products',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css',
})
export class MyProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private toast = inject(ToastService);

  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.loadMyProducts();
  }

  loadMyProducts(): void {
    this.productService.getMyProducts().subscribe({
      next: (data) => this.products.set(data),
      error: () => this.toast.error('Failed to load your products'),
    });
  }

}

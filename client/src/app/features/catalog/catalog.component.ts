import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product, ProductCategory } from '../../shared/interfaces/product';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  searchQuery = '';
  selectedCategory = '';

  readonly categories: ProductCategory[] = ['Phone', 'Laptop', 'Tablet', 'Accessory'];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.productService
      .getAll(this.searchQuery.trim(), this.selectedCategory)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => this.products.set(data),
        error: () => this.errorMessage.set('Failed to load products'),
      });
  }

  onSearch(): void {
    this.loadProducts();
  }

  onCategoryChange(): void {
    this.loadProducts();
  }

  onResetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.loadProducts();
  }
}

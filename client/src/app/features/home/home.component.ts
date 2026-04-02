import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/interfaces/product';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  private productService = inject(ProductService);

  latestProducts = signal<Product[]>([]);

  ngOnInit(): void {
    this.productService.getAll(undefined, undefined, 3).subscribe({
      next: (data) => this.latestProducts.set(data),
    });
  }
}

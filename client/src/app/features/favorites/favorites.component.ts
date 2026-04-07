import { Component, inject, OnInit, signal } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service.js';
import { ToastService } from '../../core/services/toast.service.js';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component.js';
import { Product } from '../../shared/interfaces/product.js';

@Component({
  selector: 'app-favorites',
  imports: [ProductCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  private favoritesService = inject(FavoritesService);
  private toast = inject(ToastService);

  favorites = signal<Product[]>([]);
  error = signal('');

  ngOnInit(): void {
    this.favoritesService.getFavorites().subscribe({
      next: (data) => this.favorites.set(data),
      error: () => {
        this.error.set('Failed to load favorite products.');
        this.toast.error('Failed to load favorites. Please try again later.');
      },
    });
  }
}

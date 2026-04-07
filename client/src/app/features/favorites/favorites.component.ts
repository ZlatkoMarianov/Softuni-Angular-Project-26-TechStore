import { Component, inject, OnInit, signal } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';
import { ToastService } from '../../core/services/toast.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product } from '../../shared/interfaces/product';

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
  isLoaded = signal(false);

  ngOnInit(): void {
    this.favoritesService.getFavorites().subscribe({
      next: (data) => {
        this.favorites.set(data);
        this.isLoaded.set(true);
      },
      error: () => {
        this.isLoaded.set(true);
        this.error.set('Failed to load favorite products.');
        this.toast.error('Failed to load favorites. Please try again later.');
      },
    });
  }

  onRemove(productId: string): void {
    this.favoritesService.removeFavorite(productId).subscribe({
      next: () => {
        this.favorites.update(list => list.filter(p => p._id !== productId));
        this.toast.success('Removed from favorites');
      },
      error: () => this.toast.error('Failed to remove from favorites'),
    });
  }
}

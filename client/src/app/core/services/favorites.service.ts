import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  getFavorites(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/users/favorites`);
  }

  addFavorite(productId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users/favorites/${productId}`, {});
  }

  removeFavorite(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/favorites/${productId}`);
  }
}

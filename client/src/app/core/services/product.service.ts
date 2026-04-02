import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product';
import { Comment } from '../../shared/interfaces/comment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  getAll(search?: string, category?: string, limit?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (category) params = params.set('category', category);
    if (limit) params = params.set('limit', limit.toString());
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params });
  }

  getMyProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/my`);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  create(data: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, data);
  }

  update(id: string, data: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

  getComments(productId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/products/${productId}/comments`);
  }

  addComment(productId: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/products/${productId}/comments`, { text });
  }
}
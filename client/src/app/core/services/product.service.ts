import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/interfaces/product';
import { Comment } from '../../shared/interfaces/comment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  getAll(search?: string, category?: string) {
    let url = `${this.apiUrl}/products`;
    const params: string[] = [];
    if (search) params.push(`search=${search}`);
    if (category) params.push(`category=${category}`);
    if (params.length) url += '?' + params.join('&');
    return this.http.get<Product[]>(url);
  }

  getById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  create(data: Partial<Product>) {
    return this.http.post<Product>(`${this.apiUrl}/products`, data);
  }

  update(id: string, data: Partial<Product>) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  getComments(productId: string) {
    return this.http.get<Comment[]>(`${this.apiUrl}/products/${productId}/comments`);
  }

  addComment(productId: string, text: string) {
    return this.http.post<Comment>(`${this.apiUrl}/products/${productId}/comments`, { text });
  }
}
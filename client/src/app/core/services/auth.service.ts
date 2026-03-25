import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { User } from "../../shared/interfaces/user";
import { Product } from "../../shared/interfaces/product";



@Injectable({ providedIn: 'root' })

export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api';

    private user = signal<User | null>(null);
    isLoggedIn = computed(() => this.user() !== null);
    currentUser = computed(() => this.user());

    login(email: string, password: string) {
        return this.http.post<User>(`${this.apiUrl}/login`, { email, password })
    }

    register(username: string, email: string, password: string, rePassword: string) {
        return this.http.post<User>(`${this.apiUrl}/register`, { username, email, password, rePassword })
    }

    logout() {
        return this.http.post(`${this.apiUrl}/logout`, {})
    }

    getProfile() {
        return this.http.get<User>(`${this.apiUrl}/users/profile`);
    }

    setUser(user: User | null) {
        this.user.set(user);
    }

    getFavorites() {
        return this.http.get<Product[]>(`${this.apiUrl}/users/favorites`);
    }

    addFavorite(productId: string) {
        return this.http.post(`${this.apiUrl}/users/favorites/${productId}`, {});
    }

    removeFavorite(productId: string) {
        return this.http.delete(`${this.apiUrl}/users/favorites/${productId}`);
    }
}
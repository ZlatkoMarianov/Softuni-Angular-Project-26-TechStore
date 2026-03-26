import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { User, LoginData, RegisterData } from "../../shared/interfaces/user";



@Injectable({ providedIn: 'root' })

export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api';

    private user = signal<User | null>(null);
    isLoggedIn = computed(() => this.user() !== null);
    currentUser = computed(() => this.user());

    login(loginData: LoginData): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, loginData);
    }

    register(registerData: RegisterData): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, registerData)
    }

    logout(): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/logout`, {});
    }

    getProfile(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/users/profile`);
    }

    setUser(user: User | null) {
        this.user.set(user);
    }
}
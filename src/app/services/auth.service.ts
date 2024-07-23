import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  register(user: {
    firstName: string,
    lastName: string,
    middleName: string,
    address: string,
    phone: string,
    email: string,
    password: string,
    role: string,
    isPermanentCustomer: boolean
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getUserId(): string {
    const currentUser = this.getUser();
    return currentUser.id || '';
  }

  isPermanentCustomer(): boolean {
    const user = this.getUser();
    console.log('User retrieved from localStorage:', user);
    return user && user.isPermanentCustomer;
  }
}

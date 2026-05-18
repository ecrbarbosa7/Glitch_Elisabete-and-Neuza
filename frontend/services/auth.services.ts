import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private favoritesUrl = 'http://localhost:3000/api/favorites';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  saveSession(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  isAdmin() {
    const user = this.getUser();
    return user?.role === 'admin';
    console.log(user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private getAuthHeaders() {
    const token = this.getToken();

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getFavorites() {
    return this.http.get<any>(
      this.favoritesUrl,
      this.getAuthHeaders()
    );
  }

  addFavorite(item: any) {
    return this.http.post<any>(
      this.favoritesUrl,
      item,
      this.getAuthHeaders()
    );
  }

  removeFavorite(title: string) {
    return this.http.delete<any>(
      `${this.favoritesUrl}/${encodeURIComponent(title)}`,
      this.getAuthHeaders()
    );
  }
}
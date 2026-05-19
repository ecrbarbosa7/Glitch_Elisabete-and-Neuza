import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/api/movies';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createMovie(movie: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      movie,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  updateMovie(id: string, movie: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      movie,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }
}
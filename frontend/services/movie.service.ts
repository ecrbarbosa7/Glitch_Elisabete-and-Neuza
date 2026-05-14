import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, movie);
  }

  updateMovie(id: string, movie: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, movie);
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private apiUrl = 'http://localhost:3000/api/series';

  constructor(private http: HttpClient) {}

  getSeries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createSerie(serie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, serie);
  }

  updateSerie(id: string, serie: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, serie);
  }

  deleteSerie(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
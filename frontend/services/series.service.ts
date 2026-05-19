import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SeriesService {

  private apiUrl = 'http://localhost:3000/api/series';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getSeries(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);
  }

  createSerie(serie: any): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      serie,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  updateSerie(id: string, serie: any): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      serie,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  deleteSerie(id: string): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }
}
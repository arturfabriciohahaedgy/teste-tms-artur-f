import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Indicators } from '../interfaces/dashboard-interfaces';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private http = inject(HttpClient);
  private url = `http://localhost:8000/api/dashboard`;

  getIndicators(): Observable<Indicators> {
    return this.http.get<Indicators>(`${this.url}/indicators`, {});
  }
}

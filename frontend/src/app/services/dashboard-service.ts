import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Indicators } from '../interfaces/dashboard-interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/dashboard`;

  getIndicators(): Observable<Indicators> {
    return this.http.get<Indicators>(`${this.url}/indicators`, {});
  }
}

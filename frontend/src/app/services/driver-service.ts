import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Driver, DriverPost } from '../interfaces/driver-intefaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DriverService {
  private http = inject(HttpClient);
  private url = `http://localhost:8000/api/driver`;
  private query = signal('');

  private drivers = httpResource<Driver[]>(() => `${this.url}?${this.query()}`);

  setQuery(value: string | number, type: 'is_active' | 'clear') {
    if (type === 'clear') {
      this.query.set('');
      return;
    }
    let setString = '';

    setString += `${type}=${value}`;
    this.query.set(setString);
  }

  getValue() {
    return this.drivers.value() ?? [];
  }

  reload() {
    this.drivers.reload();
  }

  getById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.url}/${id}`, {});
  }

  create(driver: DriverPost): Observable<Driver> {
    return this.http.post<Driver>(`${this.url}`, driver);
  }

  edit(driver: DriverPost, id: number): Observable<Driver> {
    return this.http.put<Driver>(`${this.url}/${id}`, driver);
  }

  inactivateDriver(id: number): Observable<DriverPost> {
    return this.http.patch<DriverPost>(`${this.url}/${id}/status`, {});
  }
}

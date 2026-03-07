import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Driver, DriverPost } from '../interface/driver-inteface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DriverService {
  private http = inject(HttpClient);
  private url = `http://localhost:8000/api/driver`;

  private drivers = httpResource<Driver[]>(() => this.url);

  // readonly values: Signal<Driver[] | undefined> = this.drivers.value;

  getValue() {
    return this.drivers.value() ?? [];
  }

  reload() {
    this.drivers.reload();
  }

  getById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.url}/${id}`, {});
  }

  createDriver(driver: DriverPost): Observable<DriverPost> {
    return this.http.post<DriverPost>(`${this.url}`, driver);
  }

  inactivateDriver(id: number): Observable<DriverPost> {
    return this.http.patch<DriverPost>(`${this.url}/${id}/status`, {});
  }
}

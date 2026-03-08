import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Order, OrderPost } from '../interfaces/order-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransportOrderService {
  private http = inject(HttpClient);
  private url = `http://localhost:8000/api/order`;
  private query = signal('');

  private orders = httpResource<Order[]>(() => `${this.url}?${this.query()}`);

  setQuery(value: string | number, type: 'limit' | 'status' | 'driver_id' | 'order_by' | 'clear') {
    if (type === 'clear') {
      this.query.set('');
      return;
    }
    let setString = this.query();

    if (setString !== '') {
      setString += '&';
      console.log('setString agora:', setString);
    }

    setString += `${type}=${value}`;
    console.log(setString);
    this.query.set(setString);
  }

  getValue() {
    return this.orders.value() ?? [];
  }

  reload() {
    this.orders.reload();
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.url}/${id}`, {});
  }

  create(order: OrderPost): Observable<OrderPost> {
    return this.http.post<OrderPost>(`${this.url}`, order);
  }

  edit(driver: OrderPost, id: number): Observable<Order> {
    return this.http.put<Order>(`${this.url}/${id}`, driver);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${id}`, {});
  }

  advanceOrder(id: number): Observable<Order> {
    return this.http.patch<Order>(`${this.url}/${id}/advance`, {});
  }
}

import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order, OrderPost } from '../interface/order-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransportOrderService {
  private http = inject(HttpClient);
  private url = `http://localhost:8000/api/order`;

  private orders = httpResource<Order[]>(() => this.url);

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
}

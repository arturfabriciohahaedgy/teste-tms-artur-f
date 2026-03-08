import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { StatusTitlePipe } from '../../shared/pipes/status-title-pipe';
import { DashboardCard } from '../../shared/components/dashboard-card/dashboard-card';
import { TransportOrderService } from '../../services/transport-order-service';

@Component({
  selector: 'tms-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [ButtonModule, TableModule, DatePipe, StatusTitlePipe, DashboardCard],
})
export class Dashboard implements OnInit {
  protected readonly transportOrderService = inject(TransportOrderService);
  indicators = {
    pending: 0,
    inProcess: 0,
    delivered: 0,
    total: 0,
  };

  ngOnInit() {
    this.transportOrderService.setQuery(10, 'limit');
  }
}

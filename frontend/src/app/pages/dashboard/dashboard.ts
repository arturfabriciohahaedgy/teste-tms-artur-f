import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { StatusTitlePipe } from '../../shared/pipes/status-title-pipe';
import { TransportOrderService } from '../../services/transport-order-service';
import { DashboardService } from '../../services/dashboard-service';
import { Indicators } from '../../interfaces/dashboard-interfaces';
import { DashboardCard } from './dashboard-card/dashboard-card';

@Component({
  selector: 'tms-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [ButtonModule, TableModule, DatePipe, StatusTitlePipe, DashboardCard],
})
export class Dashboard implements OnInit {
  protected readonly transportOrderService = inject(TransportOrderService);
  protected readonly dashboardService = inject(DashboardService);
  indicators: Indicators | null = null;

  ngOnInit() {
    this.transportOrderService.setQuery('', 'clear');
    this.transportOrderService.setQuery(10, 'limit');
    this.transportOrderService.setQuery('created_at', 'order_by');

    this.dashboardService.getIndicators().subscribe({
      next: (indicators) => {
        this.indicators = indicators;
      },
    });
  }
}

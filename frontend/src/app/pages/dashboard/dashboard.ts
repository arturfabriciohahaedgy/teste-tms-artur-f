import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { StatusTitlePipe } from '../../shared/pipes/status-title-pipe';
import { DashboardCard } from '../../shared/components/dashboard-card/dashboard-card';

@Component({
  selector: 'tms-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [ButtonModule, TableModule, DatePipe, StatusTitlePipe, DashboardCard],
})
export class Dashboard {
  orders = [
    {
      id: 20,
      number: 2020931,
      origin_address: 'Rua Beija-Flor',
      destination_address: 'Centro',
      weight_kg: 'A',
      status: 'collecting',
      scheduled_at: new Date(new Date().getMonth() - 3),
      created_at: new Date(),
      edited_at: null,
      active: true,
    },
  ];
}

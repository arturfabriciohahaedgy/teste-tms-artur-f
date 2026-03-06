import { Component, input } from '@angular/core';

@Component({
  selector: 'tms-dashboard-card',
  templateUrl: './dashboard-card.html',
  styleUrls: ['./dashboard-card.scss'],
  imports: [],
})
export class DashboardCard {
  readonly description = input<string>();
  readonly indicatorValue = input<string>();
  readonly indicatorName = input<string>();
  // TODO: Adicionar esse ícone
  // readonly icon = input<string>();
}

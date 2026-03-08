import { Component, input } from '@angular/core';

@Component({
  selector: 'tms-dashboard-card',
  templateUrl: './dashboard-card.html',
  styleUrls: ['./dashboard-card.scss'],
  imports: [],
})
export class DashboardCard {
  readonly description = input<string>();
  readonly indicatorValue = input<number>();
  readonly indicatorName = input<string>();
  readonly icon = input<string>();
  readonly color = input<string>();
}

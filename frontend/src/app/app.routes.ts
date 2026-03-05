import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Drivers } from './pages/drivers/drivers';
import { Orders } from './pages/orders/orders';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    title: 'TMS - Dashboard',
  },
  {
    path: 'motoristas',
    component: Drivers,
    title: 'TMS - Motoristas',
  },
  {
    path: 'ordens',
    component: Orders,
    title: 'TMS - Ordens de Transporte',
  },
];

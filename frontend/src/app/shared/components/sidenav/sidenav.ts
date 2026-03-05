import { Component } from '@angular/core';
import { SidenavButton } from '../sidenav-buttons/sidenav-button';

@Component({
  selector: 'tms-sidenav',
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss'],
  imports: [SidenavButton],
})
export class Sidenav {}

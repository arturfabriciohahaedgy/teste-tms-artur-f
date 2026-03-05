import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface LinkOptions {
  exact: true;
}

@Component({
  selector: 'tms-sidenav-button',
  templateUrl: './sidenav-button.html',
  styleUrls: ['./sidenav-button.scss'],
  imports: [RouterLink, RouterLinkActive],
})
export class SidenavButton {
  routerLink = input<string>();
  routerLinkActiveOptions: LinkOptions = { exact: true };
}

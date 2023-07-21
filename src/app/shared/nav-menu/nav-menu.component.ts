import { Component } from '@angular/core';
import {RoutingConstants} from '../../core/constants/routing.constants';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;
  routes = RoutingConstants;
  // user: IUser | null = null;
  // constructor(private authorize: AuthorizeService) {
    // authorize.getUser().subscribe(user => {
    //   this.user = user;
    // });
  // }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

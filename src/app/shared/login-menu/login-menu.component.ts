import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {RoutingConstants} from '../../core/constants/routing.constants';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss']
})
export class LoginMenuComponent {
  public isAuthenticated?: Observable<boolean>;
  public userName?: Observable<string | null | undefined>;
  routes = RoutingConstants;

  // constructor(private authorizeService: AuthorizeService) { }
  //
  // ngOnInit() {
  //   this.isAuthenticated = this.authorizeService.isAuthenticated();
  //   this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
  // }

  protected readonly RoutingConstants = RoutingConstants;
}

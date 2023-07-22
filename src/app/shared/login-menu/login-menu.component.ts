import { Component } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {RoutingConstants} from '../../core/constants/routing.constants';
import {SessionProvider} from '../../database/providers/session.provider';
import {SubscriptionDestroyComponent} from '../../core/subscription-destroy.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss']
})
export class LoginMenuComponent extends SubscriptionDestroyComponent {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userName?: BehaviorSubject<string | null | undefined>;
  routes = RoutingConstants;

  constructor(private sessionService: SessionProvider, private router: Router) {
    super();
    this.setNewSubscription = this.sessionService.session$.subscribe(session => {
      this.isAuthenticated.next(session !== null ?? false);
      this.userName = new BehaviorSubject<string | null | undefined>(session?.user?.email ?? null);
    });
  }

  onLogoutClick() {
    this.sessionService.signOut().then((result: any) => {
      this.router.navigate([RoutingConstants.AUTH + '/' + RoutingConstants.AUTH.LOGIN]);
    });
  }
}

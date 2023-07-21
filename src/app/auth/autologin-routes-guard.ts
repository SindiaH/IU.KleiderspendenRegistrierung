import {SubscriptionDestroyComponent} from '../core/subscription-destroy.component';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from '@angular/core';
import {Session} from '@supabase/supabase-js';
import {SessionProvider} from '../database/providers/session.provider';
import {Observable, of} from 'rxjs';
import {RoutingConstants} from '../core/constants/routing.constants';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginRoutesGuard extends SubscriptionDestroyComponent  implements CanActivate, CanActivateChild, CanLoad {
  private session: Session | null = null;
  private isSessionLoading = true;

  constructor(private readonly router: Router, private sessionProvider: SessionProvider) {
    super();
    this.setNewSubscription = this.sessionProvider.loading$.subscribe(isSessionloading => {
      this.isSessionLoading = isSessionloading;
    });
    this.setNewSubscription = this.sessionProvider.session$.subscribe(session => {
      // if (!session) {
      //   console.log('Validation failed. Redirecting to login page.');
      //   this.router.navigate([ConstantStrings.routes.login], {replaceUrl: true});
      // }
      this.session = session;
    });
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.checkAuth(this.router.getCurrentNavigation()?.extractedUrl.toString().substring(1) ?? '');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkAuth(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkAuth(state.url);
  }

  private checkAuth(url: string): Observable<boolean> {
    if (this.session) {
      return of(true);
    } else {
      if(this.isSessionLoading){
        const interval = setInterval(() => {
          // console.log('Waiting for validation...');
          if(!this.isSessionLoading){
            clearInterval(interval);
            if(!this.session){
              // console.log('Validation failed. Redirecting to login page.');
              this.router.navigate([RoutingConstants.AUTH.LOGIN]);
            }else {

            }
          }
        },200);
        return of(true);
      } else {
        this.router.navigate([RoutingConstants.AUTH.LOGIN]);
        return of(true);
      }
    }
  }
}

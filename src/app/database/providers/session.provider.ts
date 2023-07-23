import {Session} from '@supabase/supabase-js';
import {BehaviorSubject} from 'rxjs';
import {IDatabaseAuthService} from '../interfaces/database-auth-service.interface';
import {CookieService} from 'ngx-cookie-service';
import {Injectable} from '@angular/core';
import {DatabaseFacory} from '../database.factory';
import {SupabaseService} from '../../core/service/supabase.service';

@Injectable()
export class SessionProvider {
  private session = new BehaviorSubject<Session | null>(null);
  private loading = new BehaviorSubject<boolean>(true);
  private goToPwReset = new BehaviorSubject<boolean>(false);
  public session$ = this.session.asObservable();
  public loading$ = this.loading.asObservable();
  public goToPwReset$ = this.goToPwReset.asObservable();
  private authProvider: IDatabaseAuthService;

  constructor(private cookieService: CookieService, private service: SupabaseService) {
    const factory = new DatabaseFacory(service);
    this.authProvider = factory.createDatabaseAuthService('supabase');
    this.authProvider.getSession().then(session => {
      this.loading.next(false);
      this.session.next(session);
    });
    this.authProvider.authChanges((_, session) => {
      this.session.next(session);
    });
  }

  signOut() {
    return this.authProvider.signOut().then(() => {
      this.session.next(null);
      return true;
    });
  }

  updateSession(session: Session) {
    this.session.next(session);
  }

  setGoToPwReset(goToPwReset: boolean) {
    this.goToPwReset.next(goToPwReset);
  }

  signInWPw(email: string, password: string) {
    return this.authProvider.signInWPw(email, password);
  }

  signInWLink(email: string) {
    return this.authProvider.signInWLink(email);
  }

  setPasswordWithSession(password: string, session: Session) {
    return this.authProvider.setPasswordWithSession(password, session);
  }
  setPassword(password: string) {
    return this.authProvider.setPassword(password);
  }

  sendResetPasswordLink(email: string, resetPwLink: string) {
    return this.authProvider.sendResetPasswordLink(email, resetPwLink);
  }

  signupWPw(email: string, password: string) {
    return this.authProvider.signUpWithPw(email, password);
  }
}

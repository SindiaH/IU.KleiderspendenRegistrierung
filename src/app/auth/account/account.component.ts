import { Component } from '@angular/core';
import {SubscriptionDestroyComponent} from '../../core/subscription-destroy.component';
import {SessionProvider} from '../../database/providers/session.provider';
import {Session} from '@supabase/supabase-js';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends SubscriptionDestroyComponent {
  session: Session | null = null;
  constructor(private sessionService: SessionProvider) {
    super();
    this.setNewSubscription = this.sessionService.session$.subscribe(session => {
      this.session = session;
    })
  }
}

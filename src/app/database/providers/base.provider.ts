import {SubscriptionDestroyComponent} from '../../core/subscription-destroy.component';
import {DatabaseFacory} from '../database.factory';
import {Session} from '@supabase/supabase-js';
import {SessionProvider} from './session.provider';

export class DatabaseBaseProvider extends SubscriptionDestroyComponent  {
  factory = new DatabaseFacory();
  session: Session | null = null;
  constructor(public sessionProvider: SessionProvider) {
    super();
    this.setNewSubscription = this.sessionProvider.session$.subscribe(session => {
      this.session = session;
    });
  }
}

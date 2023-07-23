import {SubscriptionDestroyComponent} from '../../core/subscription-destroy.component';
import {DatabaseFacory} from '../database.factory';
import {Session} from '@supabase/supabase-js';
import {SessionProvider} from './session.provider';
import {SupabaseService} from '../../core/service/supabase.service';

export class DatabaseBaseProvider extends SubscriptionDestroyComponent  {
  factory: DatabaseFacory;
  session: Session | null = null;
  constructor(public sessionProvider: SessionProvider, private service: SupabaseService) {
    super();
    this.factory = new DatabaseFacory(this.service);
    this.setNewSubscription = this.sessionProvider.session$.subscribe(session => {
      this.session = session;
    });
  }
}

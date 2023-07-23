import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient;
  constructor() {
    const options = {
      db: {
        schema: 'public',
      },
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
      // global: {
      //   headers: { 'x-my-custom-header': 'my-app-name' },
      // },
    };
    // @ts-ignore
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, options);
  }
}

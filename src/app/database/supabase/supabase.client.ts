import {SupabaseClient, createClient} from '@supabase/supabase-js';
import {environment} from '../../../environments/environment';

export class CustomSupabaseClient {
  public supabase: SupabaseClient;

  constructor(schemaName: string = 'public') {
    const options = {
      db: {
        schema: schemaName,
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

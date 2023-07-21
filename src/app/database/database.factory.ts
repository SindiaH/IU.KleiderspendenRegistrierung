import {IDatabaseAuthService} from './interfaces/database-auth-service.interface';
import {SupabaseAuthService} from './supabase/supabase.auth.service';

export type DatabaseType = 'supabase' | 'test';


export class DatabaseFacory {
  constructor() {
  }
  public createDatabaseAuthService(type: DatabaseType): IDatabaseAuthService {
    return new SupabaseAuthService();
  }
}

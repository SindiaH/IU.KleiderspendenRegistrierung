import {IDatabaseAuthService} from './interfaces/database-auth-service.interface';
import {SupabaseAuthService} from './supabase/supabase.auth.service';
import {IDatabaseAddressService} from './interfaces/address.interface';
import {SupabaseAddressService} from './supabase/supabase.address.service';
import {IDatabaseCrisisAreaLocalizedService} from './interfaces/crisisArea-localized.interface';
import {SupabaseCrisisAreaService} from './supabase/supabase.crisis-area.service';
import {IDatabaseDonationService} from './interfaces/donation.interface';
import {SupabaseDonationService} from './supabase/supabase.donation.service';
import {IDatabaseDonationTypeLocalizedService} from './interfaces/donation-type-localized.interface';
import {SupabaseDonationTypeService} from './supabase/supabase.donation-type.service';

export type DatabaseType = 'supabase' | 'test';


export class DatabaseFacory {
  constructor() {
  }
  public createDatabaseAuthService(type: DatabaseType): IDatabaseAuthService {
    return new SupabaseAuthService();
  }
  public createDatabaseAddressService(type: DatabaseType): IDatabaseAddressService {
    return new SupabaseAddressService();
  }
  public createDatabaseCrisisAreaLocalizedService(type: DatabaseType): IDatabaseCrisisAreaLocalizedService {
    return new SupabaseCrisisAreaService();
  }
  public createDatabaseDonationService(type: DatabaseType): IDatabaseDonationService {
    return new SupabaseDonationService();
  }
  public createDatabaseDonationTypeService(type: DatabaseType): IDatabaseDonationTypeLocalizedService {
    return new SupabaseDonationTypeService();
  }
}

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
import {SupabaseService} from '../core/service/supabase.service';

export type DatabaseType = 'supabase' | 'test';


export class DatabaseFacory {
  constructor(private service: SupabaseService) {
  }
  public createDatabaseAuthService(type: DatabaseType): IDatabaseAuthService {
    return new SupabaseAuthService(this.service);
  }
  public createDatabaseAddressService(type: DatabaseType): IDatabaseAddressService {
    return new SupabaseAddressService(this.service);
  }
  public createDatabaseCrisisAreaLocalizedService(type: DatabaseType): IDatabaseCrisisAreaLocalizedService {
    return new SupabaseCrisisAreaService(this.service);
  }
  public createDatabaseDonationService(type: DatabaseType): IDatabaseDonationService {
    return new SupabaseDonationService(this.service);
  }
  public createDatabaseDonationTypeService(type: DatabaseType): IDatabaseDonationTypeLocalizedService {
    return new SupabaseDonationTypeService(this.service);
  }
}

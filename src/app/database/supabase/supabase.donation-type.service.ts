import {Injectable} from '@angular/core';
import {IDatabaseDonationTypeLocalizedService} from '../interfaces/donation-type-localized.interface';
import {SupabaseService} from '../../core/service/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseDonationTypeService implements IDatabaseDonationTypeLocalizedService {
  entityName = 'donationtypelocalized';

  constructor(private service: SupabaseService) {
  }

  getById(id: string, lang: string) {
    return this.service.supabase.from(this.entityName)
      .select(`id`)
      .eq('id', id)
      .eq('lang', lang)
      .single();
  }

  getList(lang: string) {
    let query = this.service.supabase.from(this.entityName)
      .select('*').eq('lang', lang);
    return query;
  }

}

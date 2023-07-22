import {CustomSupabaseClient} from './supabase.client';
import {Injectable} from '@angular/core';
import {IDatabaseDonationTypeLocalizedService} from '../interfaces/donation-type-localized.interface';

@Injectable({
  providedIn: 'root',
})
export class SupabaseDonationTypeService extends CustomSupabaseClient implements IDatabaseDonationTypeLocalizedService {
  entityName = 'donationtypelocalized';

  constructor() {
    super();
  }

  getById(id: string, lang: string) {
    return this.supabase.from(this.entityName)
      .select(`id`)
      .eq('id', id)
      .eq('lang', lang)
      .single();
  }

  getList(lang: string) {
    let query = this.supabase.from(this.entityName)
      .select('*').eq('lang', lang);
    return query;
  }

}

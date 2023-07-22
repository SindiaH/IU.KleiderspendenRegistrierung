import {CustomSupabaseClient} from './supabase.client';
import {Injectable} from '@angular/core';
import {IDatabaseCrisisAreaLocalizedService} from '../interfaces/crisisArea-localized.interface';

@Injectable({
  providedIn: 'root',
})
export class SupabaseCrisisAreaService extends CustomSupabaseClient implements IDatabaseCrisisAreaLocalizedService {
  entityName = 'crisisareaslocalized';

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

import {Injectable} from '@angular/core';
import {IDatabaseCrisisAreaLocalizedService} from '../interfaces/crisisArea-localized.interface';
import {SupabaseService} from '../../core/service/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseCrisisAreaService implements IDatabaseCrisisAreaLocalizedService {
  entityName = 'crisisareaslocalized';

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

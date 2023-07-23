import {Injectable} from '@angular/core';
import {IDatabaseDonationService} from '../interfaces/donation.interface';
import {DonationEntity} from '../entities/donation.entity';
import {SupabaseService} from '../../core/service/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseDonationService implements IDatabaseDonationService {
  entityName = 'donation';

  constructor(private service: SupabaseService) {
  }


  add(item: DonationEntity) {
    return this.service.supabase.from(this.entityName)
      .insert(item);
  }

  remove(id: string) {
    return this.service.supabase.from(this.entityName)
      .delete().eq('id', id).select();
  }

  edit(task: DonationEntity) {
    return this.service.supabase.from(this.entityName).upsert(task)
      .eq('id', task.id);
  }

  getById(id: string) {
    return this.service.supabase.from(this.entityName)
      .select(`id, address(*)`)
      .eq('id', id)
      .single();
  }

  getList() {
    let query = this.service.supabase.from(this.entityName)
      .select('*, address(*)');
    return query;
  }

}

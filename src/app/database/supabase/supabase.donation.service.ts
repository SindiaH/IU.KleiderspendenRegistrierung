import {CustomSupabaseClient} from './supabase.client';
import {Injectable} from '@angular/core';
import {IDatabaseDonationService} from '../interfaces/donation.interface';
import {DonationEntity} from '../entities/donation.entity';

@Injectable({
  providedIn: 'root',
})
export class SupabaseDonationService extends CustomSupabaseClient implements IDatabaseDonationService {
  entityName = 'donation';

  constructor() {
    super();
  }


  add(item: DonationEntity) {
    console.log('upsert', item);
    return this.supabase.from(this.entityName)
      .insert(item);
  }

  remove(id: string) {
    return this.supabase.from(this.entityName)
      .delete().eq('id', id).select();
  }

  edit(task: DonationEntity) {
    return this.supabase.from(this.entityName).upsert(task)
      .eq('id', task.id);
  }

  getById(id: string) {
    return this.supabase.from(this.entityName)
      .select(`id, address(*)`)
      .eq('id', id)
      .single();
  }

  getList() {
    let query = this.supabase.from(this.entityName)
      .select('*, address(*)');
    return query;
  }

}

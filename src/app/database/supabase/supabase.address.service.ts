import {CustomSupabaseClient} from './supabase.client';
import {IDatabaseAddressService} from '../interfaces/address.interface';
import {Injectable} from '@angular/core';
import {AddressEntity} from '../entities/address.entity';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAddressService extends CustomSupabaseClient implements IDatabaseAddressService {
  entityName = 'address';

  constructor() {
    super();
  }


  add(item: AddressEntity) {
    return this.supabase.from(this.entityName)
      .insert(item);
  }

  remove(id: string) {
    return this.supabase.from(this.entityName)
      .delete().eq('id', id).select();
  }

  edit(task: AddressEntity) {
    return this.supabase.from(this.entityName).upsert(task)
      .eq('id', task.id);
  }

  getById(id: string) {
    return this.supabase.from(this.entityName)
      .select(`id`)
      .eq('id', id)
      .single();
  }

  getList() {
    let query = this.supabase.from(this.entityName)
      .select('*');
    return query;
  }

}

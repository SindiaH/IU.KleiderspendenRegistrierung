import {IDatabaseAddressService} from '../interfaces/address.interface';
import {Injectable} from '@angular/core';
import {AddressEntity} from '../entities/address.entity';
import {SupabaseService} from '../../core/service/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAddressService implements IDatabaseAddressService {
  entityName = 'address';

  constructor(private service: SupabaseService) {
  }


  add(item: AddressEntity) {
    return this.service.supabase.from(this.entityName)
      .insert(item);
  }

  remove(id: string) {
    return this.service.supabase.from(this.entityName)
      .delete().eq('id', id).select();
  }

  edit(task: AddressEntity) {
    return this.service.supabase.from(this.entityName).upsert(task)
      .eq('id', task.id);
  }

  getById(id: string) {
    return this.service.supabase.from(this.entityName)
      .select(`id`)
      .eq('id', id)
      .single();
  }

  getList() {
    let query = this.service.supabase.from(this.entityName)
      .select('*');
    return query;
  }

}

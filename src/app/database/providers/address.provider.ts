import {Injectable} from '@angular/core';
import {DatabaseBaseProvider} from './base.provider';
import {IDatabaseAddressService} from '../interfaces/address.interface';
import {SessionProvider} from './session.provider';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
import {AddressEntity} from '../entities/address.entity';
import {ResponseInterface} from '../interfaces/response.interface';
import {isHttpStatusOk} from '../../core/extensions/number.extension';

@Injectable()
export class AddressProvider extends DatabaseBaseProvider {
  private addressService: IDatabaseAddressService | null = null;
  addresses = new BehaviorSubject<AddressEntity[]>([]);

  constructor(sessionProvider: SessionProvider,
              private readonly toasr: ToastrService) {
    super(sessionProvider);
    this.addressService = this.factory.createDatabaseAddressService('supabase');
    this.getList();
  }

  getList() {
    return this.addressService?.getList().then((response: ResponseInterface) => {
      if (isHttpStatusOk(response.status)) {
        this.addresses.next(response.data);
      }
      return response.data;
    });
  }
  add(task: AddressEntity) {
    return this.addressService?.add(task).then((response: ResponseInterface) => {
      if (isHttpStatusOk(response.status) && response.data.length > 0) {
        const list = this.addresses.value;
        list.push(response.data[0]);
        this.addresses.next(list);
      } else {
        this.toasr.error('Error', 'Error adding addresses');
      }
      return response;
    });
  }

  remove(id: string) {
    return this.addressService?.remove(id).then((response: ResponseInterface) => {
      if (isHttpStatusOk(response.status)) {
        const list = this.addresses.value.filter(x => x.id !== id);
        this.addresses.next(list);
      }
      return response;
    });
  }

  edit(task: AddressEntity) {
    return this.addressService?.edit(task).then((response: ResponseInterface) => {
      if (isHttpStatusOk(response.status)) {
        const list = this.addresses.value;
        list.map(item => {
          if (item.id === task.id) {
            return task;
          }
          return item;
        });
        this.addresses.next(list);
      }
      return response;
    });
  }
  getById(id: string) {
    return this.addressService?.getById(id);
  }

}

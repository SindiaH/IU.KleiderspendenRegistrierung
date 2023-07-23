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
  add(address: AddressEntity) {
    return this.addressService?.add(address).then((response: ResponseInterface) => {
      if (isHttpStatusOk(response.status)) {
        const list = this.addresses.value;
        list.push(address);
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

  edit(address: AddressEntity) {
    return this.addressService?.edit(address).then((response: ResponseInterface) => {
      if (isHttpStatusOk(response.status)) {
        const list = this.addresses.value;
        list.map(item => {
          if (item.id === address.id) {
            return address;
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

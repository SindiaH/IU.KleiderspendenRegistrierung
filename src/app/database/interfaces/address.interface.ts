import {AddressEntity} from '../entities/address.entity';

export interface IDatabaseAddressService {
  add(task: AddressEntity): any;
  remove(id: string): any;
  edit(folder: AddressEntity): any;
  getById(id: string): any;
  getList(): any;
}

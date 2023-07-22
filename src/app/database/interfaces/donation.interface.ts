import {DonationEntity} from '../entities/donation.entity';

export interface IDatabaseDonationService {
  add(task: DonationEntity): any;
  remove(id: string): any;
  edit(folder: DonationEntity): any;
  getById(id: string): any;
  getList(): any;
}

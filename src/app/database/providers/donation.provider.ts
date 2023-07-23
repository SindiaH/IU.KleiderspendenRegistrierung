import {Injectable} from '@angular/core';
import {DatabaseBaseProvider} from './base.provider';
import {IDatabaseDonationService} from '../interfaces/donation.interface';
import {BehaviorSubject} from 'rxjs';
import {AddressEntity} from '../entities/address.entity';
import {SessionProvider} from './session.provider';
import {ToastrService} from 'ngx-toastr';
import {DonationEntity} from '../entities/donation.entity';
import {isHttpStatusOk} from '../../core/extensions/number.extension';
import {IDatabaseAddressService} from '../interfaces/address.interface';
import {ResponseInterface} from '../interfaces/response.interface';
import {Guid} from 'guid-typescript';
import {SubscriptionDestroyComponent} from '../../core/subscription-destroy.component';
import {DatabaseFacory} from '../database.factory';
import {Session} from '@supabase/supabase-js';
import {TranslateService} from '@ngx-translate/core';
import {SupabaseService} from '../../core/service/supabase.service';

@Injectable()
export class DonationProvider extends SubscriptionDestroyComponent {
  private donationService: IDatabaseDonationService | null = null;
  private addressService: IDatabaseAddressService | null = null;
  donations = new BehaviorSubject<DonationEntity[]>([]);
  factory: DatabaseFacory;
  session: Session | null = null;
  currentlySelectedDonation = new BehaviorSubject<DonationEntity | undefined>(undefined);

  constructor(sessionProvider: SessionProvider,
              private readonly toasr: ToastrService,
              private translate: TranslateService,
              service: SupabaseService) {
    super();
    this.setNewSubscription = sessionProvider.session$.subscribe(session => {
      if(this.session?.user.id !== session?.user.id) {
        this.getList();
      }
      this.session = session;
    });
    this.factory = new DatabaseFacory(service);
    this.donationService = this.factory.createDatabaseDonationService('supabase');
    this.addressService = this.factory.createDatabaseAddressService('supabase');
  }

  getList() {
    return this.donationService?.getList().then((response: ResponseInterface) => {
      if (isHttpStatusOk(response.status)) {
        this.donations.next(response.data);
      }
      return response.data;
    });
  }
  add(donation: DonationEntity, address?: AddressEntity) {
    if(address && address.country) {
      let addrId = Guid.create().toString();
      address.id = addrId;
      if(this.session?.user.id) {
        address.userId = this.session?.user.id;
      }
      address.email = donation.email;
      return this.addressService?.add(address).then((response: ResponseInterface) => {
        if (isHttpStatusOk(response.status)) {
          donation.addressId = addrId;
          return this.addFinally(donation);
        } else {
          this.toasr.error('Error', 'Error adding addresses');
        }
        return response;
      });
    } else {
      return this.addFinally(donation);
    }
  }
  private addFinally(donation: DonationEntity, address?: AddressEntity) {
    if(this.session?.user.id) {
      donation.userId = this.session?.user.id;
    }
    return this.donationService?.add(donation).then((response: ResponseInterface) => {
      if (isHttpStatusOk(response.status)) {
        if(address) {
          donation.address = address;
        }
        const list = this.donations.value;
        list.push(donation);
        this.currentlySelectedDonation.next(donation);
        this.donations.next(list);
        this.toasr.success(this.translate.instant('DONATION.SUCCESSFULLY_SUBMITTED'), this.translate.instant('SUCCESS'));
      } else {
        this.toasr.error('Error', 'Error adding donations');
      }
      return response;
    });
  }

  selectDonation(donation: DonationEntity) {
    this.currentlySelectedDonation.next(donation);
  }

  remove(id: string) {
    return this.donationService?.remove(id).then((response: ResponseInterface) => {
      if (isHttpStatusOk(response.status)) {
        const list = this.donations.value.filter(x => x.id !== id);
        this.donations.next(list);
      }
      return response;
    });
  }

  edit(donation: DonationEntity) {
    return this.donationService?.edit(donation).then((response: ResponseInterface) => {
      if (isHttpStatusOk(response.status)) {
        const list = this.donations.value;
        list.map(item => {
          if (item.id === donation.id) {
            return donation;
          }
          return item;
        });
        this.donations.next(list);
      }
      return response;
    });
  }
  getById(id: string) {
    return this.donationService?.getById(id);
  }
}

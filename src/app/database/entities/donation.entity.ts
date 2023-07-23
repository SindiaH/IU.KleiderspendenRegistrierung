import {DeliveryType} from '../../core/enums/delivery-type.enum';
import {AddressEntity} from './address.entity';

export class DonationEntity {
  id: string = '';
  createdAt?: Date;
  email: string = '';
  donationTypeId: string = '';
  addressId?: string;
  crisisAreaId: string = '';
  pickupDate: Date = new Date();
  deliveryType: DeliveryType = DeliveryType.PICKUP;
  userId?: string;
  address?: AddressEntity;
  donationTypeName?: string;
  crisisAreaName?: string;
}

import { Pipe, PipeTransform } from '@angular/core';
import {DeliveryType} from '../enums/delivery-type.enum';

@Pipe({
  name: 'deliveryType'
})
export class deliveryTypePipe implements PipeTransform {
  transform(value: number): string {
    if(value === DeliveryType.PICKUP) {
      return 'DONATION.PICKUP';
    } else {
      return 'DONATION.ONSITE';
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import {DonationTypeLocalizedEntity} from '../../database/entities/donationType.localized.entity';

@Pipe({
  name: 'donationType'
})
export class donationTypePipe implements PipeTransform {
  transform(id: string, donationTypes: DonationTypeLocalizedEntity[]): string {
    let donationType = donationTypes.find(x => x.id === id);
    return donationType ? donationType.name : '';
  }
}

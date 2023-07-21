import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { DonationComponent } from './donation/donation.component';
import {DonationRoutingModule} from './donation-routing.module';

@NgModule({
  declarations: [
    DonationComponent
  ],
  imports: [
    SharedModule,
    DonationRoutingModule
  ],
  exports: []
})
export class DonationModule {}

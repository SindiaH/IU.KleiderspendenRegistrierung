import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { DonationComponent } from './donation/donation.component';
import {DonationRoutingModule} from './donation-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    DonationComponent
  ],
  imports: [
    SharedModule,
    DonationRoutingModule,
    MatDatepickerModule
  ],
  exports: []
})
export class DonationModule {}

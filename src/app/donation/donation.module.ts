import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { DonationComponent } from './donation/donation.component';
import {DonationRoutingModule} from './donation-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DonationOverviewComponent } from './donation-overview/donation-overview.component';
import { DonationDetailsComponent } from './donation/donation-details/donation-details.component';

@NgModule({
  declarations: [
    DonationComponent,
    DonationOverviewComponent,
    DonationDetailsComponent
  ],
  imports: [
    SharedModule,
    DonationRoutingModule,
    MatDatepickerModule
  ],
  exports: []
})
export class DonationModule {}

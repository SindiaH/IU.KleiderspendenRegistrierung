import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { DonationComponent } from './donation/donation.component';
import {DonationRoutingModule} from './donation-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DonationOverviewComponent } from './donation-overview/donation-overview.component';
import { DonationDetailsComponent } from './donation/donation-details/donation-details.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    DonationComponent,
    DonationOverviewComponent,
    DonationDetailsComponent
  ],
  imports: [
    SharedModule,
    DonationRoutingModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  exports: []
})
export class DonationModule {}

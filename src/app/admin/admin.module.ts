import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { DonationOverviewComponent } from './donation-overview/donation-overview.component';
import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
  declarations: [
    DonationOverviewComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  exports: []
})
export class AdminModule {}

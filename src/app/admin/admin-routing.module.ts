import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DonationOverviewComponent} from './donation-overview/donation-overview.component';

const routes: Routes = [
  {
    path: '',
    component: DonationOverviewComponent
  },
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

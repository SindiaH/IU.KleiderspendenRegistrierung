import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DonationComponent} from './donation/donation.component';

const routes: Routes = [
  {
    path: '',
    component: DonationComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationRoutingModule {}

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DonationComponent} from './donation/donation.component';
import {DonationDetailsComponent} from './donation/donation-details/donation-details.component';
import {DonationOverviewComponent} from './donation-overview/donation-overview.component';
import {RoutingConstants} from '../core/constants/routing.constants';
import {AutoLoginRoutesGuard} from '../auth/autologin-routes-guard';

const routes: Routes = [
  {
    path: '',
    component: DonationComponent
  },
  {
    path: RoutingConstants.DONATION.DETAIL,
    component: DonationDetailsComponent,
    canActivate: [AutoLoginRoutesGuard]
  },
  {
    path: RoutingConstants.DONATION.OVERVIEW,
    component: DonationOverviewComponent,
    canActivate: [AutoLoginRoutesGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationRoutingModule {}

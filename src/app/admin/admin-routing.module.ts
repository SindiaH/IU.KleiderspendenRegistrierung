import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DonationOverviewComponent} from './donation-overview/donation-overview.component';
import {AutoLoginRoutesGuard} from '../auth/autologin-routes-guard';

const routes: Routes = [
  {
    path: '',
    component: DonationOverviewComponent,
    canActivate: [AutoLoginRoutesGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BaseComponent} from './base/base/base.component';
import {RoutingConstants} from './core/constants/routing.constants';

const routes: Routes = [
  {path: '', component: BaseComponent, pathMatch: 'full'},
  {path: RoutingConstants.DONATION.BASE, loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule)},
  {path: RoutingConstants.ADMIN.BASE, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

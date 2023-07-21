import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseComponent} from './base/base/base.component';
import {RoutingConstants} from './core/constants/routing.constants';
import {ImpressumComponent} from './shared/footer/impressum/impressum.component';
import {DataProtectionComponent} from './shared/footer/data-protection/data-protection.component';

const routes: Routes = [
  {
    path: '', component:
    BaseComponent, pathMatch: 'full'
  },
  {
    path: RoutingConstants.IMPRESSUM,
    component: ImpressumComponent
  },
  {
    path: RoutingConstants.DataProtection,
    component: DataProtectionComponent
  },
  {
    path: RoutingConstants.DONATION.BASE,
    loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule)
  },
  {
    path: RoutingConstants.ADMIN.BASE,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: RoutingConstants.AUTH.BASE,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RoutingConstants} from '../core/constants/routing.constants';
import {AccountComponent} from './account/account.component';
import {AutoLoginRoutesGuard} from './autologin-routes-guard';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';

const routes: Routes = [
  {
    path: RoutingConstants.AUTH.ACCOUNT,
    component: AccountComponent,
    canActivate: [AutoLoginRoutesGuard]
  },
  {
    path: RoutingConstants.AUTH.LOGIN,
    component: LoginComponent
  },
  {
    path: RoutingConstants.AUTH.REGISTER,
    component: RegisterComponent
  },
  {
    path: RoutingConstants.AUTH.PASSWORD_RESET,
    component: PasswordResetComponent
  }
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

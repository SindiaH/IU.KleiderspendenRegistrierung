import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {AccountComponent} from './account/account.component';
import {LoginComponent} from './login/login.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {RegisterComponent} from './register/register.component';
import {AuthRoutingModule} from './auth.routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [AccountComponent, LoginComponent, PasswordResetComponent, RegisterComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
    MatTooltipModule
  ],
  exports: [

  ]

})
export class AuthModule {}

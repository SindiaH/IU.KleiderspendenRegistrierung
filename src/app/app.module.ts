import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {BaseModule} from './base/base.module';
import {AdminModule} from './admin/admin.module';
import {DonationModule} from './donation/donation.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from './auth/auth.module';
import {DatabaseModule} from './database/database.module';
import {ToastrModule} from 'ngx-toastr';
import {CookieModule} from 'ngx-cookie';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    ToastrModule.forRoot(),
    CookieModule.withOptions(),
    SharedModule,
    BaseModule,
    AdminModule,
    DonationModule,
    BrowserAnimationsModule,
    AuthModule,
    DatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TranslationToggleComponent} from '../core/i18n/translation-toggle/translation-toggle.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {LoginMenuComponent} from './login-menu/login-menu.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import { ImpressumComponent } from './footer/impressum/impressum.component';
import { DataProtectionComponent } from './footer/data-protection/data-protection.component';
import {SubscriptionDestroyComponent} from '../core/subscription-destroy.component';
import {SessionProvider} from '../database/providers/session.provider';
import {AddressProvider} from '../database/providers/address.provider';
import {CrisisAreaProvider} from '../database/providers/crisis-area.provider';
import {DonationProvider} from '../database/providers/donation.provider';
import {DonationTypeProvider} from '../database/providers/donation-type.provider';
import {dateFormatPipe} from '../core/pipe/date.pipe';
import {deliveryTypePipe} from '../core/pipe/delivery-type.pipe';
import {crisisAreaTypePipe} from '../core/pipe/crisis-area.pipe';
import {donationTypePipe} from '../core/pipe/donation-type.pipe';

@NgModule({
  declarations: [
    TranslationToggleComponent,
    NavMenuComponent,
    LoginMenuComponent,
    FooterComponent,
    ImpressumComponent,
    DataProtectionComponent,
    SubscriptionDestroyComponent,
    dateFormatPipe,
    deliveryTypePipe,
    crisisAreaTypePipe,
    donationTypePipe
  ],
  imports: [
    FormsModule,
    MatSelectModule,
    MatInputModule,
    RouterLinkActive,
    RouterLink,
    TranslateModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSidenavModule,
    CommonModule
  ],
  exports: [
    FormsModule,
    MatSelectModule,
    MatInputModule,
    RouterLinkActive,
    RouterLink,
    TranslateModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NavMenuComponent,
    TranslationToggleComponent,
    CommonModule,
    dateFormatPipe,
    deliveryTypePipe,
    crisisAreaTypePipe,
    donationTypePipe
  ],
  providers: [SessionProvider, AddressProvider, CrisisAreaProvider, DonationProvider, DonationTypeProvider]

})
export class SharedModule {}

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

@NgModule({
  declarations: [
    TranslationToggleComponent,
    NavMenuComponent,
    LoginMenuComponent
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
    CommonModule
  ]

})
export class SharedModule {}

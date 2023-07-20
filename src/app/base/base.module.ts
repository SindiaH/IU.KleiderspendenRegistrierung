import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TranslationToggleComponent} from '../core/i18n/translation-toggle/translation-toggle.component';
import { BaseComponent } from './base/base.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [TranslationToggleComponent, BaseComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [

  ]

})
export class BaseModule {}

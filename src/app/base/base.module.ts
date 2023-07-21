import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { BaseComponent } from './base/base.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [BaseComponent],
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

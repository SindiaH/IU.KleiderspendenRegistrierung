import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterLinkActive,
    RouterLink,
    TranslateModule
  ],
  exports: [
    FormsModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterLinkActive,
    RouterLink,
    TranslateModule
  ]

})
export class SharedModule {}

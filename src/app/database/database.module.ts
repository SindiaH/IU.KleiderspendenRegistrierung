import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SessionProvider} from './providers/session.provider';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SessionProvider
  ]
})
export class DatabaseModule {
}

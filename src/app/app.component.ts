import { Component } from '@angular/core';
import {locale as enLang} from './core/i18n/vocabs/en';
import {locale as deLang} from './core/i18n/vocabs/de';
import {TranslationService} from './core/i18n/translation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translationService: TranslationService) {
    this.translationService.loadTranslations(deLang, enLang);
    this.translationService.setDefaultLanguage();
  }
}

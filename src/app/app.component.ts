import { Component } from '@angular/core';
import {locale as enLang} from './core/i18n/vocabs/en';
import {locale as cnLang} from './core/i18n/vocabs/cn';
import {locale as deLang} from './core/i18n/vocabs/de';
import {TranslationService} from './core/i18n/translation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KleiderspendenRegistrierung';
  constructor(private translationService: TranslationService) {
    this.translationService.loadTranslations(enLang, cnLang, deLang);
    this.translationService.setDefaultLanguage();
  }

}

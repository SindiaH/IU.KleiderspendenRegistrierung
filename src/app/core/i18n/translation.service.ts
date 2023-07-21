import {Injectable} from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";

const LOCALIZATION_LOCAL_STORAGE_KEY = '_language';
export interface LanguageInfo {
  lang: string;
  name: string;
  flag: string;
  isRTL: boolean;
  active?: boolean;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private langIds: any = [];
  selectedLanguage: BehaviorSubject<string> = new BehaviorSubject<string>('');
  languages: BehaviorSubject<LanguageInfo[]> = new BehaviorSubject<LanguageInfo[]>([]);

  constructor(private cookieService: CookieService,
              private translate: TranslateService) {
    this.selectedLanguage.subscribe((lang) => {
      let langs = [...this.languages.value];
      langs.forEach((l) => {
        l.active = l.lang === lang;
      });
      this.languages.next(langs);
    })
  }

  loadTranslations(...args: LanguageInfo[]): void {
    const locales = [...args];
    this.languages.next(locales);

    locales.forEach((locale) => {
      // use setTranslation() with the third argument set to true
      // to append translations instead of replacing them
      this.translate.setTranslation(locale.lang, locale.data, true);
      this.langIds.push(locale.lang);
    });

    // add new languages to the list
    this.translate.addLangs(this.langIds);
    this.translate.use(this.getSelectedLanguage());
  }

  setDefaultLanguage() {
    let lang = this.translate.getDefaultLang();
    this.setLanguage(lang);
  }

  setLanguage(lang: string) {
    if (lang) {
      this.selectedLanguage.next(lang);
      this.translate.use(this.translate.getDefaultLang());
      this.translate.use(lang);
      const domain = (window.location.hostname).split('.').slice(-2).join('.');
      this.cookieService.set(LOCALIZATION_LOCAL_STORAGE_KEY, lang,
        {domain: domain, path: '/', secure: false });
    }
  }

  /**
   * Returns selected language
   */
  getSelectedLanguage(): string {
    // return current context language, if set
    if(this.selectedLanguage.value){
      return this.selectedLanguage.value;
    }
    // return previously selected language from cookie, if set
    let lang = this.cookieService.get(LOCALIZATION_LOCAL_STORAGE_KEY);
    if(lang) {
      return lang;
    }

    // return language from browser, if possible
    let windowLang = window.navigator.language;
    if(windowLang) {
      let windowLangMatch = this.languages.value.find((l) => {
        return windowLang.includes(l.lang);
      });
      if(windowLangMatch) {
        return windowLangMatch.lang;
      }
    }

    // return default language
    if(!lang) {
      lang = this.translate.getDefaultLang();
      this.setLanguage(lang);
    }
    return lang;
  }
}

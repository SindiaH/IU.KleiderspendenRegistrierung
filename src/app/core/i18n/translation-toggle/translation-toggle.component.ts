import { Component } from '@angular/core';
import { TranslationService} from '../translation.service';
import {FormControl} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-translation-toggle',
  templateUrl: './translation-toggle.component.html',
  styleUrls: ['./translation-toggle.component.scss']
})
export class TranslationToggleComponent {
  selectedLanguage = new FormControl('');

  constructor(public translationService: TranslationService) {
    this.translationService.selectedLanguage.subscribe((language) => {
      this.selectedLanguage.setValue(language);
    })
  }

  // selectLanguage(lang: string) {
  //   this.translationService.setLanguage(lang);
  //   document.location.reload();
  // }

  setLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  selectLanguage($event: MatSelectChange) {
    const selectedLanguage = $event.value;
    this.setLanguage(selectedLanguage);
  }
}

import {Injectable} from '@angular/core';
import {DatabaseBaseProvider} from './base.provider';
import {IDatabaseCrisisAreaLocalizedService} from '../interfaces/crisisArea-localized.interface';
import {BehaviorSubject} from 'rxjs';
import {SessionProvider} from './session.provider';
import {ToastrService} from 'ngx-toastr';
import {DonationTypeLocalizedEntity} from '../entities/donationType.localized.entity';
import {CrisisAreaLocalizedEntity} from '../entities/crisisArea.localized.entity';
import {ResponseInterface} from '../interfaces/response.interface';
import {isHttpStatusOk} from '../../core/extensions/number.extension';
import {TranslationService} from '../../core/i18n/translation.service';

@Injectable()
export class DonationTypeProvider extends DatabaseBaseProvider {
  private donationTypeService: IDatabaseCrisisAreaLocalizedService | null = null;
  donationTypes = new BehaviorSubject<DonationTypeLocalizedEntity[]>([]);
  language: string = 'en';
  constructor(sessionProvider: SessionProvider,
              private readonly toasr: ToastrService,
              private translationService: TranslationService) {
    super(sessionProvider);
    this.donationTypeService = this.factory.createDatabaseDonationTypeService('supabase');
    this.translationService.selectedLanguage.subscribe((language) => {
      this.language = language;
      this.getList();
    })
  }

  getList() {
    return this.donationTypeService?.getList(this.language).then((response: ResponseInterface) => {
      console.log(response);
      if (isHttpStatusOk(response.status)) {
        this.donationTypes.next(response.data);
      }
      return null;
    });
  }
  getById(id: string) {
    return this.donationTypeService?.getById(id, this.language);
  }
}

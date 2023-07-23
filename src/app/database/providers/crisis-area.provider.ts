import {Injectable} from '@angular/core';
import {DatabaseBaseProvider} from './base.provider';
import {BehaviorSubject} from 'rxjs';
import {SessionProvider} from './session.provider';
import {ToastrService} from 'ngx-toastr';
import {IDatabaseCrisisAreaLocalizedService} from '../interfaces/crisisArea-localized.interface';
import {CrisisAreaLocalizedEntity} from '../entities/crisisArea.localized.entity';
import {isHttpStatusOk} from '../../core/extensions/number.extension';
import {TranslationService} from '../../core/i18n/translation.service';
import {SupabaseService} from '../../core/service/supabase.service';

@Injectable()
export class CrisisAreaProvider extends DatabaseBaseProvider{
  private crisisAreaService: IDatabaseCrisisAreaLocalizedService | null = null;
  crisisAreas = new BehaviorSubject<CrisisAreaLocalizedEntity[]>([]);
  language: string = 'en';

  constructor(sessionProvider: SessionProvider,
              private readonly toasr: ToastrService,
              private translationService: TranslationService,
              service: SupabaseService) {
    super(sessionProvider, service);
    this.crisisAreaService = this.factory.createDatabaseCrisisAreaLocalizedService('supabase');
    this.translationService.selectedLanguage.subscribe((language) => {
      this.language = language;
      this.getList();
    })
  }

  getList() {
    return this.crisisAreaService?.getList(this.language).then((response: any) => {
      if (isHttpStatusOk(response.status)) {
        this.crisisAreas.next(response.data);
      }
      return response.data;
    });
  }
  getById(id: string) {
    return this.crisisAreaService?.getById(id, this.language);
  }
}

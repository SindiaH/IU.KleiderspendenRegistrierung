import { Pipe, PipeTransform } from '@angular/core';
import {CrisisAreaLocalizedEntity} from '../../database/entities/crisisArea.localized.entity';

@Pipe({
  name: 'crisisArea'
})
export class crisisAreaTypePipe implements PipeTransform {
  transform(id: string, crisisAreaList: CrisisAreaLocalizedEntity[]): string {
    let crisisArea = crisisAreaList.find(x => x.id === id);
    return crisisArea ? crisisArea.name : '';
  }
}

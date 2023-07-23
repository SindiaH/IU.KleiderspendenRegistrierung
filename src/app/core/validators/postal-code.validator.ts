import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {environment} from '../../../environments/environment';

export function postalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startWith = environment.postalCode.toString().substr(0, 2);
    const valid = control.value.toString().startsWith(startWith);
    return valid ? null : { invalidPostalCode: { valid: false, value: control.value } };
  };
}

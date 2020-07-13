import { ValidatorFn, AbstractControl } from '@angular/forms';
import { COMMA_REGEXP } from '@core/utils/regexp-patterns';

export function amountRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: { [key: string]: string | number } } | null => {
    const { value } = control;

    if (value) {
        const amount = value.toString().replace(COMMA_REGEXP, '');

      if (isNaN(amount) || amount < min) {
        return { minLength: { min, actual: value } };
      }
      if (isNaN(amount) || amount > max) {
        return { maxLength: { max, actual: value } };
      }
    }
    return null;
  };
}

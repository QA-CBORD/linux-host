import { ValidatorFn, AbstractControl } from '@angular/forms';

export function amountRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: { [key: string]: string | number } } | null => {
    const { value } = control;

    if (value) {
      const regex = /[,\s]/g;
      const amount = value.replace(regex, '');

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

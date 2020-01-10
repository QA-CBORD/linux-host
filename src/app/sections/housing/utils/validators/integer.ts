import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value !== `${parseInt(control.value, 10)}`) {
      return { integer: true };
    }

    return null;
  };
}

import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value !== `${parseFloat(control.value)}`) {
      return { numeric: true };
    }

    return null;
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const EMAIL_REGEXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z]+(\.[a-z]+)*\.[a-z]{2,6}$/gi;

export function parseArrayFromString<T>(value: string): Array<T> {
  if (value && !value.length) return [];
  const result = JSON.parse(value);

  return Array.isArray(result) ? result : [];
}

export const formControlErrorDecorator = (
  fn: ValidatorFn,
  errorMsg: string
): ((control: AbstractControl) => ValidationErrors | null) => {
  return control => {
    return fn(control) === null ? null : { errorMsg };
  };
};

export const validateEmail = ({ value }: AbstractControl): ValidationErrors | null => {
  const test = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z]+(\.[a-z]+)*\.[a-z]{2,6}$/.test(value);
  return test ? null : { incorrect: true };
};

export const validateMonthRange = ({ value }: AbstractControl): ValidationErrors | null => {
  value = Number(value);

  return isNaN(value) || value <= 0 || value > 31 ? { incorrect: true } : null;
};

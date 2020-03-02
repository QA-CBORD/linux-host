import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ServerErrorsInfo } from '@core/model/server_error/server-error.model';
import { MonoTypeOperatorFunction, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ZERO_FIRST_REGEXP, INT_REGEXP, INT_DEC_REGEXP, EMAIL_REGEXP, CURRENCY_REGEXP } from './regexp-patterns';


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
  const test = EMAIL_REGEXP.test(value);
  return test ? null : { incorrect: true };
};

export const validateMonthRange = ({ value }: AbstractControl): ValidationErrors | null => {
  const isStartedWithZero = ZERO_FIRST_REGEXP.test(value);

  value = Number(value);
  return isNaN(value) || value <= 0 || value > 31 || isStartedWithZero ? { incorrect: true } : null;
};

export const validateInputAmount = ({ value }: AbstractControl): ValidationErrors | null => {
  const isStartedWithZero = ZERO_FIRST_REGEXP.test(value);
  const isIntegerOrDecemals = INT_DEC_REGEXP.test(value);

  return isNaN(value) || isStartedWithZero || !isIntegerOrDecemals ?  { incorrect: true } : null;
};

export const validateLessThanOther = (other: number): ValidatorFn => {
  return ({ value }: AbstractControl): { [key: string]: any } => (value > other ? { incorrect: true } : null);
};

export const validateGreaterOrEqualToZero = ({ value }: AbstractControl): ValidationErrors | null => {
  return value < 0 ? { incorrect: true } : null;
};

export const validateCurrency = ({ value }: AbstractControl): ValidationErrors | null => {
  const isCurrency = CURRENCY_REGEXP.test(value);
  return value && !isCurrency ? { incorrect: true } : null;
};

export const validateInteger = ({ value }: AbstractControl): ValidationErrors | null => {
  const isStartedWithZero = ZERO_FIRST_REGEXP.test(value);
  const isInteger = INT_REGEXP.test(value);

  return !isInteger || isStartedWithZero ? { incorrect: true } : null;
};

export const handleServerError = <T>(serverError: ServerErrorsInfo): MonoTypeOperatorFunction<T> => {
  return (source: Observable<T>) =>
    source.pipe(
      catchError(({ message }) => {
        message = message.split('|');
        if (message.length <= 1) throw new Error(message);
        const [code, text] = message;
        return throwError(serverError[code] ? serverError[code] : text);
      })
    );
};

export const cvvValidationFn: ValidatorFn = function({ value }) {
  if (isNaN(value)) return { error: true };
  if (!Number.isInteger(value)) return { error: true };
  if (String(value).length < 3 || String(value).length > 4) return { error: true };
  return null;
};

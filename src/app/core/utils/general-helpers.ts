import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ServerErrorsInfo } from '@core/model/server_error/server-error.model';
import { MonoTypeOperatorFunction, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  const isStartedWithZero = /^(0+)/g.test(value);

  value = Number(value);
  return isNaN(value) || value <= 0 || value > 31 || isStartedWithZero ? { incorrect: true } : null;
};

export const handleServerError = <T>(serverError: ServerErrorsInfo): MonoTypeOperatorFunction<T> => {
  return (source: Observable<T>) => source.pipe(
    catchError(({ message }) => {
      message = message.split('|');
      if (message.length <= 1) throw new Error(message);
      const [code, text] = message;
      return throwError(serverError[code] ? serverError[code] : text);
    }),
  );
};

export const cvvValidationFn: ValidatorFn = function({ value }) {
  if (isNaN(value)) return { error: true };
  if (!Number.isInteger(value)) return { error: true };
  if (String(value).length < 3 || String(value).length > 4) return { error: true };
  return null;
};

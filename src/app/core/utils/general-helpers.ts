import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ServerErrorsInfo } from '@core/model/server_error/server-error.model';
import { MonoTypeOperatorFunction, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CURRENCY_REGEXP, EMAIL_REGEXP, INT_DEC_REGEXP, INT_REGEXP, ZERO_FIRST_REGEXP } from './regexp-patterns';
import { UserInfo } from '@core/model/user';
import { UserAccount } from '@core/model/account/account.model';
import { ACCOUNT_TYPES, PAYMENT_SYSTEM_TYPE } from '@sections/accounts/accounts.config';
import { MerchantInfo } from '@sections/ordering';
import { ReportCardStatus } from '@sections/settings/models/report-card-status.config';
import { formatDate, isSameDay } from './date-helper';
import { GeneralPhoto } from '@core/model/general-photo/general-photo.model';

export function parseArrayFromString<T>(value: string): Array<T> {
  if (!value) return [];
  try {
    const result = JSON.parse(value);
    return Array.isArray(result) ? result : [];
  } catch (error) {
    return [];
  }
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
  if (!value) return null;
  const isStartedWithZero = ZERO_FIRST_REGEXP.test(value);
  const isIntegerOrDecemals = INT_DEC_REGEXP.test(value);

  return isNaN(value) || isStartedWithZero || !isIntegerOrDecemals ? { incorrect: true } : null;
};

export const validateLessThanOther = (other: number): ValidatorFn => {
  return ({ value }: AbstractControl) => (value > other ? { incorrect: true } : null);
};

export const validateGreaterOrEqualToZero = ({ value }: AbstractControl): ValidationErrors | null => {
  return value < 0 ? { incorrect: true } : null;
};

export const validateCurrency = ({ value }: AbstractControl): ValidationErrors | null => {
  if (!value) return null;
  const isCurrency = CURRENCY_REGEXP.test(value);

  return !isCurrency ? { incorrect: true } : null;
};

export const validateInteger = ({ value }: AbstractControl): ValidationErrors | null => {
  if (!value) return null;
  const isStartedWithZero = ZERO_FIRST_REGEXP.test(value);
  const isInteger = INT_REGEXP.test(value);

  return !isInteger || isStartedWithZero ? { incorrect: true } : null;
};

export const handleServerError = <T>(
  serverError: ServerErrorsInfo,
  ignoreCodes?: string[]
): MonoTypeOperatorFunction<T> => {
  return (source: Observable<T>) =>
    source.pipe(
      catchError(({ message = '' }) => {
        message = message.split('|');
        if (message.length <= 1) return throwError(message[0]);
        const [code, text] = message;

        if (ignoreCodes && ignoreCodes.includes(code)) {
          return of({} as T);
        }

        // Temprorary solution for these codes:
        if ([9002, 9005, 9006].includes(+code)) {
          return throwError(() => message);
        }

        if (+code === 9016) {
          return throwError(() => `${code}|${text}`);
        }

        if ([9010, 9017].includes(+code)) {
          message[1] = serverError[code] ? serverError[code] : text;
          return throwError(() => message);
        }

        if ([6001].includes(+code)) {
          return throwError(() => text);
        }

        return throwError(() => (serverError[code] ? serverError[code] : text));
      })
    );
};

export const cvvValidationFn: ValidatorFn = function ({ value }) {
  if (isNaN(value)) return { error: true };
  if (!Number.isInteger(Number(value))) return { error: true };

  // Length 3 VISA/MC ; Length 4 Amex;
  if (String(value).length < 3 || String(value).length > 4) return { error: true };
  return null;
};

export const getUserFullName = ({ firstName: fn, lastName: ln, middleName: mn }: UserInfo): string => {
  return fn || ln || mn ? `${fn || ''} ${mn || ''} ${ln || ''}` : 'Unknown Name';
};

export const validateAllFormFields = (formGroup: FormGroup) => {
  Object.keys(formGroup.controls).forEach(field => {
    const control: AbstractControl = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    }
  });
};

export const isFormInvalid = (formGroup: FormGroup): boolean => {
  return Object.keys(formGroup.controls).some(field => {
    const control: AbstractControl = formGroup.get(field);

    if (control instanceof FormControl) {
      if (control.validator) {
        const validators = control.validator({} as AbstractControl);
        if (validators && (validators.errorMsg || validators.required)) {
          // Check if the control has a required validator
          if (control.value === '' || control.value === null) {
            control.markAsTouched({ onlySelf: true });
            return true;
          }
        }
      }
    }

    return false;
  });
};

export const isCreditCardAccount = ({ paymentSystemType }: UserAccount): boolean => {
  return paymentSystemType === PAYMENT_SYSTEM_TYPE.MONETRA || paymentSystemType === PAYMENT_SYSTEM_TYPE.USAEPAY;
};

export const isCashlessAccount = ({ paymentSystemType }: UserAccount): boolean => {
  return paymentSystemType === PAYMENT_SYSTEM_TYPE.OPCS || paymentSystemType === PAYMENT_SYSTEM_TYPE.CSGOLD;
};

export const isMealsAccount = ({ accountType }: UserAccount): boolean => {
  return accountType === ACCOUNT_TYPES.meals;
};

export const isAppleAccount = ({ accountType }: UserAccount): boolean => {
  return accountType === ACCOUNT_TYPES.applePay;
};

export function exploreMerchantSorting(sourceArray: MerchantInfo[]): MerchantInfo[] {
  return sourceArray.sort(
    (
      { isFavorite: fav1, distanceFromUser: dist1, openNow: open1, name: name1 },
      { isFavorite: fav2, distanceFromUser: dist2, openNow: open2, name: name2 }
    ) => {
      const compareFav = compareFieldsSkipEmptyToEnd<boolean>(fav2, fav1);
      if (compareFav !== 0) return compareFav;
      const compareOpenStatus = compareFieldsSkipEmptyToEnd<boolean>(open2, open1);
      if (compareOpenStatus !== 0) return compareOpenStatus;
      const compareDistance = compareFieldsSkipEmptyToEnd<number>(dist1, dist2);
      if (compareDistance !== 0) return compareDistance;
      if (typeof name1 !== 'string') name1 = '';
      if (typeof name2 !== 'string') name1 = '';
      return name2.localeCompare(name1);
    }
  );
}

export function compareFieldsSkipEmptyToEnd<T>(a: T = null, b: T = null): number {
  if (a === null) return 1;
  if (b === null) return -1;
  return Number(a) - Number(b);
}

export function sortAlphabetically(a, b) {
  if (a === null) {
    return -1;
  }
  if (b === null) {
    return 1;
  }
  if (a.toLowerCase() < b.toLowerCase()) {
    return -1;
  }
  if (a.toLowerCase() > b.toLowerCase()) {
    return 1;
  }
  return 0;
}

export function configureBiometricsConfig(supportedBiometricType: string[]): {
  type: string;
  name: string;
  icon: string;
} {
  if (supportedBiometricType.includes('fingerprint')) {
    return { type: 'fingerprint', name: 'Fingerprint', icon: 'fingerprint' };
  } else if (supportedBiometricType.includes('face')) {
    return { type: 'face', name: 'Face ID', icon: 'faceid' };
  } else if (supportedBiometricType.includes('iris')) {
    return { type: 'iris', name: 'Iris', icon: 'iris' };
  }
}

export function getCashlessStatus(isLost: boolean): number {
  return isLost ? ReportCardStatus.LOST : ReportCardStatus.FOUND;
}

export function mergeMatchArrayById<T>(sourceArray: { id: string }[], matchIds: string[] | number[]): T[] {
  const result = [];
  const sourceDict: { [key: string]: object } = {};

  for (const sourceItem of sourceArray) {
    sourceDict[`${sourceItem.id}`] = sourceItem;
  }
  for (const matchItem of matchIds) {
    if (sourceDict[matchItem]) result.push(sourceDict[matchItem]);
  }

  return result;
}

export function hasRequiredField(abstractControl: AbstractControl): boolean {
  if (abstractControl.validator) {
    const validator = abstractControl.validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }
  if (abstractControl['controls']) {
    for (const controlName in abstractControl['controls']) {
      if (abstractControl['controls'][controlName]) {
        if (hasRequiredField(abstractControl['controls'][controlName])) {
          return true;
        }
      }
    }
  }
  return false;
}

export function checkIsYesterday(currentDate: Date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return currentDate.toDateString() === yesterday.toDateString();
}

export const validatePasswordDecorator = (
  fn: ValidatorFn,
  error: ValidationErrors
): ((control: AbstractControl) => ValidationErrors | null) => {
  return control => {
    return fn(control) === null ? null : error;
  };
};

export const isEmptyObject = (obj): boolean => {
  return obj && Object.keys(obj).length === 0;
};

export const isAppearing = (date: string, i: number, transactions: object[], propertyName: string): boolean => {
  return i === 0 || !isSameDay(formatDate(date), formatDate(transactions[i - 1][propertyName]));
};

export function getDataUrlFromPhoto(photoInfo: GeneralPhoto): string | null {
  if (photoInfo && photoInfo.data && photoInfo.mimeType) {
    return `data:${photoInfo.mimeType};base64,${photoInfo.data}`;
  }
  return null;
}

export function fromEntries<T = string>(entries: [string, T][]): { [name: string]: T } {
  return entries.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as { [name: string]: T });
}

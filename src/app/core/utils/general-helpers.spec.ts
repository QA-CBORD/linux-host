import { TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import {
  checkIsYesterday,
  compareFieldsSkipEmptyToEnd,
  configureBiometricsConfig,
  cvvValidationFn,
  exploreMerchantSorting,
  formControlErrorDecorator,
  fromEntries,
  getCashlessStatus,
  getDataUrlFromPhoto,
  getUserFullName,
  handleServerError,
  hasRequiredField,
  isAppearing,
  isAppleAccount,
  isCashlessAccount,
  isCreditCardAccount,
  isEmptyObject,
  isFormInvalid,
  isMealsAccount,
  mergeMatchArrayById,
  parseArrayFromString,
  sortAlphabetically,
  validateAllFormFields,
  validateCurrency,
  validateEmail,
  validateGreaterOrEqualToZero,
  validateInputAmount,
  validateInteger,
  validateLessThanOther,
  validateMonthRange,
  validatePasswordDecorator,
} from './general-helpers';
import { throwError } from 'rxjs';
import { ServerErrorsInfo } from '@core/model/server_error/server-error.model';
import { UserInfo } from '@core/model/user';
import { UserAccount } from '@core/model/account/account.model';
import { PAYMENT_SYSTEM_TYPE, ACCOUNT_TYPES } from '@sections/accounts/accounts.config';
import { MerchantInfo } from '@sections/ordering';
import { ReportCardStatus } from '@sections/settings/models/report-card-status.config';
import { GeneralPhoto } from '@core/model/general-photo/general-photo.model';

describe('General Helpers', () => {
  let validatorFnMock;
  let controlMock;
  let validatorFn;
  const serverErrorMock: ServerErrorsInfo = {
    9002: 'Error 9002',
    9005: 'Error 9005',
    9016: 'Custom Error 9016',
    9017: 'Error 9017',
    9006: 'Error 9006',
    9010: 'Error 9010',
    6001: 'Error 6001',
  };
  const mockValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.value as string;
    if (password.length < 8) {
      return { minLength: true };
    }
    return null;
  };

  const transactions = [
    { date: '2024-03-10', propertyName: 'someProperty' },
    { date: '2024-03-11', propertyName: 'someProperty' },
  ];

  beforeEach(() => {
    validatorFnMock = jest.fn();
    validatorFn = validateLessThanOther(10);

    // Mock the AbstractControl
    controlMock = {
      value: null,
      valid: true,
      errors: null,
      pristine: true,
      dirty: false,
      touched: false,
      untouched: true,
      setValue: jest.fn(),
      patchValue: jest.fn(),
      reset: jest.fn(),
      enable: jest.fn(),
      disable: jest.fn(),
      markAsTouched: jest.fn(),
      markAsUntouched: jest.fn(),
      markAsDirty: jest.fn(),
      markAsPristine: jest.fn(),
      setValidators: jest.fn(),
      clearValidators: jest.fn(),
      updateValueAndValidity: jest.fn(),
      statusChanges: null,
      valueChanges: null,
    };
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    });
  });

  it('should return true if any FormControl in the FormGroup is empty', () => {
    const formGroup: FormGroup = new FormGroup({
      field1: new FormControl('Some Value'),
      field2: new FormControl('', Validators.required),
      field3: new FormControl('Another Value'),
    });
    const result = isFormInvalid(formGroup);
    expect(result).toBe(true);
  });

  it('should return false if all FormControls in the FormGroup are filled', () => {
    const formGroup: FormGroup = new FormGroup({
      field1: new FormControl('Some Value', Validators.required),
      field2: new FormControl('Another Value', Validators.required),
    });
    const result = isFormInvalid(formGroup);
    expect(result).toBe(false);
  });
  it('should return array parsed from string oon parseArrayFromString', () => {
    const result = parseArrayFromString('[1,2,3]');
    expect(result).toEqual([1, 2, 3]);
  });
  it('should return empty array on falsy value', () => {
    let result = parseArrayFromString('');
    expect(result).toEqual([]);

    result = parseArrayFromString(undefined);
    expect(result).toEqual([]);
  });

  it('should return empty array on invalid JSON', () => {
    let result = parseArrayFromString(',');
    expect(result).toEqual([]);
  });

  it('should return null if validation function returns null', () => {
    validatorFnMock.mockReturnValue(null);

    const decoratedValidator = formControlErrorDecorator(validatorFnMock, 'Error message');
    const result = decoratedValidator(controlMock);

    expect(result).toBeNull();
  });

  it('should return ValidationErrors object if validation function returns errors', () => {
    const validationErrors: ValidationErrors = { customError: true };
    validatorFnMock.mockReturnValue(validationErrors);

    const decoratedValidator = formControlErrorDecorator(validatorFnMock, 'Error message');
    const result = decoratedValidator(controlMock);

    expect(result).toEqual({ errorMsg: 'Error message' });
  });
  it('should return null for a valid email address', () => {
    const validEmailControl = { value: 'example@example.com' } as AbstractControl;
    const result = validateEmail(validEmailControl);
    expect(result).toBeNull();
  });

  it('should return an error object for an invalid email address', () => {
    const invalidEmailControl = { value: 'invalid-email' } as AbstractControl;
    const result = validateEmail(invalidEmailControl);
    expect(result).toEqual({ incorrect: true });
  });

  it('should return an error object for an empty email address', () => {
    const emptyEmailControl = { value: '' } as AbstractControl;
    const result = validateEmail(emptyEmailControl);
    expect(result).toEqual({ incorrect: true });
  });

  it('should return an error object for a null email address', () => {
    const nullEmailControl = { value: null } as AbstractControl;
    const result = validateEmail(nullEmailControl);
    expect(result).toEqual({ incorrect: true });
  });
  it('should return null for a valid month value', () => {
    const validMonthControl = { value: '15' } as AbstractControl;
    const result = validateMonthRange(validMonthControl);
    expect(result).toBeNull();
  });

  it('should return an error object for a month value less than or equal to 0', () => {
    const invalidMonthControl = { value: '0' } as AbstractControl;
    const result = validateMonthRange(invalidMonthControl);
    expect(result).toEqual({ incorrect: true });
  });
  it('should return an error object for a non-numeric month value', () => {
    const invalidMonthControl = { value: 'abc' } as AbstractControl;
    const result = validateMonthRange(invalidMonthControl);
    expect(result).toEqual({ incorrect: true });
  });

  it('should return an error object for a month value starting with zero', () => {
    const invalidMonthControl = { value: '07' } as AbstractControl;
    const result = validateMonthRange(invalidMonthControl);
    expect(result).toEqual({ incorrect: true });
  });
  it('should return an error object for a month value greater than 31', () => {
    const invalidMonthControl = { value: '32' } as AbstractControl;
    const result = validateMonthRange(invalidMonthControl);
    expect(result).toEqual({ incorrect: true });
  });
  it('should return null for an empty input', () => {
    const emptyControl = { value: '' } as AbstractControl;
    const result = validateInputAmount(emptyControl);
    expect(result).toBeNull();
  });

  it('should return null for a valid integer input', () => {
    const validIntegerControl = { value: '123' } as AbstractControl;
    const result = validateInputAmount(validIntegerControl);
    expect(result).toBeNull();
  });

  it('should return null for a valid decimal input', () => {
    const validDecimalControl = { value: '123.45' } as AbstractControl;
    const result = validateInputAmount(validDecimalControl);
    expect(result).toBeNull();
  });

  it('should return an error object for a non-numeric input', () => {
    const nonNumericControl = { value: 'abc' } as AbstractControl;
    const result = validateInputAmount(nonNumericControl);
    expect(result).toEqual({ incorrect: true });
  });

  it('should return an error object for an input starting with zero', () => {
    const zeroStartControl = { value: '007' } as AbstractControl;
    const result = validateInputAmount(zeroStartControl);
    expect(result).toEqual({ incorrect: true });
  });

  it('should return an error object for an invalid input with characters other than digits and a dot', () => {
    const invalidCharacterControl = { value: '12x3.45' } as AbstractControl;
    const result = validateInputAmount(invalidCharacterControl);
    expect(result).toEqual({ incorrect: true });
  });
  it('should return null for a value less than the specified number', () => {
    const control = new FormControl(5);
    const result = validatorFn(control);
    expect(result).toBeNull();
  });

  it('should return null for a value equal to the specified number', () => {
    const control = new FormControl(10);
    const result = validatorFn(control);
    expect(result).toBeNull();
  });

  it('should return an error object for a value greater than the specified number', () => {
    const control = new FormControl(15);
    const result = validatorFn(control);
    expect(result).toEqual({ incorrect: true });
  });

  it('should return null for a control with no value', () => {
    const control = new FormControl();
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('should return null for a value greater than or equal to zero', () => {
    const control: AbstractControl = { value: 10 } as AbstractControl;
    const result: ValidationErrors | null = validateGreaterOrEqualToZero(control);
    expect(result).toBeNull();
  });

  it('should return an error object for a negative value', () => {
    const control: AbstractControl = { value: -5 } as AbstractControl;
    const result: ValidationErrors | null = validateGreaterOrEqualToZero(control);
    expect(result).toEqual({ incorrect: true });
  });

  it('should return null for a value of zero', () => {
    const control: AbstractControl = { value: 0 } as AbstractControl;
    const result: ValidationErrors | null = validateGreaterOrEqualToZero(control);
    expect(result).toBeNull();
  });
  it('should return null for an empty input', () => {
    const emptyControl = { value: '' } as AbstractControl;
    const result = validateCurrency(emptyControl);
    expect(result).toBeNull();
  });

  it('should return null for a valid currency format', () => {
    const validCurrencyControl = { value: '10.25' } as AbstractControl;
    const result = validateCurrency(validCurrencyControl);
    expect(result).toBeNull();
  });

  it('should return an error object for an invalid currency format', () => {
    const invalidCurrencyControl = { value: 'invalid' } as AbstractControl;
    const result = validateCurrency(invalidCurrencyControl);
    expect(result).toEqual({ incorrect: true });
  });

  it('should return an error object for a currency format with more than two decimal places', () => {
    const invalidDecimalControl = { value: '10.555' } as AbstractControl;
    const result = validateCurrency(invalidDecimalControl);
    expect(result).toEqual({ incorrect: true });
  });
  it('should return null for an empty input', () => {
    const emptyControl = { value: '' } as AbstractControl;
    const result = validateInteger(emptyControl);
    expect(result).toBeNull();
  });

  it('should return null for a valid integer', () => {
    const validIntegerControl = { value: '123' } as AbstractControl;
    const result = validateInteger(validIntegerControl);
    expect(result).toBeNull();
  });

  it('should return an error object for a non-integer input', () => {
    const nonIntegerControl = { value: 'abc' } as AbstractControl;
    const result = validateInteger(nonIntegerControl);
    expect(result).toEqual({ incorrect: true });
  });

  it('should return an error object for an integer starting with zero', () => {
    const zeroStartControl = { value: '007' } as AbstractControl;
    const result = validateInteger(zeroStartControl);
    expect(result).toEqual({ incorrect: true });
  });

  it('should return null for a valid integer starting with non-zero', () => {
    const nonZeroStartControl = { value: '123' } as AbstractControl;
    const result = validateInteger(nonZeroStartControl);
    expect(result).toBeNull();
  });
  it('should throw an error for a server error without ignored codes', () => {
    const source$ = throwError({ message: '500|Internal Server Error' });

    source$.pipe(handleServerError(serverErrorMock)).subscribe({
      error: error => {
        expect(error).toEqual('Internal Server Error');
      },
    });
  });

  it('should not throw an error for an ignored error code', () => {
    const source$ = throwError({ message: '9002|Error 9002' });

    source$.pipe(handleServerError(serverErrorMock, ['9002'])).subscribe();
  });

  it('should throw an error for a specific error code with custom handling', () => {
    const source$ = throwError({ message: '9016|Custom Error 9016' });

    source$.pipe(handleServerError(serverErrorMock)).subscribe({
      error: error => {
        expect(error).toEqual(['9016', 'Custom Error 9016']);
      },
    });
  });
  it('should return an error object if the value is not a number', () => {
    const control = { value: 'abc' } as AbstractControl;
    const result = cvvValidationFn(control);
    expect(result).toEqual({ error: true });
  });

  it('should return an error object if the value is not an integer', () => {
    const control = { value: '12.3' } as AbstractControl;
    const result = cvvValidationFn(control);
    expect(result).toEqual({ error: true });
  });

  it('should return an error object if the value has a length less than 3', () => {
    const control = { value: '12' } as AbstractControl;
    const result = cvvValidationFn(control);
    expect(result).toEqual({ error: true });
  });

  it('should return an error object if the value has a length greater than 4', () => {
    const control = { value: '12345' } as AbstractControl;
    const result = cvvValidationFn(control);
    expect(result).toEqual({ error: true });
  });

  it('should return null for a valid CVV with length 3', () => {
    const control = { value: '123' } as AbstractControl;
    const result = cvvValidationFn(control);
    expect(result).toBeNull();
  });

  it('should return null for a valid CVV with length 4', () => {
    const control = { value: '1234' } as AbstractControl;
    const result = cvvValidationFn(control);
    expect(result).toBeNull();
  });
  it('should return the full name when all parts are provided', () => {
    const userInfo = { firstName: 'John', lastName: 'Doe', middleName: 'Smith' } as UserInfo;
    const result = getUserFullName(userInfo);
    expect(result).toEqual('John Smith Doe');
  });

  it('should return the first name when only the first name is provided', () => {
    const userInfo = { firstName: 'John' } as UserInfo;
    const result = getUserFullName(userInfo);
    expect(result.trim()).toEqual('John');
  });

  it('should return the last name when only the last name is provided', () => {
    const userInfo = { lastName: 'Doe' } as UserInfo;
    const result = getUserFullName(userInfo);
    expect(result.trim()).toEqual('Doe');
  });

  it('should return the middle name when only the middle name is provided', () => {
    const userInfo = { middleName: 'Smith' } as UserInfo;
    const result = getUserFullName(userInfo);
    expect(result.trim()).toEqual('Smith');
  });

  it('should return "Unknown Name" when no name parts are provided', () => {
    const userInfo = {} as UserInfo;
    const result = getUserFullName(userInfo);
    expect(result).toEqual('Unknown Name');
  });
  it('should mark all form controls as touched in a form group', () => {
    // Create a FormGroup with some form controls
    const formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      age: new FormControl('', Validators.min(18)),
    });

    // Mark all form controls as untouched initially
    expect(formGroup.get('name').touched).toBeFalsy();
    expect(formGroup.get('email').touched).toBeFalsy();
    expect(formGroup.get('age').touched).toBeFalsy();

    // Call the validateAllFormFields function
    validateAllFormFields(formGroup);

    // Expect all form controls to be marked as touched after calling the function
    expect(formGroup.get('name').touched).toBeTruthy();
    expect(formGroup.get('email').touched).toBeTruthy();
    expect(formGroup.get('age').touched).toBeTruthy();
  });
  describe('isCreditCardAccount', () => {
    it('should return true for Monetra payment system type', () => {
      const userAccount: UserAccount = { paymentSystemType: PAYMENT_SYSTEM_TYPE.MONETRA } as UserAccount;
      expect(isCreditCardAccount(userAccount)).toBeTruthy();
    });

    it('should return true for USAEPAY payment system type', () => {
      const userAccount: UserAccount = { paymentSystemType: PAYMENT_SYSTEM_TYPE.USAEPAY } as UserAccount;
      expect(isCreditCardAccount(userAccount)).toBeTruthy();
    });

    it('should return false for other payment system types', () => {
      const userAccount: UserAccount = { paymentSystemType: PAYMENT_SYSTEM_TYPE.OPCS } as UserAccount;
      expect(isCreditCardAccount(userAccount)).toBeFalsy();
    });
  });

  describe('isCashlessAccount', () => {
    it('should return true for OPCS payment system type', () => {
      const userAccount: UserAccount = { paymentSystemType: PAYMENT_SYSTEM_TYPE.OPCS } as UserAccount;
      expect(isCashlessAccount(userAccount)).toBeTruthy();
    });

    it('should return true for CSGOLD payment system type', () => {
      const userAccount: UserAccount = { paymentSystemType: PAYMENT_SYSTEM_TYPE.CSGOLD } as UserAccount;
      expect(isCashlessAccount(userAccount)).toBeTruthy();
    });

    it('should return false for other payment system types', () => {
      const userAccount: UserAccount = { paymentSystemType: PAYMENT_SYSTEM_TYPE.MONETRA } as UserAccount;
      expect(isCashlessAccount(userAccount)).toBeFalsy();
    });
  });

  describe('isMealsAccount', () => {
    it('should return true for meals account type', () => {
      const userAccount: UserAccount = { accountType: ACCOUNT_TYPES.meals } as UserAccount;
      expect(isMealsAccount(userAccount)).toBeTruthy();
    });

    it('should return false for other account types', () => {
      const userAccount: UserAccount = { accountType: ACCOUNT_TYPES.applePay } as UserAccount;
      expect(isMealsAccount(userAccount)).toBeFalsy();
    });
  });

  describe('isAppleAccount', () => {
    it('should return true for Apple Pay account type', () => {
      const userAccount: UserAccount = { accountType: ACCOUNT_TYPES.applePay } as UserAccount;
      expect(isAppleAccount(userAccount)).toBeTruthy();
    });

    it('should return false for other account types', () => {
      const userAccount: UserAccount = { accountType: ACCOUNT_TYPES.charge } as UserAccount;
      expect(isAppleAccount(userAccount)).toBeFalsy();
    });
  });
  it('should sort merchant array by favorite status, open status, distance, and name', () => {
    const merchantArray = [
      { isFavorite: true, openNow: true, distanceFromUser: 2, name: 'Merchant C' },
      { isFavorite: false, openNow: false, distanceFromUser: 1, name: 'Merchant A' },
      { isFavorite: true, openNow: false, distanceFromUser: 3, name: 'Merchant B' },
    ] as MerchantInfo[];

    const sortedArray = exploreMerchantSorting(merchantArray);

    expect(sortedArray[0].name).toBe('Merchant C');
    expect(sortedArray[1].name).toBe('Merchant B');
    expect(sortedArray[2].name).toBe('Merchant A');
  });

  it('should handle distance comparison correctly', () => {
    const distanceComparison = compareFieldsSkipEmptyToEnd<number>(2, 1);
    expect(distanceComparison).toBe(1); // Expecting 2 to come after 1
  });

  it('should handle null values in compareFieldsSkipEmptyToEnd correctly', () => {
    const nullComparison1 = compareFieldsSkipEmptyToEnd<number>(null, 5);
    expect(nullComparison1).toBe(1); // Expecting null to come after 5

    const nullComparison2 = compareFieldsSkipEmptyToEnd<string>('Test', null);
    expect(nullComparison2).toBe(-1); // Expecting 'Test' to come before null
  });
  it('should return fingerprint config when fingerprint is supported', () => {
    const supportedBiometricType = ['fingerprint', 'face', 'iris'];
    const config = configureBiometricsConfig(supportedBiometricType);
    expect(config).toEqual({ type: 'fingerprint', name: 'Fingerprint', icon: 'fingerprint' });
  });

  it('should return face ID config when fingerprint is not supported but face ID is supported', () => {
    const supportedBiometricType = ['face', 'iris'];
    const config = configureBiometricsConfig(supportedBiometricType);
    expect(config).toEqual({ type: 'face', name: 'Face ID', icon: 'faceid' });
  });

  it('should return iris config when neither fingerprint nor face ID is supported but iris is supported', () => {
    const supportedBiometricType = ['iris'];
    const config = configureBiometricsConfig(supportedBiometricType);
    expect(config).toEqual({ type: 'iris', name: 'Iris', icon: 'iris' });
  });

  it('should return undefined when none of the biometric types are supported', () => {
    const supportedBiometricType = [];
    const config = configureBiometricsConfig(supportedBiometricType);
    expect(config).toBeUndefined();
  });
  it('should sort alphabetically ignoring case sensitivity', () => {
    expect(sortAlphabetically('apple', 'Banana')).toBe(-1);
    expect(sortAlphabetically('Banana', 'apple')).toBe(1);
    expect(sortAlphabetically('apple', 'apple')).toBe(0);
  });

  it('should return FOUND status if the card is not lost', () => {
    expect(getCashlessStatus(false)).toBe(ReportCardStatus.FOUND);
  });

  it('should return LOST status if the card is lost', () => {
    expect(getCashlessStatus(true)).toBe(ReportCardStatus.LOST);
  });
  it('should merge match array correctly with source array', () => {
    const sourceArray = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ];
    const matchIds = ['1', '3'];

    const result = mergeMatchArrayById<{ id: string; name: string }>(sourceArray, matchIds);
    expect(result).toEqual([
      { id: '1', name: 'Item 1' },
      { id: '3', name: 'Item 3' },
    ]);
  });

  it('should handle empty match array correctly', () => {
    const sourceArray = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ];
    const matchIds: string[] = [];

    const result = mergeMatchArrayById<{ id: string; name: string }>(sourceArray, matchIds);
    expect(result).toEqual([]);
  });

  it('should handle missing source items correctly', () => {
    const sourceArray = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ];
    const matchIds = ['1', '4'];

    const result = mergeMatchArrayById<{ id: string; name: string }>(sourceArray, matchIds);
    expect(result).toEqual([{ id: '1', name: 'Item 1' }]);
  });

  it('should return true when a single control has a required field', () => {
    const control = new FormControl('', Validators.required);
    expect(hasRequiredField(control)).toBeTruthy();
  });

  it('should return true when a nested control has a required field', () => {
    const nestedControl = new FormControl('', Validators.required);
    const formGroup = new FormGroup({
      nestedControl: nestedControl,
    });
    expect(hasRequiredField(formGroup)).toBeTruthy();
  });

  it('should return true when multiple controls have required fields', () => {
    const control1 = new FormControl('', Validators.required);
    const control2 = new FormControl('', Validators.required);
    const formGroup = new FormGroup({
      control1: control1,
      control2: control2,
    });
    expect(hasRequiredField(formGroup)).toBeTruthy();
  });

  it('should return false when no required fields are present', () => {
    const control = new FormControl('');
    expect(hasRequiredField(control)).toBeFalsy();
  });

  it('should return false when no controls are present', () => {
    const formGroup = new FormGroup({});
    expect(hasRequiredField(formGroup)).toBeFalsy();
  });
  it('should return true if currentDate is yesterday', () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    expect(checkIsYesterday(currentDate)).toBe(true);
  });

  it('should return false if currentDate is today', () => {
    const currentDate = new Date();
    expect(checkIsYesterday(currentDate)).toBe(false);
  });

  it('should return false if currentDate is tomorrow', () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    expect(checkIsYesterday(currentDate)).toBe(false);
  });
  it('should return null if validation passes', () => {
    const error: ValidationErrors = { customError: 'Password is too short' };
    const decoratedValidator = validatePasswordDecorator(mockValidatorFn, error);
    const control = new FormControl('strongPassword123');
    expect(decoratedValidator(control)).toBeNull();
  });

  it('should return specified error if validation fails', () => {
    const error: ValidationErrors = { customError: 'Password is too short' };
    const decoratedValidator = validatePasswordDecorator(mockValidatorFn, error);
    const control = new FormControl('weak');
    expect(decoratedValidator(control)).toEqual(error);
  });

  it('should return true for an empty object', () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it('should return false for a non-empty object', () => {
    expect(isEmptyObject({ key: 'value' })).toBe(false);
  });

  it('should return true for the first item in the list', () => {
    expect(isAppearing('2024-03-10', 0, transactions, 'propertyName')).toBe(true);
  });

  it('should return true if the current date is different from the previous one', () => {
    expect(isAppearing('2024-03-11', 1, transactions, 'propertyName')).toBe(true);
  });

  it('should return false if the current date is the same as the previous one', () => {
    expect(isAppearing('2024-03-11', 0, transactions, 'propertyName')).toBe(true);
  });

  it('should return data URL from photo info', () => {
    const photoInfo = { mimeType: 'image/jpeg', data: 'base64encodeddata' };
    expect(getDataUrlFromPhoto(photoInfo)).toBe('data:image/jpeg;base64,base64encodeddata');
  });

  it('should return null if photo info is null', () => {
    expect(getDataUrlFromPhoto(null)).toBeNull();
  });

  describe('getDataUrlFromPhoto', () => {
    it('should return data URL when photoInfo is valid', () => {
      const photoInfo: GeneralPhoto = {
        data: 'testData',
        mimeType: 'image/jpeg',
      };

      const result = getDataUrlFromPhoto(photoInfo);

      expect(result).toBe('data:image/jpeg;base64,testData');
    });

    it('should return null when photoInfo is null', () => {
      const result = getDataUrlFromPhoto(null);

      expect(result).toBeNull();
    });

    it('should return null when photoInfo does not have data or mimeType', () => {
      const photoInfo = {} as GeneralPhoto;

      const result = getDataUrlFromPhoto(photoInfo);

      expect(result).toBeNull();
    });
  });

  describe('fromEntries', () => {
    it('should convert an array of entries to an object', () => {
      const entries: [string, string][] = [
        ['key1', 'value1'],
        ['key2', 'value2'],
        ['key3', 'value3'],
      ];

      const result = fromEntries(entries);

      expect(result).toEqual({
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      });
    });

    it('should return an empty object for an empty array', () => {
      const entries: [string, string][] = [];

      const result = fromEntries(entries);

      expect(result).toEqual({});
    });

    it('should handle different types of values', () => {
      const entries: [string, any][] = [
        ['key1', 'value1'],
        ['key2', 42],
        ['key3', true],
        ['key4', { nested: 'object' }],
      ];

      const result = fromEntries(entries);

      expect(result).toEqual({
        key1: 'value1',
        key2: 42,
        key3: true,
        key4: { nested: 'object' },
      });
    });

    it('should use the last value for duplicate keys', () => {
      const entries: [string, string][] = [
        ['key1', 'value1'],
        ['key1', 'value2'],
      ];

      const result = fromEntries(entries);

      expect(result).toEqual({
        key1: 'value2',
      });
    });
  });
});

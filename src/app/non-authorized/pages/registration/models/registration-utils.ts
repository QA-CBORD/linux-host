import { AbstractControl } from '@angular/forms';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { Observable } from 'rxjs';
import { InputValidator } from 'src/app/password-validation/models/input-validator.model';
import { CustomValidator } from './password-validation';

export enum LookupFieldType {
  UNDEFINED = -1,
  MEDIA_VALUE = 1,
  DATE = 2,
  STRING_EXACT = 3,
  STRING_IGNORECASE = 4,
  STRING_FUZZY = 5,
  MMID_USID = 6,
}

export class LookupFieldInfo {
  lookupFieldId: string;
  displayName: string;
  displayOrder: number;
  type: LookupFieldType;
  value: string;
}

export enum RegistrationApiMethods {
  retrieveRegistrationFields = 'retrieveRegistrationFields',
  register = 'register',
}

export interface UserRegistrationManager {
  register(formData): Observable<any>;
  getData(): Promise<{ fieldList: FormFieldList; formData: RegistrationFormData }>;
}

export interface FormFieldList {
  horizontalAlignedFields: Field[];
  verticalAlignedFields: Field[];
  controls: { [key: string]: any };
}

// names of content strings for registration form
export enum RegFormStringKeys {
  title = 'screen_title',
  submitButton = 'submit_btn_text',
  phone = 'phone',
  firstName = 'first_name',
  lastName = 'last_name',
  userName = 'user_name',
  password = 'password',
  passwordConfirm = 'confirm_password',
}

// names of content strings for preLogin page
export enum PreLoginStringKeys {
  continueAsGuest = 'continue_as_guest',
  continueAsNonGuest = 'continue_as_nonguest',
}

export interface RegistrationFormData {
  screen_title: string;
  submit_btn_text: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  user_name?: string;
  password?: string;
  confirm_password?: string;
  success_dismiss_btn?: string;
  success_resend_email?: string;
  success_screen_title?: string;
  success_screen_message?: string;
  passwordValidators: InputValidator[];
}

const defaultRegistrationFormData: RegistrationFormData = {
  screen_title: 'Create an account',
  submit_btn_text: 'Create Account',
  phone: 'Phone',
  first_name: 'First Name',
  last_name: 'Last Name',
  user_name: 'Email',
  password: 'Password',
  success_dismiss_btn: 'Dismiss',
  success_screen_title: 'Verify Email',
  success_resend_email: 'Resend Email',
  success_screen_message: 'We have sent you a verification email. Tap the link inside that to verify your email and login',
  passwordValidators: [],
};

export const buildRegistrationFormData = (contentStrings?: ContentStringInfo[]): RegistrationFormData => {
  if (contentStrings && contentStrings.length) {
    const registrationFormData: any = {};
    contentStrings.forEach(({ name, value }) => (registrationFormData[name] = value));
    return {...defaultRegistrationFormData, ...registrationFormData};
  }
  return defaultRegistrationFormData;
};

export const buildPreloginScreenData = (acuteCare: boolean, contentStrings?: ContentStringInfo[]): PreLoginStringModel => {
  const preLoginContentString: any = {};
  if (contentStrings && contentStrings.length) {
    contentStrings.forEach(({ name: strKey, value }) => {
      if (strKey == PreLoginStringKeys.continueAsNonGuest) {
        const [first, second] = value.split('|');
        value = first.trim();
        if (acuteCare) value = second.trim();
      }
      preLoginContentString[strKey] = value;
    });
    return preLoginContentString;
  } else {
    const [first, second] = defaultPreloginModel.continue_as_nonguest.split('|');
    defaultPreloginModel.continue_as_nonguest = first.trim();
    if (acuteCare) {
      defaultPreloginModel.continue_as_nonguest = second.trim();
    }
    return defaultPreloginModel;
  }
};

export interface PreLoginStringModel {
  continue_as_guest: string;
  continue_as_nonguest: string;
  pre_login_instruction: string;
}

export const defaultPreloginModel = {
  continue_as_guest: 'Continue as guest',
  continue_as_nonguest: 'Continue as Student | Continue as Employee',
  pre_login_instruction:
    '<p>Here goes further instructions on how to login or register as a guest vs login or register as a student</p>',
};

/**
 * when doing a guest registration
 *
 */

export interface formField {
  alignHorizontal?: boolean;
  label: string;
  name: string;
  type: string;
  idd: string;
  cValidator?: CustomValidator[];
  validators?: any[];
  control?: AbstractControl;
  lookupFieldId?: string;
  separatorUp?: boolean;
  guestOnly?: boolean;
  hasError?: boolean;
  value?: string;
  touched?: boolean;
  validate?: () => boolean;
  copy?: () => Field;
}

export class Field implements formField {
  alignHorizontal?: boolean;
  label: string;
  name: string;
  type: string;
  idd: string;
  value?: any;
  cValidator?: CustomValidator[];
  validators?: any[];
  control?: AbstractControl;
  lookupFieldId?: string;
  separatorUp?: boolean;
  guestOnly?: boolean;
  hasError?: boolean;
  touched?: boolean;
  constructor(private formField?: formField) {
    this.alignHorizontal = formField.alignHorizontal;
    this.label = formField.label;
    this.name = formField.name;
    this.type = formField.type;
    this.idd = formField.idd;
    this.cValidator = formField.cValidator || [];
    this.validators = formField.validators;
    this.control = formField.control;
    this.lookupFieldId = formField.lookupFieldId;
    this.separatorUp = formField.separatorUp;
    this.guestOnly = formField.guestOnly;
    this.hasError = formField.hasError;
    this.touched = formField.touched;
  }
  validate(): boolean {
    if (this.touched && this.formField.cValidator.length) {
      let errorCounter = 0;
      this.formField.cValidator.forEach(validator => {
        validator.test(this.value) == false && errorCounter++;
      });
      this.hasError = errorCounter > 0;
      return this.hasError;
    } else {
      return true;
    }
  }
  copy(): Field {
    return new Field(this);
  }
}

export enum LookupFieldIds {
  guestRegistration = 'guestRegistration',
  guestFirstname = 'guestFirstName',
  guestLastname = 'guestLastName',
  patronRegistration = 'patronRegistration',
  patronFirstName = 'patronFirstName',
  patronLastName = 'patronLastName',
}

export const GuestRegistrationLookupFields = {
  displayName: '',
  displayOrder: 99,
  type: LookupFieldType.STRING_IGNORECASE,
};

export const getFieldValue = (from, fieldName) => {
  const result = from[fieldName];
  delete from[fieldName];
  return result;
};

export const STATICFIELDS = {
  firstName: {
    fieldName: 'firstName',
    idd: 'first_name',
  },
  lastName: {
    fieldName: 'lastName',
    idd: 'last_name',
  },
  userName: 'userName',
  phone: 'phone',
  password: 'password',
  passwordConfirm: 'passwordConfirm',
};

export const LOOKUPFIELDS = {
  FIRST_NAME: {
    displayName: 'First Name',
    fieldName: STATICFIELDS.firstName,
    idd: 'first_name',
  },
  LAST_NAME: {
    displayName: 'Last Name',
    fieldName: STATICFIELDS.lastName,
    idd: 'last_name',
  },
};
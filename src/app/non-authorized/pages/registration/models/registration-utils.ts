import { AbstractControl, ValidationErrors } from '@angular/forms';
import { LookupFieldType } from '@core/model/institution/institution-lookup-field.model';
import { Observable } from 'rxjs';
import { InputValidator } from './password-validation';
import { PasswordValidationCsModel } from './password-validation.content.strings';
import { RegistrationCsModel } from './registration-content-strings.model';

export enum RegistrationApiMethods {
  retrieveRegistrationFields = 'retrieveRegistrationFields',
  register = 'register',
}
export interface RegistrationContentString {
  registrationCs: RegistrationCsModel;
  passwordValidationCs: PasswordValidationCsModel;
}

export interface FormFieldList {
  horizontalAlignedFields: Field[];
  verticalAlignedFields: Field[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controls: { [key: string]: any };
}
export interface RegistrationData {
  fieldList: FormFieldList;
  contentString: RegistrationContentString;
}

export interface UserRegistrationManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(formData): Observable<any>;
  getData(): Promise<RegistrationData>;
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
  cValidator?: InputValidator[];
  validators?: [string, ...ValidationErrors[]];
  control?: AbstractControl;
  lookupFieldId?: string;
  separatorUp?: boolean;
  guestOnly?: boolean;
  hasError?: boolean;
  value?: string;
  touched?: boolean;
  errorMessage?: ((control: AbstractControl) => ValidationErrors)[];
  validate?: () => boolean;
  copy?: () => Field;
}

export class Field implements formField {
  alignHorizontal?: boolean;
  label: string;
  name: string;
  type: string;
  idd: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  cValidator?: InputValidator[];
  validators?: [string, ...ValidationErrors[]];
  control?: AbstractControl;
  lookupFieldId?: string;
  separatorUp?: boolean;
  guestOnly?: boolean;
  hasError?: boolean;
  touched?: boolean;
  errorMessage?: ((control: AbstractControl) => ValidationErrors)[]
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
    this.errorMessage = formField.errorMessage;
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

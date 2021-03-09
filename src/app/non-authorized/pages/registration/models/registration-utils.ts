import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidator } from './password-validation';
import { RegistrationCsModel } from './registration-content-strings.model';

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
  getData(): Promise<{ fieldList: FormFieldList; formData: RegistrationCsModel }>;
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

import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

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
  getFormFields(): Observable<FormFieldList>;
  getFormStrings(): Observable<RegFormStringModel>;
}

export interface FormFieldList {
  horizontalAlignedFields: formField[];
  verticalAlignedFields: formField[];
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

export interface RegFormStringModel {
  screen_title: string;
  submit_btn_text: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  user_name?: string;
  password?: string;
  confirm_password?: string;
}

export interface PreLoginStringModel {
  continue_as_guest: string;
  continue_as_nonguest: string;
  pre_login_instruction: string;
}

/**
 * when doing a guest registration
 *
 */

export interface formField {
  alignHorizontal?: boolean;
  value: string;
  name: string;
  type: string;
  idd: string;
  validator?: any[];
  control?: AbstractControl;
  lookupFieldId?: string;
  separatorUp?: boolean;
  guestOnly?: boolean;
  hasError?: boolean
}

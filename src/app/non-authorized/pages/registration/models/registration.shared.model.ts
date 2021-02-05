import { AbstractControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RegistrationService } from '../services/registration.service';
import { registrationFormStaticFields } from './form-config';
import { LookupFieldIds } from './guest-registration.config';

export class UserInfo {
  email?: string;
  password?: string;
  phone?: string;
}

export class PatronInfo extends UserInfo {
  formFields: LookupFieldInfo[] = [];
}

export class GuestInfo extends UserInfo {
  firstName?: string;
  lastName?: string;
}

export enum LookupFieldType {
  UNDEFINED = -1,
  MEDIA_VALUE = 1,
  DATE = 2,
  STRING_EXACT = 3,
  STRING_IGNORECASE = 4,
  STRING_FUZZY = 5,
  MMID_USID = 6,
}

const lookupFieldMapper = () => {};

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

export interface PageSetting {
  isGuest?: boolean;
  backgroundColor?: string;
  institutionName?: string;
}

export interface UserRegistrationManager {
  register(backendService: RegistrationService): Observable<any>;
  setting: PageSetting;
  formFields: formField[];
}

/**
 *
 *
 * when doing a patron registration
 *
 *
 *
 */

export interface registrationConfig {
  settings?: PageSetting;
  dynamicFields?: LookupFieldInfo[];
}

export class PatronRegistrationManager implements UserRegistrationManager {
  private __formFields: formField[] = [];

  constructor(
    public setting: PageSetting,
    public dynamicFields: LookupFieldInfo[] = [],
    private backendService: RegistrationService
  ) {
    this.initFields(dynamicFields);
  }

  private initFields(fields: LookupFieldInfo[]): void {
    const dynamicFields = fields.map(field => ({
      label: field.displayName,
      lookupFieldId: field.lookupFieldId,
      controlName: field.lookupFieldId,
      idd: field.lookupFieldId,
      type: 'text',
      validator: ['', Validators.required],
    }));
    this.__formFields = [...dynamicFields, ...registrationFormStaticFields];
  }

  get formFields(): formField[] {
    return this.__formFields;
  }

  register(data): Observable<any> {
    const FIRST_NAME = 'firstName';
    const LAST_NAME = 'lastName';

    const dynamicLookupFields = this.dynamicFields;
    dynamicLookupFields.map(field => {
      field.value = data[field.lookupFieldId];
      delete data[field.lookupFieldId];
    });

    const extraLookupFields = [
      {
        lookupFieldId: LookupFieldIds.patronRegistration,
        ...commonLookupFields,
        value: '1',
      },
      {
        lookupFieldId: LookupFieldIds.patronFirstName,
        ...commonLookupFields,
        value: getFieldValue(data, FIRST_NAME),
      },
      {
        lookupFieldId: LookupFieldIds.patronLastName,
        ...commonLookupFields,
        value: getFieldValue(data, LAST_NAME),
      },
    ];


    return this.backendService.institition$().pipe(
      switchMap(({ id: institutionId }) => {
        return this.backendService.callBackend(RegistrationApiMethods.register, {
          registrationInfo: {
            institutionId,
            ...data,
            registrationFields: {
              lookupFields: [
                ...dynamicLookupFields, ...extraLookupFields
              ],
            },
          },
        });
      })
    );
  }
}

/**
 * when doing a guest registration
 *
 */

export class GuestRegistrationManager implements UserRegistrationManager {
  private __formFields: formField[] = registrationFormStaticFields;
  constructor(public setting: PageSetting, private backendService: RegistrationService) {}

  get formFields(): formField[] {
    return this.__formFields;
  }

  register(data): Observable<any> {
    const FIRST_NAME = 'firstName';
    const LAST_NAME = 'lastName';
    const registrationFields = {
      lookupFields: [
        {
          lookupFieldId: LookupFieldIds.guestRegistration,
          ...commonLookupFields,
          value: '1',
        },
        {
          lookupFieldId: LookupFieldIds.guestFirstname,
          ...commonLookupFields,
          value: getFieldValue(data, FIRST_NAME),
        },
        {
          lookupFieldId: LookupFieldIds.guestLastname,
          ...commonLookupFields,
          value: getFieldValue(data, LAST_NAME),
        },
      ],
    };
    return this.backendService.institition$().pipe(
      switchMap(({ id: institutionId }) => {
        return this.backendService.callBackend(RegistrationApiMethods.register, {
          registrationInfo: {
            institutionId,
            ...data,
            registrationFields,
          },
        });
      })
    );
  }
}

export interface formField {
  alignHorizontal?: boolean;
  label: string;
  controlName: string;
  type: string;
  idd: string;
  validator?: any[];
  control?: AbstractControl;
  lookupFieldId?: string;
  separatorUp?: boolean;
}

const commonLookupFields = {
  displayName: '',
  displayOrder: 99,
  type: 0,
};

const getFieldValue = (from, fieldName) => {
  const result = from[fieldName];
  delete from[fieldName];
  return result;
};

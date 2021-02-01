import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RegistrationService } from '../services/registration.service';
import { guestRegistrationFormFields, LookupFieldIds } from './guest-registration.config';
import { registrationStaticFormFields } from './registration-static.fields';

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

export interface formField {
  label: string;
  fieldName?: string;
  assetIcon?: string;
  value?: any;
  lookupFieldId?: string;
}

export interface UserRegistrationManager {
  register(backendService: RegistrationService): Observable<any>;
  user: UserInfo;
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

export class PatronRegistrationManager implements UserRegistrationManager {
  public user = new PatronInfo();
  private __formFields: formField[] = [];
  constructor(public setting: PageSetting, public dynamicFields: LookupFieldInfo[] = []) {
    this.__formFields = dynamicFields.map(field => ({ label: field.displayName, lookupFieldId: field.lookupFieldId }));
  }

  get formFields(): formField[] {
    return [...this.__formFields, ...registrationStaticFormFields];
  }

  register(backendService: RegistrationService): Observable<any> {
    const lookupFields = this.dynamicFields;

    lookupFields.forEach(df => {
      this.__formFields.forEach(ff => {
        if (df.lookupFieldId == ff.lookupFieldId) {
          df.value = ff.value;
        }
      });
    });

    const params = {};
    this.formFields.forEach(item => {
      if (item.fieldName) {
        params[item.fieldName] = item.value;
      }
    });

    const registrationFields = { lookupFields };
    return backendService.institition$().pipe(
      switchMap(({ id: institutionId }) => {
        return backendService.callBackend(RegistrationApiMethods.register, {
          registrationInfo: {
            institutionId,
            ...params,
            registrationFields,
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
  public user = new GuestInfo();
  private __formFields: formField[] = [...guestRegistrationFormFields, ...registrationStaticFormFields];
  constructor(public setting: PageSetting) {}

  get formFields(): formField[] {
    return this.__formFields;
  }

  register(backendService: RegistrationService): Observable<any> {
    const get = fieldName => {
      const formField = this.__formFields.find(field => field.fieldName == fieldName) || {};
      const response = formField['value'];
      return response;
    };

    const lookupField = {
      displayName: '',
      displayOrder: 99,
      type: 0,
    };

    const registrationFields = {
      lookupFields: [
        {
          lookupFieldId: LookupFieldIds.guestRegistration,
          ...lookupField,
          value: '1',
        },
        {
          lookupFieldId: LookupFieldIds.guestFirstname,
          ...lookupField,
          value: get(LookupFieldIds.guestFirstname),
        },
        {
          lookupFieldId: LookupFieldIds.guestLastname,
          ...lookupField,
          value: get(LookupFieldIds.guestLastname),
        },
      ],
    };

    let params = {};
    this.__formFields.forEach(item => (params = { ...params, [item.fieldName]: item.value }));

    delete params[LookupFieldIds.guestFirstname];
    delete params[LookupFieldIds.guestLastname];
    
    return backendService.institition$().pipe(
      switchMap(({ id: institutionId }) => {
        return backendService.callBackend(RegistrationApiMethods.register, {
          registrationInfo: {
            institutionId,
            ...params,
            registrationFields,
          },
        });
      })
    );
  }
}

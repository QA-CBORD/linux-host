import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, zip } from 'rxjs';
import { first, map, switchMap, take, tap } from 'rxjs/operators';
import { RegistrationService } from '../services/registration.service';
import { registrationFormStaticFields, STATICFIELDS } from './form-config';
import { LookupFieldIds } from './guest-registration.config';

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
}

export interface FormFieldList {
  horizontalAlignedFields: formField[];
  verticalAlignedFields: formField[];
  controls: { [key: string]: any };
}

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

/**
 *
 *
 * when doing a patron registration
 *
 *
 *
 */

export interface RegistrationContent {
  screen_title: string;
  submit_btn_text: string;
  as_guest_btn_text: string;
  as_patron_btn_text: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  user_name?: string;
  password?: string;
  confirm_password?: string;
}

interface RegistrationState {
  contentLoaded: boolean;
  fieldsConfigured: boolean;
  content: RegistrationContent;
  staticFields: formField[];
}

const state: RegistrationState = {
  contentLoaded: false,
  fieldsConfigured: false,
  content: {
    submit_btn_text: 'Create account',
    screen_title: 'Create an Account',
    as_guest_btn_text: 'Continue as Guest',
    as_patron_btn_text: 'Continue as Student',
  },
  staticFields: [],
};

export class UserRegistrationManagerBase {
  formFieldList: FormFieldList;

  constructor(protected backendService: RegistrationService) {}

  get contents(): Observable<RegistrationContent> {
    return (state.contentLoaded && of(state.content)) || this.getContents();
  }

  private getContents(): Observable<RegistrationContent> {
    const contentStringSource$ = this.backendService.getAllRegistrationContentString().pipe(first());
    return contentStringSource$.pipe(
      take(1),
      map(contents => {
        state.contentLoaded = true;
        contents.forEach(({ name, value }) => (state.content[name] = value));
        return state.content;
      })
    );
  }

  protected get formFields(): Observable<formField[]> {
    return (state.fieldsConfigured && of(state.staticFields)) || this.configureStaticFields();
  }

  getFormFields(): Observable<FormFieldList> {
    if (this.formFieldList) return of(this.formFieldList);
    return this.formFields.pipe(
      map(allFields => {
        const controls = {};
        const horizontalAlignedFields = [];
        const verticalAlignedFields = [];
        allFields.forEach(field => {
          if (field.alignHorizontal) horizontalAlignedFields.push(field);
          else verticalAlignedFields.push(field);
          controls[field.name] = field.validator;
        });
        return {
          horizontalAlignedFields,
          verticalAlignedFields,
          controls,
        };
      }),
      tap(data => (this.formFieldList = data))
    );
  }

  private configureStaticFields(): Observable<formField[]> {
    return this.contents.pipe(
      take(1),
      map(data => {
        const formFields: formField[] = [];
        for (const key of Object.keys(registrationFormStaticFields)) {
          registrationFormStaticFields[key].value = data[key];
          formFields.push(registrationFormStaticFields[key]);
        }
        state.staticFields = formFields;
        state.fieldsConfigured = true;
        return formFields;
      })
    );
  }
}

export class PatronRegistrationManager extends UserRegistrationManagerBase implements UserRegistrationManager {
  private dynamicFields: LookupFieldInfo[];
  constructor(protected backendService: RegistrationService) {
    super(backendService);
  }

  protected get formFields(): Observable<formField[]> {
    const dynamicFormField$ = this.backendService.retrieveRegistrationFields().pipe(
      take(1),
      map(unSortedList => {
        unSortedList.sort((a, b) => +a.displayOrder - +b.displayOrder);
        return unSortedList;
      })
    );
    const staticFormFields$ = super.formFields.pipe(map(fields => fields.filter(field => !field.guestOnly)));
    return zip(staticFormFields$, dynamicFormField$).pipe(
      map(([statics, dynamics]) => this.combineFields(dynamics, statics))
    );
  }

  private combineFields(dynamicFields: LookupFieldInfo[], staticFields: formField[]): formField[] {
    this.dynamicFields = dynamicFields;
    const dynamicsToFormfields = this.convert2FormFields(dynamicFields);
    return [...dynamicsToFormfields, ...staticFields];
  }

  private convert2FormFields(dynamicFields: LookupFieldInfo[]): formField[] {
    const { FIRST_NAME, LAST_NAME } = LOOKUPFIELDS;
    const isNameLookupField = field => {
      if (field.displayName == FIRST_NAME.displayName) return FIRST_NAME;
      else if (field.displayName == LAST_NAME.displayName) return LAST_NAME;
      return null;
    };

    return dynamicFields.map(field => {
      const firstOrLastnameLookupField = isNameLookupField(field);
      return {
        value: field.displayName,
        lookupFieldId: field.lookupFieldId,
        name: field.lookupFieldId,
        idd: (firstOrLastnameLookupField && firstOrLastnameLookupField.idd) || field.lookupFieldId,
        alignHorizontal: !!firstOrLastnameLookupField,
        type: 'text',
        validator: ['', Validators.compose([Validators.required, Validators.min(2)])],
      };
    });
  }

  register(data): Observable<any> {
    const dynamicLookupFields = this.dynamicFields;
    dynamicLookupFields.map(field => {
      field.value = data[field.lookupFieldId];
      delete data[field.lookupFieldId];
    });

    return this.backendService.institition$().pipe(
      switchMap(({ id: institutionId }) => {
        return this.backendService.callBackend(RegistrationApiMethods.register, {
          registrationInfo: {
            institutionId,
            ...data,
            registrationFields: {
              lookupFields: [...dynamicLookupFields],
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

export class GuestRegistrationManager extends UserRegistrationManagerBase implements UserRegistrationManager {
  constructor(protected backendService: RegistrationService) {
    super(backendService);
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
  value: string;
  name: string;
  type: string;
  idd: string;
  validator?: any[];
  control?: AbstractControl;
  lookupFieldId?: string;
  separatorUp?: boolean;
  guestOnly?: boolean;
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

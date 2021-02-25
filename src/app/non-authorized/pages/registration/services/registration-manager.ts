import { Validators } from '@angular/forms';
import { Observable, zip } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { registrationFormStaticFields, STATICFIELDS } from '../models/form-config';
import {
  FormFieldList,
  formField,
  LookupFieldInfo,
  RegistrationApiMethods,
  UserRegistrationManager,
  RegFormStringModel,
  LookupFieldType,
} from '../models/registration.shared.model';
import { RegistrationService } from './registration.service';

export enum LookupFieldIds {
  guestRegistration = 'guestRegistration',
  guestFirstname = 'guestFirstName',
  guestLastname = 'guestLastName',
  patronRegistration = 'patronRegistration',
  patronFirstName = 'patronFirstName',
  patronLastName = 'patronLastName',
}

const GuestRegistrationLookupFields = {
  displayName: '',
  displayOrder: 99,
  type: LookupFieldType.STRING_IGNORECASE,
};

const getFieldValue = (from, fieldName) => {
  const result = from[fieldName];
  delete from[fieldName];
  return result;
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

export class UserRegistrationManagerBase {
  formFieldList: FormFieldList;

  constructor(protected backendService: RegistrationService) {}

  getFormStrings(): Observable<RegFormStringModel> {
    const contentStringSource$ = this.backendService
      .getContentStringByCategory$(CONTENT_STRINGS_CATEGORIES.mobileRegistration)
      .pipe(take(1));
    return contentStringSource$.pipe(
      map(contents => {
        const data: any = {};
        contents.forEach(({ name, value }) => (data[name] = value));
        return data;
      })
    );
  }

  protected get formFields(): Observable<formField[]> {
    return this.configureStaticFields();
  }

  getFormFields(): Observable<FormFieldList> {
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
    return this.getFormStrings().pipe(
      take(1),
      map(data => {
        const formFields: formField[] = [];
        const staticFieldsCopy = {};
        for (const key of Object.keys(registrationFormStaticFields)) {
          staticFieldsCopy[key] = { ...registrationFormStaticFields[key] };
          staticFieldsCopy[key].value = data[key];
          formFields.push(staticFieldsCopy[key]);
        }
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
    const dynamicsToFormfields = this.formFieldFromDynamicFields(dynamicFields);
    return [...dynamicsToFormfields, ...staticFields];
  }

  private formFieldFromDynamicFields(dynamicFields: LookupFieldInfo[]): formField[] {
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
          ...GuestRegistrationLookupFields,
          value: '1',
        },
        {
          lookupFieldId: LookupFieldIds.guestFirstname,
          ...GuestRegistrationLookupFields,
          value: getFieldValue(data, FIRST_NAME),
        },
        {
          lookupFieldId: LookupFieldIds.guestLastname,
          ...GuestRegistrationLookupFields,
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

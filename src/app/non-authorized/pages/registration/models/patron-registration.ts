import { Validators } from '@angular/forms';
import { take, map, switchMap } from 'rxjs/operators';
import {
  Field,
  LOOKUPFIELDS,
  RegistrationApiMethods,
  UserRegistrationManager,
} from './registration-utils';
import { RegistrationService } from '../services/registration.service';
import { UserRegistrationBase } from './registration';
import { RegistrationCsModel } from './registration-content-strings.model';
import { LookupFieldInfo } from '@core/model/institution/institution-lookup-field.model'
import { SupportedInputValidators } from './password-validation';

export class PatronRegistration extends UserRegistrationBase implements UserRegistrationManager {
  private dynamicFields: LookupFieldInfo[];
  constructor(protected backendService: RegistrationService) {
    super(backendService);
  }

  protected async formFieldsConfig(data: RegistrationCsModel): Promise<Field[]> {
    const dynamicFormFields = await this.backendService
      .retrieveRegistrationFields()
      .pipe(
        take(1),
        map(unSortedList => {
          unSortedList.sort((a, b) => +a.displayOrder - +b.displayOrder);
          return unSortedList;
        })
      )
      .toPromise();
    const staticFields = ((await super.formFieldsConfig(data)) || []).filter(field => !field.guestOnly);
    return this.combineFields(dynamicFormFields, staticFields);
  }

  private combineFields(dynamicFields: LookupFieldInfo[], staticFields: Field[]): Field[] {
    this.dynamicFields = dynamicFields;
    const dynamicsToFormfields = this.toFormFields(dynamicFields);
    return [...dynamicsToFormfields, ...staticFields];
  }

  private toFormFields(dynamicFields: LookupFieldInfo[]): Field[] {
    const { FIRST_NAME, LAST_NAME } = LOOKUPFIELDS;
    const isNameLookupField = field => {
      if (field.displayName == FIRST_NAME.displayName) return FIRST_NAME;
      else if (field.displayName == LAST_NAME.displayName) return LAST_NAME;
      return null;
    };

    return dynamicFields.map(field => {
      const firstOrLastnameLookupField = isNameLookupField(field);
      return new Field({
        label: field.displayName,
        lookupFieldId: field.lookupFieldId,
        name: field.lookupFieldId,
        idd: (firstOrLastnameLookupField && firstOrLastnameLookupField.idd) || field.lookupFieldId,
        alignHorizontal: !!firstOrLastnameLookupField,
        type: 'text',
        cValidator: [SupportedInputValidators.required],
        validators: ['', Validators.required],
      });
    });
  }

  register(formData) {
    const data = { ...formData };
    const dynamicLookupFields = this.dynamicFields;
    dynamicLookupFields.forEach(field => {
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

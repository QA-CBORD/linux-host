import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegistrationService } from '../services/registration.service';
import { registrationFormStaticFields } from './registration-form-controls.config';
import { PasswordValidationCsModel } from './password-validation.content.strings';
import { RegistrationCsModel } from './registration-content-strings.model';
import { FormFieldList, Field, RegistrationContentString, RegistrationData } from './registration-utils';

export class UserRegistrationBase {
  constructor(protected backendService: RegistrationService) {}

  getFormStrings(): Observable<RegistrationContentString> {
    const registrationString$ = this.backendService.getStringModel$<RegistrationCsModel>(
      ContentStringCategory.registration
    );
    const passwordValidationString$ = this.backendService.getStringModel$<PasswordValidationCsModel>(
      ContentStringCategory.passwordValidation
    );

    return zip(registrationString$, passwordValidationString$).pipe(
      map(([registrationCs, passwordValidationCs]) => ({ registrationCs, passwordValidationCs }))
    );
  }

  async getData(): Promise<RegistrationData> {
    const { passwordValidationCs, registrationCs } = await this.getFormStrings().toPromise();
    const fieldList = await this.toFormFieldList(await this.formFieldsConfig(registrationCs));
    return { fieldList, contentString: { passwordValidationCs, registrationCs } };
  }

  protected async toFormFieldList(formFields: Field[]): Promise<FormFieldList> {
    const initialState = {
      horizontalAlignedFields: [],
      verticalAlignedFields: [],
      controls: {},
    };
    return formFields.reduce<FormFieldList>(
      (initial, elem) => ({
        ...initial,
        controls: { ...initial.controls, [elem.name]: elem.validators },
        horizontalAlignedFields:
          (elem.alignHorizontal && [...initial.horizontalAlignedFields, elem]) || initial.horizontalAlignedFields,
        verticalAlignedFields:
          (!elem.alignHorizontal && [...initial.verticalAlignedFields, elem]) || initial.verticalAlignedFields,
      }),
      initialState
    );
  }

  protected async formFieldsConfig(contentString: RegistrationCsModel): Promise<Field[]> {
    const staticFieldsKeys = Object.keys(registrationFormStaticFields);
    return staticFieldsKeys.map(key => {
      const fieldCopy = registrationFormStaticFields[key].copy();
      const newLabel = contentString.valueByKey(key) || fieldCopy.label;
      fieldCopy.label = newLabel;
      return fieldCopy;
    });
  }
}

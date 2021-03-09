import { ContentStringApi } from '@shared/model/content-strings/content-strings-api';
import { Observable, of, zip } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { buildPasswordValidators } from 'src/app/password-validation/models/input-validator.model';
import { RegistrationService } from '../services/registration.service';
import { registrationFormStaticFields } from './form-config';
import { RegistrationCsModel } from './registration-content-strings.model';
import { FormFieldList, Field } from './registration-utils';

export class UserRegistrationBase {
  constructor(protected backendService: RegistrationService) {}

  getFormStrings(): Observable<RegistrationCsModel> {
    const registrationString$ = this.backendService.getString$(CONTENT_STRINGS_CATEGORIES.mobileRegistration).pipe(
      take(1),
      map(data => ContentStringApi.registration(data)),
      catchError(() => of(ContentStringApi.registration()))
    );

    const validationString$ = this.backendService.getString$(CONTENT_STRINGS_CATEGORIES.passwordValidation).pipe(
      take(1),
      map(data => buildPasswordValidators(data)),
      catchError(() => of(buildPasswordValidators()))
    );

    return zip(registrationString$, validationString$).pipe(
      map(([data, passwordValidators]) => ({ ...data, passwordValidators }))
    );
  }

  async getData(): Promise<{ fieldList: FormFieldList; formData: RegistrationCsModel }> {
    const formData = await this.getFormStrings().toPromise();
    const fieldList = await this.toFormFieldList(await this.formFieldsConfig(formData));
    return { fieldList, formData };
  }

  protected async toFormFieldList(formFields: Field[]): Promise<FormFieldList> {
    const controls = {};
    const horizontalAlignedFields: Field[] = [];
    const verticalAlignedFields: Field[] = [];
    formFields.forEach(field => {
      if (field.alignHorizontal) {
        horizontalAlignedFields.push(field);
      } else {
        verticalAlignedFields.push(field);
      }
      controls[field.name] = field.validators;
    });

    return {
      horizontalAlignedFields,
      verticalAlignedFields,
      controls,
    };
  }

  protected formFieldsConfig(data: RegistrationCsModel): Promise<Field[]> {
    const formFields: Field[] = [];
    const staticFieldsCopy = {};
    for (const key of Object.keys(registrationFormStaticFields)) {
      staticFieldsCopy[key] = registrationFormStaticFields[key].copy();
      staticFieldsCopy[key].value = data[key];
      formFields.push(staticFieldsCopy[key]);
    }
    return Promise.resolve(formFields);
  }
}

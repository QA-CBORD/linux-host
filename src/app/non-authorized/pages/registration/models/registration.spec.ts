import { UserRegistrationBase } from './registration';
import { registrationServiceMock } from './guest-registration.spec';
import { first } from 'rxjs';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { Field, STATICFIELDS } from './registration-utils';
import { Validators } from '@angular/forms';
import { SupportedInputValidators } from './password-validation';
import { formControlErrorDecorator } from '@core/utils/general-helpers';
import { CONTROL_ERROR, FORM_CONTROL_NAMES } from '@sections/ordering';

describe('UserRegistrationBase', () => {
  let registrationBase: UserRegistrationBase;

  beforeAll(() => {
    registrationBase = new UserRegistrationBase(registrationServiceMock);
  });

  it('should get form strings', () => {
    const spy = jest.spyOn(registrationServiceMock, 'getStringModel$');
    registrationBase.getFormStrings().pipe(first()).subscribe();
    expect(spy).toBeCalledWith(ContentStringCategory.passwordValidation);
    expect(spy).toBeCalledWith(ContentStringCategory.registration);
  });

  it('should get registration data', async () => {
    const spy = jest.spyOn(registrationBase, 'getFormStrings');
    await registrationBase.getData();
    expect(spy).toBeCalledTimes(1);
  });

  it('should convert form fields to form field list', async () => {
    const formFields = [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'password', label: 'Password', type: 'password' },
    ];

    jest.spyOn(registrationBase as any, 'toFormFieldList');

    const result = await registrationBase['toFormFieldList'](formFields as any);
    expect(result).toMatchObject({
      controls: {
        password: undefined,
        username: undefined,
      },
      horizontalAlignedFields: [],
      verticalAlignedFields: [
        {
          label: 'Username',
          name: 'username',
          type: 'text',
        },
        {
          label: 'Password',
          name: 'password',
          type: 'password',
        },
      ],
    });
  });

  it('should get form fields configuration', async () => {
    const result = await registrationBase['formFieldsConfig']({ valueByKey: () => null } as any);
    expect(result[0]).toMatchObject({ label: 'First Name', name: 'firstName', type: 'text' });
    expect(result[1]).toMatchObject({ label: 'Last Name', name: 'lastName', type: 'text' });
  });

  it('should validate the field', () => {
    const field = new Field({
      label: 'Phone Number',
      idd: 'phone_number',
      name: STATICFIELDS.phone,
      type: 'tel',
      cValidator: [SupportedInputValidators.min(3), SupportedInputValidators.max(32)],
      validators: ['', Validators.required],
      errorMessage: [
        formControlErrorDecorator(Validators.required, CONTROL_ERROR[FORM_CONTROL_NAMES.phone].required),
        formControlErrorDecorator(Validators.minLength(3), CONTROL_ERROR[FORM_CONTROL_NAMES.phone].min),
        formControlErrorDecorator(Validators.maxLength(32), CONTROL_ERROR[FORM_CONTROL_NAMES.phone].max),
      ],
    });
    field.touched = true;
    expect(field.validate()).toBeFalsy();
  });


  it('should validate the field', () => {
    const field = new Field({
      label: 'Create Password',
      idd: 'pass_word',
      name: STATICFIELDS.password,
      type: 'password',
      validators: ['', Validators.required],
      separatorUp: true,
    });

    expect(field.validate()).toBeTruthy();
  });
});

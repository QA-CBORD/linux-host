import { Validators } from '@angular/forms';
import { formControlErrorDecorator } from '@core/utils/general-helpers';
import { EMAIL_REGEXP, ONE_LETTER_MIN } from '@core/utils/regexp-patterns';
import { CONTROL_ERROR, FORM_CONTROL_NAMES } from '@sections/ordering';
import { SupportedInputValidators } from './password-validation';
import { Field, STATICFIELDS } from './registration-utils';

export const EMAIL_CONTROL_ERROR = {
  [FORM_CONTROL_NAMES.email]: {
    validEmail: 'Enter a valid email',
    emailRequired: 'Email is required',
  }
};

export const NAME_CONTROL_ERROR = {
  [FORM_CONTROL_NAMES.name]: {
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    validFirstName: 'Fist name must have at least one letter',
    validLastName: 'Last name must have at least one letter',
  }
};

export const registrationFormStaticFields: { [key: string]: Field } = {
  first_name: new Field({
    alignHorizontal: true,
    label: 'First Name',
    idd: STATICFIELDS.firstName.idd,
    name: STATICFIELDS.firstName.fieldName,
    type: 'text',
    cValidator: [SupportedInputValidators.min(1), SupportedInputValidators.minOneLetter],
    guestOnly: true,
    validators: ['', Validators.required],
    errorMessage: [
      formControlErrorDecorator(Validators.required, NAME_CONTROL_ERROR[FORM_CONTROL_NAMES.name].firstNameRequired),
      formControlErrorDecorator(Validators.pattern(ONE_LETTER_MIN), NAME_CONTROL_ERROR[FORM_CONTROL_NAMES.name].validFirstName)
    ],
  }),
  last_name: new Field({
    alignHorizontal: true,
    label: 'Last Name',
    idd: STATICFIELDS.lastName.idd,
    name: STATICFIELDS.lastName.fieldName,
    type: 'text',
    cValidator: [SupportedInputValidators.min(1), SupportedInputValidators.minOneLetter],
    guestOnly: true,
    validators: ['', Validators.required],
    errorMessage: [
      formControlErrorDecorator(Validators.required, NAME_CONTROL_ERROR[FORM_CONTROL_NAMES.name].lastNameRequired),
      formControlErrorDecorator(Validators.pattern(ONE_LETTER_MIN), NAME_CONTROL_ERROR[FORM_CONTROL_NAMES.name].validLastName),
    ],
  }),
  user_name: new Field({
    label: 'Email',
    idd: 'email_address',
    name: STATICFIELDS.userName,
    type: 'email',
    cValidator: [SupportedInputValidators.email()],
    validators: ['', Validators.required],
    errorMessage: [
      formControlErrorDecorator(Validators.required, EMAIL_CONTROL_ERROR[FORM_CONTROL_NAMES.email].emailRequired),
      formControlErrorDecorator(
        Validators.pattern(EMAIL_REGEXP),
        EMAIL_CONTROL_ERROR[FORM_CONTROL_NAMES.email].validEmail
      ),
    ],
  }),
  phone: new Field({
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
  }),
  password: new Field({
    label: 'Create Password',
    idd: 'pass_word',
    name: STATICFIELDS.password,
    type: 'password',
    validators: ['', Validators.required],
    separatorUp: true,
  }),
};

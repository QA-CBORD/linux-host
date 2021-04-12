import { Validators } from '@angular/forms';
import { SupportedInputValidators } from './password-validation';
import { Field, STATICFIELDS } from './registration-utils';

export const registrationFormStaticFields: { [key: string]: Field } = {
  first_name: new Field({
    alignHorizontal: true,
    label: 'First Name',
    idd: STATICFIELDS.firstName.idd,
    name: STATICFIELDS.firstName.fieldName,
    type: 'text',
    cValidator: [SupportedInputValidators.min(1)],
    guestOnly: true,
    validators: ['', Validators.required],
  }),
  last_name: new Field({
    alignHorizontal: true,
    label: 'Last Name',
    idd: STATICFIELDS.lastName.idd,
    name: STATICFIELDS.lastName.fieldName,
    type: 'text',
    cValidator: [SupportedInputValidators.min(1)],
    guestOnly: true,
    validators: ['', Validators.required],
  }),
  user_name: new Field({
    label: 'Email',
    idd: 'email_address',
    name: STATICFIELDS.userName,
    type: 'email',
    cValidator: [SupportedInputValidators.email()],
    validators: ['', Validators.required],
  }),
  phone: new Field({
    label: 'Phone Number',
    idd: 'phone_number',
    name: STATICFIELDS.phone,
    type: 'text',
    cValidator: [SupportedInputValidators.phoneNumber()],
    validators: ['', Validators.required],
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

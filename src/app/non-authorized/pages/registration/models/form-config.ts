import { Validators } from '@angular/forms';
import { Cvalidators, getDefaultPasswordValidators } from './password-validation';
import { Field, STATICFIELDS } from './registration-utils';

export const registrationFormStaticFields: { [key: string]: Field } = {
  first_name: new Field({
    alignHorizontal: true,
    label: 'First Name',
    idd: STATICFIELDS.firstName.idd,
    name: STATICFIELDS.firstName.fieldName,
    type: 'text',
    cValidator: [Cvalidators.min(1)],
    guestOnly: true,
    validators: ['', Validators.minLength(1)],
  }),
  last_name: new Field({
    alignHorizontal: true,
    label: 'Last Name',
    idd: STATICFIELDS.lastName.idd,
    name: STATICFIELDS.lastName.fieldName,
    type: 'text',
    cValidator: [Cvalidators.min(1)],
    guestOnly: true,
    validators: ['', Validators.minLength(1)],
  }),
  user_name: new Field({
    label: 'Email',
    idd: 'email_address',
    name: STATICFIELDS.userName,
    type: 'email',
    cValidator: [Cvalidators.email()],
    validators: ['', Validators.email],
  }),
  phone: new Field({
    label: 'Phone Number',
    idd: 'phone_number',
    name: STATICFIELDS.phone,
    type: 'text',
    cValidator: [Cvalidators.nullablePhone()],
    validators: ['', Validators.nullValidator],
  }),
  password: new Field({
    label: 'Create Password',
    idd: 'pass_word',
    name: STATICFIELDS.password,
    type: 'password',
    cValidator: getDefaultPasswordValidators(),
    validators: ['', Validators.minLength(8)],
    separatorUp: true,
  }),
};

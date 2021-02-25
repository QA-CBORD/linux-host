import { Validators } from '@angular/forms';
import { formField } from './registration.shared.model';


export const STATICFIELDS = {
  firstName: {
    fieldName: 'firstName',
    idd: 'first_name',
  },
  lastName: {
    fieldName: 'lastName',
    idd: 'last_name',
  },
  userName: 'userName',
  phone: 'phone',
  password: 'password',
  passwordConfirm: 'passwordConfirm',
};

export const registrationFormStaticFields: { [key: string]: formField } = {
  first_name: {
    alignHorizontal: true,
    value: 'First Name',
    idd: STATICFIELDS.firstName.idd,
    name: STATICFIELDS.firstName.fieldName,
    type: 'text',
    validator: ['', Validators.compose([Validators.minLength(1), Validators.required])],
    guestOnly: true,
  },
  last_name: {
    alignHorizontal: true,
    value: 'Last Name',
    idd: STATICFIELDS.lastName.idd,
    name: STATICFIELDS.lastName.fieldName,
    type: 'text',
    validator: ['', Validators.compose([Validators.minLength(1), Validators.required])],
    guestOnly: true,
  },
  user_name: {
    value: 'Email',
    idd: 'email_address',
    name: STATICFIELDS.userName,
    type: 'email',
    validator: ['', Validators.compose([Validators.required, Validators.email])],
  },
  phone: {
    value: 'Phone Number',
    idd: 'phone_number',
    name: STATICFIELDS.phone,
    type: 'text',
    validator: ['',  Validators.nullValidator],
  },
  password: {
    value: 'Create Password',
    idd: 'pass_word',
    name: STATICFIELDS.password,
    type: 'password',
    validator: ['', Validators.compose([Validators.minLength(8), Validators.required])],
    separatorUp: true,
  },
  confirm_password: {
    value: 'Confirm Password',
    idd: 'confirm_pass_word',
    name: STATICFIELDS.passwordConfirm,
    type: 'password',
    validator: ['', Validators.compose([Validators.minLength(8), Validators.required])],
  },
};

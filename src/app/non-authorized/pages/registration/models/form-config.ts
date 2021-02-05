import { Validators } from '@angular/forms';
import { LookupFieldIds } from './guest-registration.config';
import { formField } from './registration.shared.model';

export const registrationFormStaticFields: formField[] = [
  {
    alignHorizontal: true,
    label: 'First name',
    idd: 'first_name',
    controlName: 'firstName',
    type: 'text',
    validator: ['', Validators.required],
  },
  {
    alignHorizontal: true,
    label: 'Last name',
    idd: 'last_name',
    controlName: 'lastName',
    type: 'text',
    validator: ['', Validators.required],
  },
  {
    label: 'Email',
    idd: 'email_address',
    controlName: 'userName',
    type: 'email',
    validator: ['', Validators.email],
  },
  {
    label: 'Phone Number',
    idd: 'phone_number',
    controlName: 'phone',
    type: 'text',
    validator: ['', Validators.nullValidator],
  },

  {
    label: 'Create Password',
    idd: 'pass_word',
    controlName: 'password',
    type: 'password',
    validator: ['', Validators.required],
    separatorUp: true,
  },

  {
    label: 'Confirm Password',
    idd: 'confirm_pass_word',
    controlName: 'passwordConfirm',
    type: 'password',
    validator: ['', Validators.required],
  },
];

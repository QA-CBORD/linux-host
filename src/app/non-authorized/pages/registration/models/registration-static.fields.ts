import { formField } from './registration.shared.model';

export const registrationStaticFormFields: formField[] = [
  {
    label: 'Email',
    assetIcon: 'email',
    fieldName: 'userName',
  },
  {
    label: 'Phone',
    assetIcon: 'phone',
    fieldName: 'phone',
  },
  {
    label: 'Password',
    assetIcon: 'password',
    fieldName: 'password',
  },
  {
    label: 'Confirm password',
    assetIcon: 'password',
    fieldName: 'passwordConfirm',
  },
];

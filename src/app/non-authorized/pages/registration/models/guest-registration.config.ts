import { formField } from './registration.shared.model';


export enum LookupFieldIds {
    guestRegistration = 'guestRegistration',
    guestFirstname = 'guestFirstName',
    guestLastname = 'guestLastName',
}

export const guestRegistrationFormFields: formField[] = [
  {
    label: 'First name',
    assetIcon: 'user',
    fieldName: LookupFieldIds.guestFirstname,
  },
  {
    label: 'Last name',
    assetIcon: 'user',
    fieldName: LookupFieldIds.guestLastname,
  },
];

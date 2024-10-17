import { switchMap } from 'rxjs/operators';
import {
  RegistrationApiMethods,
  UserRegistrationManager,
  getFieldValue,
  GuestRegistrationLookupFields,
  LookupFieldIds,
} from './registration-utils';
import { RegistrationService } from '../services/registration.service';
import { UserRegistrationBase } from './registration';



export class GuestRegistration extends UserRegistrationBase implements UserRegistrationManager {
  constructor(protected backendService: RegistrationService) {
    super(backendService);
  }

  register(data) {
    const FIRST_NAME = 'firstName';
    const LAST_NAME = 'lastName';
    const registrationFields = {
      lookupFields: [
        {
          lookupFieldId: LookupFieldIds.guestRegistration,
          ...GuestRegistrationLookupFields,
          value: '1',
        },
        {
          lookupFieldId: LookupFieldIds.guestFirstname,
          ...GuestRegistrationLookupFields,
          value: getFieldValue(data, FIRST_NAME),
        },
        {
          lookupFieldId: LookupFieldIds.guestLastname,
          ...GuestRegistrationLookupFields,
          value: getFieldValue(data, LAST_NAME),
        },
      ],
    };
    return this.backendService.institution$().pipe(
      switchMap(({ id: institutionId }) => {
        return this.backendService.callBackend(RegistrationApiMethods.register, {
          registrationInfo: {
            institutionId,
            ...data,
            registrationFields,
          },
        });
      })
    );
  }
}

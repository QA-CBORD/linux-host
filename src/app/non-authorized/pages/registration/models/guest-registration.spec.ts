import { GuestRegistration } from './guest-registration';
import { RegistrationService } from '../services/registration.service';
import { first, of } from 'rxjs';
import { Institution } from '@core/model/institution/institution.model';
import { ContentStringModel } from '@shared/model/content-strings/content-string-models';
import { LookupFieldType } from '@core/model/institution/institution-lookup-field.model';

export const registrationServiceMock = {
  institition$: () => of({ id: '1' } as Institution),
  callBackend: () => of({}),
  getStringModel$: () =>
    of({
      passwordValidationCs: '',
      registrationCs: '',
      valueByKey: () => 'new Label',
    } as unknown as ContentStringModel),
  retrieveRegistrationFields: () =>
    of([
      {
        lookupFieldId: '2',
        displayName: 'First Name',
        displayOrder: 1,
        type: LookupFieldType.MEDIA_VALUE,
        value: '',
      },

      {
        lookupFieldId: '7',
        displayName: 'Last Name',
        displayOrder: 2,
        type: LookupFieldType.MEDIA_VALUE,
        value: '',
      },
    ]),
} as Partial<RegistrationService> as RegistrationService;

describe('GuestRegistration', () => {
  let guestRegistration: GuestRegistration;

  beforeEach(() => {
    guestRegistration = new GuestRegistration(registrationServiceMock);
  });

  it('should create an instance of GuestRegistration', () => {
    expect(guestRegistration).toBeTruthy();
  });

  it('should get the institution id', () => {
    const registerSpy = jest.spyOn(registrationServiceMock, 'institition$');
    const data = {};
    guestRegistration.register(data).pipe(first()).subscribe();
    expect(registerSpy).toHaveBeenCalled();
  });

  it('should call the register method of the backend service', () => {
    const registerSpy = jest.spyOn(registrationServiceMock, 'callBackend');
    const data = { firstName: 'John', lastName: 'Doe' };
    guestRegistration.register(data).pipe(first()).subscribe();
    expect(registerSpy).toHaveBeenCalledWith('register', {
      registrationInfo: {
        institutionId: '1',
        registrationFields: {
          lookupFields: [
            { displayName: '', displayOrder: 99, lookupFieldId: 'guestRegistration', type: 4, value: '1' },
            { displayName: '', displayOrder: 99, lookupFieldId: 'guestFirstName', type: 4, value: 'John' },
            { displayName: '', displayOrder: 99, lookupFieldId: 'guestLastName', type: 4, value: 'Doe' },
          ],
        },
      },
    });
  });
});

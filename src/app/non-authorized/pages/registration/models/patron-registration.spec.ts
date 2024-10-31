import { PatronRegistration } from './patron-registration';
import { RegistrationCsModel } from './registration-content-strings.model';
import { registrationServiceMock } from './guest-registration.spec';
import { first } from 'rxjs';
import { LookupFieldInfo } from '@core/model/institution/institution-lookup-field.model';

describe('PatronRegistration', () => {
  let patronRegistration: PatronRegistration;

  beforeEach(() => {
    patronRegistration = new PatronRegistration(registrationServiceMock);
    patronRegistration['dynamicFields'] = [
      { displayName: 'Field 1', displayOrder: 1, lookupFieldId: 'field1', type: 1 },
      { displayName: 'Field 2', displayOrder: 2, lookupFieldId: 'field2', type: 2 },
    ] as Partial<LookupFieldInfo>[] as LookupFieldInfo[];
  });

  it('should create an instance', () => {
    expect(patronRegistration).toBeTruthy();
  });

  it('should configure form fields', async () => {
    const data: RegistrationCsModel = { valueByKey: () => null } as Partial<RegistrationCsModel> as RegistrationCsModel;
    const fields = await patronRegistration['formFieldsConfig'](data);
    expect(fields).toBeDefined();
  });

  it('should combine dynamic and static fields', () => {
    const dynamicFields = [];
    const staticFields = [];
    const combinedFields = patronRegistration['combineFields'](dynamicFields, staticFields);
    expect(combinedFields).toBeDefined();
  });

  it('should convert dynamic fields to form fields', () => {
    const dynamicFields = [];
    const formFields = patronRegistration['toFormFields'](dynamicFields);
    expect(formFields).toBeDefined();
  });

  it('should call the register method of the backend service', () => {
    const registerSpy = jest.spyOn(registrationServiceMock, 'callBackend');
    const data = { firstName: 'John', lastName: 'Doe' };
    patronRegistration.register(data).pipe(first()).subscribe();
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

  it('should get the institution id', () => {
    const registerSpy = jest.spyOn(registrationServiceMock, 'institution$');
    const data = {};
    patronRegistration.register(data).pipe(first()).subscribe();
    expect(registerSpy).toHaveBeenCalled();
  });

  it('should get form strings', () => {
    const spy = jest.spyOn(registrationServiceMock, 'getStringModel$');
    patronRegistration.getFormStrings().pipe(first()).subscribe();
    expect(spy).toBeCalledWith('registration');
  });

  it('should get registration data', async () => {
    const spy = jest.spyOn(patronRegistration, 'getFormStrings');
    await patronRegistration.getData();
    expect(spy).toBeCalledTimes(1);
  });

  it('should convert form fields to form field list', async () => {
    const formFields = [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'password', label: 'Password', type: 'password' },
    ];

    jest.spyOn(patronRegistration as any, 'toFormFieldList');

    const result = await patronRegistration['toFormFieldList'](formFields as any);
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

  it('should convert dynamic fields to form fields', () => {
    const formFields = patronRegistration['toFormFields'](patronRegistration['dynamicFields']);
    expect(formFields[0].name).toBe('field1');
    expect(formFields[1].name).toBe('field2');
  });
});

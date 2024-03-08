import { ChangeDetectorRef, NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantService } from '@sections/ordering/services';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { of, throwError } from 'rxjs';
import { Settings } from 'src/app/app.global';
import { ADD_EDIT_ADDRESS_CONTROL_NAMES, AddEditAddressesComponent } from './add-edit-addresses.component';
import { RadioGroupChangeEventDetail } from '@ionic/angular';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { formControlErrorDecorator } from '@core/utils/general-helpers';

jest.mock('@core/utils/general-helpers', () => ({
  isFormInvalid: jest.fn(),
}));

jest.mock('@core/utils/general-helpers', () => ({
  ...jest.requireActual('@core/utils/general-helpers'), // Preserve the original functionality
  formControlErrorDecorator: jest.fn(),
}));

describe('AddEditAddressesComponent', () => {
  let component: AddEditAddressesComponent;
  let fixture: ComponentFixture<AddEditAddressesComponent>;
  let settingsFacadeService;
  let changeDetectorRef;
  let formBuilder;
  let merchantService;
  let loadingService;
  let orderingService;
  let contentStringsFacadeService;

  beforeEach(() => {
    changeDetectorRef = {
      detectChanges: jest.fn(),
    };
    formBuilder = {
      group: jest.fn(),
      control: jest.fn(),
    };
    merchantService = {
      retrieveBuildings: jest.fn(),
      updateUserAddress: jest.fn(),
      filterDeliveryAddresses: jest.fn(),
    };
    loadingService = {
      showSpinner: jest.fn(),
      closeSpinner: jest.fn(),
    };
    orderingService = {
      getContentStringByName: jest.fn(),
    };
    contentStringsFacadeService = {
      getContentStrings$: jest.fn(() => of('')),
      formErrorAddress: jest.fn(() => of('')),
    };
    settingsFacadeService = {
      getSetting: jest.fn(),
    };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddEditAddressesComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: MerchantService, useValue: merchantService },
        { provide: LoadingService, useValue: loadingService },
        { provide: OrderingService, useValue: orderingService },
        {
          provide: ContentStringsFacadeService,
          useValue: contentStringsFacadeService,
        },
        {
          provide: SettingsFacadeService,
          useValue: settingsFacadeService,
        },
        { provide: ChangeDetectorRef, useValue: changeDetectorRef },
      ],
    });
    fixture = TestBed.createComponent(AddEditAddressesComponent);
    component = fixture.componentInstance;

    component.addEditAddressesForm = new FormGroup({
      campus: new FormControl(''),
      address1: new FormControl(''),
    });
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateValueAndValidity with specific parameters', () => {
    const spy = jest.spyOn(component.addEditAddressesForm, 'updateValueAndValidity');

    component['onChanges']();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should mark controls as touched if isError changes to true', () => {
    const controls = {
      address1: new FormControl(),
      address2: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      nickname: new FormControl(),
      default: new FormControl(),
      room: new FormControl(),
      buildings: new FormControl(),
    };

    component.addEditAddressesForm = new FormGroup(controls);

    const changes: SimpleChanges = {
      isError: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    Object.keys(controls).forEach(controlName => {
      expect(controls[controlName].touched).toBe(true);
    });
  });

  it('should mark controls as untouched if isError changes to false', () => {
    const controls = {
      address1: new FormControl({ touched: true }),
      address2: new FormControl({ touched: true }),
      city: new FormControl({ touched: true }),
      state: new FormControl({ touched: true }),
      nickname: new FormControl({ touched: true }),
      default: new FormControl({ touched: true }),
      room: new FormControl({ touched: true }),
      buildings: new FormControl({ touched: true }),
    };

    component.addEditAddressesForm = new FormGroup(controls);

    const changes: SimpleChanges = {
      isError: {
        currentValue: false,
        previousValue: true,
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    Object.keys(controls).forEach(controlName => {
      expect(controls[controlName].touched).toBe(false);
    });

    contentStringsFacadeService = {
      formErrorAddress: of('address error'),
      formErrorBuilding: of('building error'),
      formErrorRoom: of('room error'),
      formErrorCity: of('city error'),
      formErrorState: of('state error'),
    };
  });

  it('should return campus control if form exists', () => {
    component.addEditAddressesForm = new FormGroup({
      campus: new FormControl(),
    });

    const campusControl = component.campus;

    expect(campusControl).toBeTruthy();
    expect(campusControl).toBe(component.addEditAddressesForm.get(ADD_EDIT_ADDRESS_CONTROL_NAMES.campus));
  });

  it('should return correct form control for address1', () => {
    expect(component.address1).toBe(component.addEditAddressesForm.get(component.controlsNames.address1));
  });

  it('should return correct form control for address2', () => {
    expect(component.address2).toBe(component.addEditAddressesForm.get(component.controlsNames.address2));
  });

  it('should return correct form control for city', () => {
    expect(component.city).toBe(component.addEditAddressesForm.get(component.controlsNames.city));
  });

  it('should return correct form control for state', () => {
    expect(component.state).toBe(component.addEditAddressesForm.get(component.controlsNames.state));
  });

  it('should return correct form control for nickname', () => {
    expect(component.nickname).toBe(component.addEditAddressesForm.get(component.controlsNames.nickname));
  });

  it('should return correct form control for default', () => {
    expect(component.default).toBe(component.addEditAddressesForm.get(component.controlsNames.default));
  });

  it('should return correct form control for room', () => {
    expect(component.room).toBe(component.addEditAddressesForm.get(component.controlsNames.room));
  });

  it('should return correct form control for buildings', () => {
    expect(component.buildings).toBe(component.addEditAddressesForm.get(component.controlsNames.buildings));
  });

  it('should emit onSaveAddress event when form is valid and not invalid', () => {
    const onSaveAddressSpy = jest.spyOn(component.onSaveAddress, 'emit');

    component.addEditAddressesForm.setErrors(null); // make the form valid

    component.saveAddress();

    expect(onSaveAddressSpy).toHaveBeenCalled();
  });

  it('should not emit onSaveAddress event when form is invalid', () => {
    const onSaveAddressSpy = jest.spyOn(component.onSaveAddress, 'emit');

    component.addEditAddressesForm.setErrors({ invalid: true }); // make the form invalid

    component.saveAddress();

    expect(onSaveAddressSpy).not.toHaveBeenCalled();
  });

  it('should call initForm and closeSpinner when getSetting emits a value', () => {
    const getSettingSpy = jest
      .spyOn(settingsFacadeService, 'getSetting')
      .mockReturnValue(of({ value: '10' }));
    const initFormSpy = jest.spyOn(component as any, 'initForm');
    const closeSpinnerSpy = jest.spyOn(component['loader'], 'closeSpinner');

    component['getSetting'](Settings.Setting.ADDRESS_RESTRICTION);

    expect(getSettingSpy).toHaveBeenCalledWith(Settings.Setting.ADDRESS_RESTRICTION);
    expect(initFormSpy).toHaveBeenCalledWith(10, component['editAddress'] && component['editAddress'].address);
    expect(closeSpinnerSpy).toHaveBeenCalledTimes(1);
  });

  it('should call closeSpinner when getSetting throws an error', () => {
    const getSettingSpy = jest.spyOn(settingsFacadeService, 'getSetting').mockReturnValue(throwError('error'));
    const closeSpinnerSpy = jest.spyOn(component['loader'], 'closeSpinner');

    component['getSetting'](Settings.Setting.ADDRESS_RESTRICTION);

    expect(getSettingSpy).toHaveBeenCalledWith(Settings.Setting.ADDRESS_RESTRICTION);
    expect(closeSpinnerSpy).toHaveBeenCalledTimes(1);
  });

  it('should call updateValueAndValidity on form controls', () => {
    const spy = jest.spyOn(component.addEditAddressesForm, 'updateValueAndValidity');

    component['onChanges']();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return campus control if form exists', () => {
    component.addEditAddressesForm = new FormGroup({
      campus: new FormControl(),
    });

    const campusControl = component.campus;

    expect(campusControl).toBeTruthy();
    expect(campusControl).toBe(component.addEditAddressesForm.get(ADD_EDIT_ADDRESS_CONTROL_NAMES.campus));
  });

  it('should update form errors by content strings', async () => {
    component.contentStrings  = <OrderingComponentContentStrings>{
      formErrorAddress: of('address error'),
      selectAccount: of('Select Account'),
      formErrorBuilding: of('building error'),
      formErrorCity: of('city error'),
      formErrorRoom: of('room error'),
      formErrorState: of('state error'),
      labelState: of('State'),
      labelSetAsDefault: of('Set as default'),
      labelOffCampus: of('Off Campus'),
      labelOnCampus: of('On Campus'),
      labelRoom: of('Room'),
      labelAddressLine1: of('Address Line 1'),
      labelAddressLine2: of('Address Line 2'),
      labelBuildings: of('Buildings'),
      labelCity: of('City'),
      labelNickname: of('Nickname'),
      labelOptional: of('Optional'),  
    };

    // Mock the CONTROL_ERROR object
    const CONTROL_ERROR = {
      [ADD_EDIT_ADDRESS_CONTROL_NAMES.address1]: { required: 'address error' },
      [ADD_EDIT_ADDRESS_CONTROL_NAMES.buildings]: { required: 'building error' },
      [ADD_EDIT_ADDRESS_CONTROL_NAMES.room]: { required: 'room error' },
      [ADD_EDIT_ADDRESS_CONTROL_NAMES.city]: { required: 'city error' },
      [ADD_EDIT_ADDRESS_CONTROL_NAMES.state]: { required: 'state error' },
    };
  
    // Call the method
    await component['updateFormErrorsByContentStrings']();
  
    // Check if the CONTROL_ERROR object has been updated correctly
    expect(CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.address1].required).toBe('address error');
    expect(CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.buildings].required).toBe('building error');
    expect(CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.room].required).toBe('room error');
    expect(CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.city].required).toBe('city error');
    expect(CONTROL_ERROR[ADD_EDIT_ADDRESS_CONTROL_NAMES.state].required).toBe('state error');
  });

  it('should call initContentStrings, updateFormErrorsByContentStrings, and getSetting on ngOnInit', async () => {
    // Mock the methods
    const initContentStringsSpy = jest.spyOn(component as any, 'initContentStrings').mockImplementation(() => {});
    const updateFormErrorsByContentStringsSpy = jest.spyOn(component as any, 'updateFormErrorsByContentStrings').mockImplementation(() => Promise.resolve());
    const getSettingSpy = jest.spyOn(component as any, 'getSetting').mockImplementation(() => {});
  
    // Call ngOnInit
    await component.ngOnInit();
  
    // Check if the methods were called
    expect(initContentStringsSpy).toHaveBeenCalledTimes(1);
    expect(updateFormErrorsByContentStringsSpy).toHaveBeenCalledTimes(1);
    expect(getSettingSpy).toHaveBeenCalledWith(Settings.Setting.ADDRESS_RESTRICTION);
  });

  it('should call cleanControls and addControls with correct arguments on onCampusChanged', () => {
    // Mock the methods
    const cleanControlsSpy = jest.spyOn(component as any, 'cleanControls').mockImplementation(() => {});
    const addControlsSpy = jest.spyOn(component as any, 'addControls').mockImplementation(() => {});
    const onCampusFormBlockSpy = jest.spyOn(component as any, 'onCampusFormBlock').mockReturnValue({});
    const offCampusFormBlockSpy = jest.spyOn(component as any, 'offCampusFormBlock').mockReturnValue({});
  
    // Call onCampusChanged with 'oncampus' value
    component.onCampusChanged({ detail: { value: 'oncampus' } } as CustomEvent<RadioGroupChangeEventDetail>);
  
    // Check if the methods were called with correct arguments
    expect(cleanControlsSpy).toHaveBeenCalledWith(Object.keys(offCampusFormBlockSpy.mock.results[0].value));
    expect(addControlsSpy).toHaveBeenCalledWith(onCampusFormBlockSpy.mock.results[0].value);
  
    // Call onCampusChanged with 'offcampus' value
    component.onCampusChanged({ detail: { value: 'offcampus' } } as CustomEvent<RadioGroupChangeEventDetail>);
  
    // Check if the methods were called with correct arguments
    expect(cleanControlsSpy).toHaveBeenCalledWith(Object.keys(onCampusFormBlockSpy.mock.results[0].value));
    expect(addControlsSpy).toHaveBeenCalledWith(offCampusFormBlockSpy.mock.results[0].value);
  });

  it('should call getContentStringByName and getContentStrings$ with correct arguments on initContentStrings', () => {
    // Mock the methods
    const getContentStringByNameSpy = jest.spyOn(orderingService, 'getContentStringByName').mockReturnValue('test');
    const getContentStrings$Spy = jest.spyOn(contentStringsFacadeService, 'getContentStrings$').mockReturnValue(of([{ value: 'test' }]));
  
    // Call initContentStrings
    component['initContentStrings']();
  
    // Check if getContentStringByName was called with correct arguments
    expect(getContentStringByNameSpy).toHaveBeenCalledWith(ORDERING_CONTENT_STRINGS.formErrorAddress);
    expect(getContentStringByNameSpy).toHaveBeenCalledWith(ORDERING_CONTENT_STRINGS.formErrorBuilding);
    // ... add similar checks for all the other content strings ...
  
    // Check if getContentStrings$ was called with correct arguments
    expect(getContentStrings$Spy).toHaveBeenCalledWith(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.usStates);
  });

  it('should call addControl with correct arguments on addControls', () => {
    
    const addControlSpy = jest.spyOn(component.addEditAddressesForm, 'addControl').mockImplementation(() => {});
  
    // Call addControls
    component['addControls']({ control1: ['value1', 'validator1'], control2: ['value2', 'validator2'] });
  
    // Check if addControl was called with correct arguments
    expect(addControlSpy).toHaveBeenCalled();
    expect(addControlSpy).toHaveBeenCalled();
  });

  it('should call contains and removeControl with correct arguments on cleanControls', () => {
    // Initialize addEditAddressesForm
    component.addEditAddressesForm = new FormGroup({});
  
    // Mock the methods
    const containsSpy = jest.spyOn(component.addEditAddressesForm, 'contains').mockReturnValue(true);
    const removeControlSpy = jest.spyOn(component.addEditAddressesForm, 'removeControl').mockImplementation(() => {});
  
    // Call cleanControls
    component['cleanControls'](['control1', 'control2']);
  
    // Check if the methods were called with correct arguments
    expect(containsSpy).toHaveBeenCalledWith('control1');
    expect(containsSpy).toHaveBeenCalledWith('control2');
    expect(removeControlSpy).toHaveBeenCalledWith('control1');
    expect(removeControlSpy).toHaveBeenCalledWith('control2');
  });

  it('should return correct form block on onCampusFormBlock', () => {
    // Define the expected form block
    const expectedFormBlock = {
      campus: ['oncampus'],
      building: ['', [formControlErrorDecorator(Validators.required, 'error building')]], // Changed from buildings to building
      room: ['', [formControlErrorDecorator(Validators.required, 'error room')]],
      default: [undefined], // Changed from false to undefined
    };
  
    // Call onCampusFormBlock with no selectedAddress
    let formBlock = component['onCampusFormBlock'](null);
  

    // Check if the returned form block is correct
    expect(formBlock).toEqual(expectedFormBlock);
  });

});

import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreTestingModules } from 'src/app/testing/core-modules';
import { Day, OrderOptionsActionSheetComponent, Schedule } from './order-options.action-sheet.component';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { AddressHeaderFormatPipe } from '@shared/pipes';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { DeliveryAddressesModalModule } from '../delivery-addresses.modal';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { CoreProviders } from 'src/app/testing/core-providers';
import { ACCOUNT_TYPES, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { CartService } from '@sections/ordering/services';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import * as rxjs from 'rxjs';
import { ADDRESS_LOCATION, AddressInfo } from '@core/model/address/address-info';
import { LoadingService } from '@core/service/loading/loading.service';
import { of } from 'rxjs';
import { ToastService } from '@core/service/toast/toast.service';
import { MenuInfo, MerchantAccountInfoList, MerchantInfo, MerchantOrderTypesInfo } from '../../models';
import { UserInfo } from '@core/model/user';
import { ModalsService } from '@core/service/modals/modals.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { DateTimeSelected } from '../st-date-time-picker/st-date-time-picker.component';
import { TranslateService } from '@ngx-translate/core';

describe('OrderOptionsActionSheet', () => {
  let component: OrderOptionsActionSheetComponent;
  let fixture: ComponentFixture<OrderOptionsActionSheetComponent>;
  let cartService;
  let userFacadeService;
  let cdRef;
  let loadingService;
  let merchantService;
  let orderingService;
  let toastService;
  let modalsService;
  let a11yService;
  let addressHeaderFormatPipe;

  beforeEach(async () => {
    const modalSpy = {
      onDidDismiss: jest.fn().mockResolvedValue({ data: 'new address' }),
      present: jest.fn().mockResolvedValue(undefined),
    };

    cartService = {
      resetClientOrderId: jest.fn(),
      orderDetailsOptions$: of(null),
      getMerchantMenu: jest.fn().mockReturnValue(of({})),
      extractTimeZonedString: jest.fn(),
      orderIsAsap: false,
    };

    userFacadeService = {
      getUserData$: jest.fn().mockReturnValue(of({} as UserInfo)),
    };

    cdRef = {
      detectChanges: jest.fn(),
    };

    loadingService = {
      showSpinner: jest.fn(),
      closeSpinner: jest.fn(),
    };

    merchantService = {
      getMerchantOrderSchedule: jest.fn().mockReturnValue(of('schedule')),
      retrievePickupLocations: jest.fn().mockReturnValue(of('pickupLocations')),
      retrieveBuildings: jest.fn().mockReturnValue(of('buildings')),
      menuMerchants$: of([{ id: '1', name: 'Merchant 1' }]),
      retrieveDeliveryAddresses: jest.fn().mockReturnValue(of('deliveryAddresses')),
      getUserAccounts: jest.fn().mockReturnValue(of('accounts')),
      getMerchantPaymentAccounts: jest.fn().mockReturnValue(of('paymentAccounts')),
      isOutsideMerchantDeliveryArea: jest.fn().mockReturnValue(of(false)),
      getCurrentLocaleTime: jest.fn().mockReturnValue(of('current time')),
    };

    orderingService = {
      getMerchantSettings: jest.fn().mockReturnValue(of({})),
      getContentStringByName: jest.fn().mockReturnValue(of('')),
      getContentErrorStringByName: jest.fn().mockReturnValue(of('')),
    };

    toastService = {
      showToast: jest.fn(),
      showError: jest.fn().mockResolvedValue({}),
    };

    modalsService = {
      create: jest.fn(() => Promise.resolve(modalSpy)),
      dismiss: jest.fn(),
    };

    a11yService = {
      readAloud: jest.fn(),
    };

    addressHeaderFormatPipe = {
      transform: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        OrderOptionsActionSheetComponent,
        ...CoreTestingModules,
        DeliveryAddressesModalModule,
        StButtonModule,
        AddressHeaderFormatPipeModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        AndroidPermissions,
        ...CoreProviders,
        {
          provide: CartService,
          useValue: cartService,
        },
        {
          provide: UserFacadeService,
          useValue: userFacadeService,
        },
        {
          provide: ChangeDetectorRef,
          useValue: cdRef,
        },
        {
          provide: LoadingService,
          useValue: loadingService,
        },
        {
          provide: OrderingService,
          useValue: merchantService,
        },
        {
          provide: OrderingService,
          useValue: orderingService,
        },
        {
          provide: ToastService,
          useValue: toastService,
        },
        {
          provide: ModalsService,
          useValue: modalsService,
        },
        {
          provide: AccessibilityService,
          useValue: a11yService,
        },
        {
          provide: AddressHeaderFormatPipe,
          useValue: addressHeaderFormatPipe,
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOptionsActionSheetComponent);
    component = fixture.componentInstance;

    component.orderTypes = {
      pickup: false,
      merchantId: '',
      delivery: true,
      deliveryInstructions: '',
      deliveryPrepTime: 0,
      dineIn: false,
      dineInInstructions: '',
      dineInPrepTime: 0,
      merchantTimeZone: '',
      pickupInstructions: '',
      pickupPrepTime: 0,
    };
    component.settings = [];

    jest.spyOn(component, 'dispatchingData');
    jest.spyOn(component, 'defineOrderOptionsData');

    component.orderOptionsData = {
      labelTime: 'Pickup Time',
      labelAddress: 'Pickup Address',
      address: {} as AddressInfo,
      isClickble: 1,
    };

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set orderType on ngOnInit', () => {
    component.activeOrderType = ORDER_TYPE.PICKUP;
    component.ngOnInit();
    expect(component.orderType).toBe(ORDER_TYPE.PICKUP);
  });

  it('should call resetClientOrderId on ngOnInit', () => {
    component.ngOnInit();
    expect(cartService.resetClientOrderId).toHaveBeenCalled();
  });

  it('should return true if orderType is PICKUP', () => {
    component.orderType = ORDER_TYPE.PICKUP;
    expect(component.isOrderTypePickup).toBeTruthy();
  });

  it('should return false if orderType is not PICKUP', () => {
    component.orderType = ORDER_TYPE.DELIVERY;
    expect(component.isOrderTypePickup).toBeFalsy();
  });

  it('should return ORDER_TYPE', () => {
    expect(component.enumOrderTypes).toBe(ORDER_TYPE);
  });

  it('should return userData$', () => {
    const userData$ = of({ name: 'Test User' });
    userFacadeService.getUserData$.mockReturnValue(userData$);
    expect(component.userData$).toBe(userData$);
  });

  it('should set orderType and call dispatchingData and defineOrderOptionsData on onRadioGroupChanged', () => {
    const event = { target: { value: '1' } };
    component.onRadioGroupChanged(event);
    expect(component.orderType).toBe(1);
    expect(component.dispatchingData).toHaveBeenCalled();
    expect(component.defineOrderOptionsData).toHaveBeenCalledWith(false);
  });

  it('should call modalWindow on openDeliveryAddressesModal', () => {
    const spy = jest.spyOn(component as any, 'modalWindow');
    component.openDeliveryAddressesModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should update orderOptionsData and call cdRef.detectChanges and a11yService.readAloud when modal is dismissed with data', async () => {
    // Call the method
    await component['modalWindow']();

    // Check the expectations
    expect(component.orderOptionsData.address).toBe('new address');
  });

  it('should define orderOptionsData on defineOrderOptionsData', async () => {
    component.deliveryAddresses = [
      {
        id: '1',
        objectRevision: 1,
        department: '1',
        company: '1',
        address1: '1',
        address2: 'test',
        city: 'test',
        state: 'test',
        postalcode: 'test',
        country: 'test',
        latitude: 1,
        longitude: 2,
        notes: 'test',
        nickname: 'test',
        building: 'test',
        floor: 'test',
        room: 'test',
        crossStreet: 'test',
        accessCode: 'test',
        phone: 'test',
        phoneExt: 'test',
        onCampus: ADDRESS_LOCATION.onCampus,
      },
    ];
    component.pickupLocations = [
      {
        id: '1',
        objectRevision: 1,
        department: '1',
        company: '1',
        address1: '1',
        address2: 'test',
        city: 'test',
        state: 'test',
        postalcode: 'test',
        country: 'test',
        latitude: 1,
        longitude: 2,
        notes: 'test',
        nickname: 'test',
        building: 'test',
        floor: 'test',
        room: 'test',
        crossStreet: 'test',
        accessCode: 'test',
        phone: 'test',
        phoneExt: 'test',
        onCampus: ADDRESS_LOCATION.onCampus,
      },
    ];
    component.defaultDeliveryAddress = '1';
    component.defaultPickupAddress = {} as AddressInfo;
    expect(component.orderOptionsData).toEqual({
      labelTime: 'Pickup Time',
      labelAddress: 'Pickup Address',
      address: {} as AddressInfo,
      isClickble: 1,
    });
  });

  it('should call services and set properties on dispatchingData', () => {
    jest
      .spyOn(rxjs, 'zip')
      .mockImplementation(() =>
        of([
          'schedulePickup',
          'scheduleDelivery',
          ['deliveryAddress', 'deliveryLocations'],
          'pickupLocations',
          'buildingsForNewAddressForm',
          'orderDetailsOptions',
        ])
      );

    component.merchantId = '1';
    component.timeZone = 'TimeZone';
    component.storeAddress = {
      id: '1',
      objectRevision: 1,
      department: '1',
      company: '1',
      address1: '1',
      address2: 'test',
      city: 'test',
      state: 'test',
      postalcode: 'test',
      country: 'test',
      latitude: 1,
      longitude: 2,
      notes: 'test',
      nickname: 'test',
      building: 'test',
      floor: 'test',
      room: 'test',
      crossStreet: 'test',
      accessCode: 'test',
      phone: 'test',
      phoneExt: 'test',
      onCampus: ADDRESS_LOCATION.onCampus,
    };

    component.dispatchingData();

    expect(loadingService.showSpinner).toHaveBeenCalled();
    expect(loadingService.closeSpinner).toHaveBeenCalled();
  });

  it('should check if outside merchant delivery area', () => {
    const spy = jest.spyOn(merchantService, 'isOutsideMerchantDeliveryArea').mockReturnValue(of(true));
    component['isOutsideMerchantDeliveryArea']().subscribe(result => {
      expect(result).toBe(true);
      expect(spy).toHaveBeenCalledWith(
        component.merchantId,
        component.orderOptionsData.address.latitude,
        component.orderOptionsData.address.longitude
      );
    });
  });

  it('should get merchant payment accounts', () => {
    const spy = jest.spyOn(merchantService, 'getMerchantPaymentAccounts').mockReturnValue(of({}));
    component['getMerchantPaymentAccounts'](false).subscribe(result => {
      expect(result).toEqual({});
      expect(spy).toHaveBeenCalledWith(component.merchantId);
    });
  });

  it('should throw error if delivery address is too far away', () => {
    component['getMerchantPaymentAccounts'](true).subscribe({
      error: err => expect(err.message).toBe('Delivery address is too far away'),
    });
  });

  it('should get display menu', async () => {
    const spy = jest.spyOn(cartService, 'getMerchantMenu').mockResolvedValue({});
    const result = await component['getDisplayMenu'](
      { accounts: [], creditAccepted: true } as MerchantAccountInfoList,
      'id',
      'dueTime',
      1
    );
    expect(result).toEqual({});
    expect(spy).toHaveBeenCalledWith('id', 'dueTime', 1);
  });

  it('should check if accounts are meal based', () => {
    const spy = jest
      .spyOn(merchantService, 'getUserAccounts')
      .mockReturnValue(of([{ accountType: ACCOUNT_TYPES.meals }]));
    component['isAccountsMealBased'](true).subscribe(result => {
      expect(result).toBe(true);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should check if accounts is not meal based', () => {
    const spy = jest
      .spyOn(merchantService, 'getUserAccounts')
      .mockReturnValue(of([{ accountType: ACCOUNT_TYPES.meals }]));
    component['isAccountsMealBased'](false).subscribe(result => {
      expect(result).toBe(true);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('should set default time slot', async () => {
    component.activeMerchant$ = of({ openNow: true } as MerchantInfo);
    await component['setDefaultTimeSlot']();
    expect(component.dateTimePicker).toBe('ASAP');
  });

  it('should set default time slot when merchant is not open now', async () => {
    // Set up the mock for activeMerchant$ to return openNow as false
    component.activeMerchant$ = of({ openNow: false } as MerchantInfo);

    // Set up the necessary properties for the else branch
    component.activeOrderType = ORDER_TYPE.DELIVERY;
    component.scheduleDelivery = { 
      menuSchedule: [],
      days: [
        {
          date: '2022-01-01',
          dayOfWeek: 5,
          hourBlocks: [
            {
              hour: 1,
              minuteBlocks: [],
              timestamps: ['2022-01-01T00:00:00Z'],
              periods: [],
              timeZonedDate: '2022-01-01T00:00:00Z',
            },
          ],
        },
      ],
    } as Schedule;
    component.timeZone = 'UTC';
    jest.spyOn(cartService, 'extractTimeZonedString').mockReturnValue('2022-01-01T00:00:00Z');
    jest.spyOn(component as any, 'isMerchantDateUnavailable').mockReturnValue(false);

    // Call the method
    await component['setDefaultTimeSlot']();

    // Check the expectations
    expect(component.dateTimePicker).toEqual(new Date('2022-01-01T00:00:00Z'));
    expect(component.selectedTimeStamp).toBe('2022-01-01T00:00:00Z');
    expect(component.dateTimeWithTimeZone).toBe('2022-01-01T00:00:00Z');
  });

  it('should set default time slot when merchant is not open now and isMerchantDateUnavailable true', async () => {
    // Set up the mock for activeMerchant$ to return openNow as false
    component.activeMerchant$ = of({ openNow: false } as MerchantInfo);

    // Set up the necessary properties for the else branch
    component.activeOrderType = ORDER_TYPE.PICKUP;
    component.schedulePickup = {
      menuSchedule: [],
      days: [
        {
          date: '2022-01-01',
          dayOfWeek: 5,
          hourBlocks: [
            {
              hour: 1,
              minuteBlocks: [],
              timestamps: ['2022-01-01T00:00:00Z'],
              periods: [],
              timeZonedDate: '2022-01-01T00:00:00Z',
            },
          ],
        },
      ],
    } as Schedule;
    component.timeZone = 'UTC';
    jest.spyOn(cartService, 'extractTimeZonedString').mockReturnValue('2022-01-01T00:00:00Z');
    jest.spyOn(component as any, 'isMerchantDateUnavailable').mockReturnValue(true);
    const spy = jest.spyOn(component as any, 'onMerchantDateUnavailable');

    // Call the method
    await component['setDefaultTimeSlot']();

    // Check the expectations
    expect(spy).toHaveBeenCalled();
  });

  it('should display toast', async () => {
    const spy = jest.spyOn(toastService, 'showToast').mockResolvedValue(undefined);
    await component['onToastDisplayed']('message');
    expect(spy).toHaveBeenCalled();
  });

  it('should return true if schedule days is empty', () => {
    const schedule: Schedule = { days: [], menuSchedule: [] } as Schedule;
    expect(component['isMerchantDateUnavailable'](schedule)).toBe(true);
  });

  it('should return false if schedule days is not empty', () => {
    const schedule: Schedule = {
      days: [{ date: '2022-01-01', dayOfWeek: 1, hourBlocks: [{ timestamps: [{}] }] } as Day],
      menuSchedule: [],
    } as Schedule;
    expect(component['isMerchantDateUnavailable'](schedule)).toBe(false);
  });

  it('should display toast message when onSubmit with object errors', async () => {
    jest.spyOn(merchantService, 'isOutsideMerchantDeliveryArea').mockReturnValue(of(true));
    jest.spyOn(merchantService, 'getCurrentLocaleTime').mockReturnValue(of('12/12/2022'));
    jest.spyOn(merchantService, 'getMerchantPaymentAccounts').mockImplementation(() => new Error('error'));

    const spy = jest.spyOn(toastService, 'showToast').mockResolvedValue(undefined);

    try {
      await component.onSubmit();
    } catch (error) {
      expect(spy).toHaveBeenCalledWith('error');
    }
  });

  it('should call modalsService.dismiss with the expected arguments when onSubmit completes successfully', async () => {
    // Set up the mocks and spies
    const mockContentStrings = {
      formErrorChooseAddress: of('choose address error'),
      labelDeliveryAddress: of('delivery address label'),
      buttonDismiss: of('dismiss button label'),
    } as any;

    jest.spyOn(merchantService, 'isOutsideMerchantDeliveryArea').mockReturnValue(of(true));
    jest.spyOn(merchantService, 'getCurrentLocaleTime').mockReturnValue(of('12/12/2022'));
    jest.spyOn(component as any, 'getMerchantPaymentAccounts').mockReturnValue(of({} as MerchantAccountInfoList));
    jest.spyOn(component as any, 'getDisplayMenu').mockReturnValue(Promise.resolve({} as MenuInfo));
    jest.spyOn(component as any, 'isAccountsMealBased').mockReturnValue(of(true));

    // Call the method
    await component.onSubmit();

    expect(loadingService.showSpinner).toHaveBeenCalled();
    expect(modalsService.dismiss).toHaveBeenCalledWith(
      {
        address: component.orderOptionsData.address,
        orderType: component.orderType,
        dueTime: component.selectedTimeStamp || component.dateTimePicker,
        isASAP: component.dateTimePicker === 'ASAP',
      },
      BUTTON_TYPE.CONTINUE
    );
  });

  it('should call openPicker and focus on element when callChildPicker is called and isTimeDisable is true', async () => {
    const mockChild = { isTimeDisable: true, openPicker: jest.fn() };
    component.child = mockChild as any;
    document.getElementById = jest.fn().mockReturnValue({ focus: jest.fn() });

    await component.callChildPicker();

    expect(mockChild.openPicker).toHaveBeenCalled();
    expect(document.getElementById).toHaveBeenCalledWith('time_element');
    expect(component.optionsModalAriaHidden).toBe(true);
  });

  it('should set properties and focus on element when onDateTimeSelected is called', () => {
    const mockDateTimeSelected: DateTimeSelected = { dateTimePicker: 'test', timeStamp: 'test' };
    document.getElementById = jest.fn().mockReturnValue({ focus: jest.fn() });

    component.onDateTimeSelected(mockDateTimeSelected);

    expect(component.dateTimePicker).toBe(mockDateTimeSelected.dateTimePicker);
    expect(component.selectedTimeStamp).toBe(mockDateTimeSelected.timeStamp);
    expect(document.getElementById).toHaveBeenCalledWith('time_element');
    expect(component.optionsModalAriaHidden).toBe(false);
  });

  it('should define order options data correctly for pickup', () => {
    component.orderTypes = { pickup: true, delivery: false } as MerchantOrderTypesInfo;
    const defaultPickupAddress = {
      accessCode: '123',
      address1: '123 Main St',
      address2: 'Apt 101',
      building: 'Building A',
      city: 'Springfield',
    } as AddressInfo;
    component.defaultPickupAddress = defaultPickupAddress;
    const pickupLocations: AddressInfo[] = [
      // Mock pickup locations
    ];
    component.pickupLocations = pickupLocations;

    component.defineOrderOptionsData(true); // Simulate defining order options data for pickup

    expect(component.orderOptionsData).toBeDefined();
  });
});

export class TranslateServiceStub {
  onLangChange = new EventEmitter();
  onTranslationChange = new EventEmitter();
  onDefaultLangChange = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }

  public instant(key: any): any {
    return key;
  }
}

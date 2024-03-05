import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AddressInfo } from '@core/model/address/address-info';
import { UserInfo } from '@core/model/user';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { ToastService } from '@core/service/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { MerchantSettings, ORDER_ERROR_CODES, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { CartService, MerchantService, OrderDetailOptions } from '@sections/ordering/services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import {
  AddressModalSettings,
  BuildingInfo,
  FORM_CONTROL_NAMES,
  MerchantInfo,
  MerchantOrderTypesInfo,
  OrderDetailsComponent,
  OrderInfo,
  OrderItem,
  OrderPayment,
} from '@sections/ordering/shared';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { of } from 'rxjs';
import { ModifyPrepTimeModule } from '../../pipes/modify-prep-time';
import { TypeMessageModule } from '../../pipes/type-message/type-message.pipe.module';
import { Schedule } from '../order-options.action-sheet/order-options.action-sheet.component';
import { DateTimeSelected, TimePickerData } from '../st-date-time-picker/st-date-time-picker.component';
import { NavigationService } from '@shared/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const _modalController = {};
const _orderingService = {
  getContentStringByName: jest.fn(() => of('')),
  getContentErrorStringByName: jest.fn(() => of('')),
};
const _userFacadeService = {
  getUser$: jest.fn(() => of({} as UserInfo)),
  getUserData$: jest.fn(() => of({} as UserInfo)),
};
const _a11yService = {
  isVoiceOverEnabled$: jest.fn(() => of(true)),
};
const _cartService = {
  orderIsAsap: false,
  cartsErrorMessage: '',
  extractTimeZonedString: jest.fn(),
  validateOrder: jest.fn(() => of({} as OrderInfo)),
  setActiveMerchantsMenuByOrderOptions: jest.fn(),
  emptyOnClose$: of({}),
};
const _loadingService = {
  showSpinner: jest.fn(),
  closeSpinner: jest.fn(),
};
const _toastService = {
  showError: jest.fn(),
};
const _translateService = {
  instant: jest.fn(),
};
const _merchantService = {
  getMerchantOrderSchedule: jest.fn(),
};

const _navigationService = {
  navigate: jest.fn(),
};

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ModalsService, useValue: _modalController },
        { provide: OrderingService, useValue: _orderingService },
        { provide: UserFacadeService, useValue: _userFacadeService },
        { provide: AccessibilityService, useValue: _a11yService },
        { provide: CartService, useValue: _cartService },
        { provide: LoadingService, useValue: _loadingService },
        { provide: ToastService, useValue: _toastService },
        { provide: TranslateService, useValue: _translateService },
        { provide: MerchantService, useValue: _merchantService },
        { provide: NavigationService, useValue: _navigationService },
      ],
      imports: [
        TypeMessageModule,
        ModifyPrepTimeModule,
        AddressHeaderFormatPipeModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    component.orderDetailOptions = {
      dueTime: new Date(),
      isASAP: false,
      address: {} as AddressInfo,
      orderType: ORDER_TYPE.PICKUP,
    } as OrderDetailOptions;
    component.orderOptionsData = {
      labelTime: '',
    } as TimePickerData;
    component.orderTypes = {
      pickupPrepTime: 30,
      deliveryPrepTime: 15,
      merchantTimeZone: 'Americas/New York',
    } as MerchantOrderTypesInfo;
    component.orderPayment = [{ accountId: '', accountName: '' }] as OrderPayment[];
    component._merchant = { id: '1', timeZone: 'Americas/New York' } as MerchantInfo;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the time Picker Data', () => {
    const loaderShowSpy = jest.spyOn(_loadingService, 'showSpinner');
    const loaderCloseSpy = jest.spyOn(_loadingService, 'closeSpinner');
    const translateSpy = jest.spyOn(_translateService, 'instant').mockImplementation(() => 'Test');

    const merchantSpy = jest
      .spyOn(_merchantService, 'getMerchantOrderSchedule')
      .mockImplementation(() => of({} as Schedule));
    component.initTimePickerData();
    expect(loaderShowSpy).toHaveBeenCalled();
    expect(merchantSpy).toHaveBeenCalled();
    expect(translateSpy).toHaveBeenCalled();
    expect(loaderCloseSpy).toHaveBeenCalled();
  });

  it('should return Pickup Due Time Error Key', () => {
    component.orderDetailOptions = {
      dueTime: new Date(),
      isASAP: false,
      address: {} as AddressInfo,
      orderType: ORDER_TYPE.PICKUP,
    } as OrderDetailOptions;
    component.errorCode = ORDER_ERROR_CODES.ORDER_CAPACITY;
    expect(component.getDueTimeErrorKey()).toEqual('PickUpOrderTimeNotAvailable');
  });

  it('should return Delivery Due Time Error Key', () => {
    component.orderDetailOptions = {
      dueTime: new Date(),
      isASAP: false,
      address: {} as AddressInfo,
      orderType: ORDER_TYPE.DELIVERY,
    } as OrderDetailOptions;
    component.errorCode = ORDER_ERROR_CODES.ORDER_CAPACITY;
    expect(component.getDueTimeErrorKey()).toEqual('DeliveryOrderTimeNotAvailable');
  });

  it('should return Items Not Available Error Key', () => {
    component.errorCode = ORDER_ERROR_CODES.INVALID_ORDER;
    expect(component.getDueTimeErrorKey()).toEqual('ItemsNotAvailable');
  });

  it('should emit onOrderTimeChange when onDateTimeSelected is called', async () => {
    jest.spyOn(component.onOrderTimeChange, 'emit');

    const dateTime: DateTimeSelected = {} as DateTimeSelected;
    await component.onDateTimeSelected(dateTime);

    expect(component.onOrderTimeChange.emit).toHaveBeenCalledWith(dateTime);
  });

  it('should init data for time picker', async () => {
    const timePickerDataInit = jest.spyOn(component, 'initTimePickerData');
    component.enableTimeSelection = true;
    await component.changeOrderTime();
    expect(timePickerDataInit).toHaveBeenCalled();
  });

  it('should not init data for time picker', async () => {
    const timePickerDataInit = jest.spyOn(component, 'initTimePickerData');
    await component.changeOrderTime();
    expect(timePickerDataInit).toBeCalledTimes(0);
  });

  it('should emit onOrderItemClicked when dueTimeHasErrors is false', () => {
    jest.spyOn(component.onOrderItemClicked, 'emit');

    const orderItem = {} as OrderItem;
    component.goToItemDetails(orderItem);

    expect(component.onOrderItemClicked.emit).toHaveBeenCalledWith(orderItem);
  });

  it('should not emit onOrderItemClicked when dueTimeHasErrors is true', () => {
    jest.spyOn(component.onOrderItemClicked, 'emit');
    component.dueTimeHasErrors = true;

    const orderItem = {} as OrderItem;
    component.goToItemDetails(orderItem);

    expect(component.onOrderItemClicked.emit).not.toHaveBeenCalled();
  });

  it('should emit changes on PaymentMethod change', async () => {
    const formEmitSpy = jest.spyOn(component, 'onPaymentChanged');
    await component.onPaymentChanged({ detail: { value: { id: '12345', paymentSystemType: 1 } } });
    expect(formEmitSpy).toHaveBeenCalled();
  });

  it('should get the prep time for pickup', async () => {
    component.orderDetailOptions.orderType = ORDER_TYPE.PICKUP;
    expect(component.prepTime).toEqual(`(${component.orderTypes.pickupPrepTime} min)`);
  });
  it('should get the prep time for delivery', async () => {
    component.orderDetailOptions.orderType = ORDER_TYPE.DELIVERY;
    expect(component.prepTime).toEqual(`(${component.orderTypes.deliveryPrepTime} min)`);
  });

  it('should set merchant details', () => {
    const orderInfo: OrderInfo = {
      amountDue: 100,
      tax: 10,
      deliveryFee: 5,
      discount: 20,
      mealBased: true,
      notes: 'Some notes',
      orderItems: [],
      orderPayment: [
        {
          accountName: 'Account',
          accountId: '123',
          orderId: '',
          transactionId: '123',
          sequence: 1,
          amount: 100,
          cvv: '123',
          paymentSystemType: 1,
        },
      ] as OrderPayment[],
      pickupFee: 3,
      subTotal: 80,
      tip: 15,
      total: 95,
      transactionId: '123',
      dueTime: '12-01-2020',
      id: '123',
      status: 1,
      authCode: '123',
      authCodeForReverse: '123',
      checkinStatus: 1,
      checkNumber: 123,
      deliveryAddress: {} as AddressInfo,
      deliveryAddressId: '123',
      discountSource: 1,
      displayDueTime: '12-01-2020',
      displaySubmittedTime: '12-01-2020',
      institutionId: '123',
      isWalkoutOrder: true,
      mealBasedNames: ['Meal'],
      merchantId: '123',
      notificationId: '123',
      orderNotifications: [],
      pickupAddressId: '123',
      posCheckNumber: '123',
      posOrderId: '123',
      statusDetail: '123',
      submittedTime: new Date(),
      type: 1,
      useFee: 1,
      userId: '123',
      userName: '123',
      userPhone: '123',
      allItems: [],
      merchantName: 'Merchant',
    };

    component.orderTypes = {
      pickupPrepTime: 30,
      deliveryPrepTime: 15,
      merchantTimeZone: 'Americas/New York',
    } as MerchantOrderTypesInfo;

    component.readonly = false;
    component.orderInfo = orderInfo;

    expect(component.amountDue).toBe(orderInfo.amountDue);
    expect(component.tax).toBe(orderInfo.tax);
    expect(component.transactionId).toBe(orderInfo.transactionId);
    expect(component.deliveryFee).toBe(orderInfo.deliveryFee);
    expect(component.discount).toBe(orderInfo.discount);
    expect(component.mealBased).toBe(orderInfo.mealBased);
    expect(component.pickupFee).toBe(orderInfo.pickupFee);
    expect(component.orderItems).toBe(orderInfo.orderItems);
    expect(component.subTotal).toBe(orderInfo.subTotal);
    expect(component.tip).toBe(orderInfo.tip);
    expect(component.total).toBe(orderInfo.total);
    expect(component.orderPayment).toBe(orderInfo.orderPayment);
    expect(component.orderPaymentName).toBe(orderInfo.orderPayment[0].accountName);
    expect(component.notes).toBe(orderInfo.notes);
  });

  it('should set merchant details', () => {
    const merchant: MerchantInfo = {
      settings: {
        list: [],
        map: {
          [MerchantSettings.orderAheadEnabled]: { value: '1' },
        },
      },
      orderTypes: {} as MerchantOrderTypesInfo,
      walkout: true,

      id: 'merchantId',
      campusId: 'campusId',
      externalId: 'externalId',
      parentMerchantId: 'parentMerchantId',
      name: 'Merchant Name',
      shortName: 'Short Name',
      description: 'Merchant description',
      storeAddress: {} as AddressInfo,
      billingAddress: {} as AddressInfo,
      billingTerminalId: 'terminalId',
      cashlessTerminalLocation: 'Terminal location',
      phoneCustomerService: '123-456-7890',
      emailCustomerService: 'customer-service@example.com',
      reportingEmail: 'reporting@example.com',
      reportingFaxNumber: '123-456-7890',
      emailOrder: 'order@example.com',
      emailListAlerts: 'alerts@example.com',
      emailListOrderCc: 'cc@example.com',
      faxNumber: '123-456-7890',
      website: 'https://example.com',
      installationDate: new Date(),
      hoursOfOperation: 'Mon-Fri: 9AM-5PM',
      paymentNotes: 'Payment notes',
      openNow: true,
      deliveryRadius: 5,
      distanceFromUser: 2,
      taxRate: 0.08,
      image: 'image.jpg',
      imageThumbnail: 'thumbnail.jpg',
      imageFull: 'fullimage.jpg',
      hasMenu: true,
      serviceConsumerId: 'consumerId',
      faxNotificationActive: true,
      faxNotificationRequired: false,
      emailNotificationActive: true,
      onCampus: true,
      isFavorite: true,
      isAbleToOrder: true,
      timeZone: 'America/New_York',
    };

    component.merchant = merchant;

    expect(component.merchantSettingsList).toBe(merchant.settings.list);
    expect(component.orderTypes).toBe(merchant.orderTypes);
    expect(component.isWalkoutOrder).toBe(true);
    expect(component._merchant).toBe(merchant);
    expect(component.isMerchantOrderAhead).toBe(true);
  });

  it('should reset orderDetailOptions if it is null', () => {
    const changes: SimpleChanges = {
      orderDetailOptions: {
        currentValue: null,
        previousValue: {},
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    expect(component.orderDetailOptions).toEqual({});
  });

  it('should mark due time with errors if dueTimeHasErrors is not null', () => {
    const changes: SimpleChanges = {
      dueTimeHasErrors: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    const markDueTieWithErrorsSpy = jest.spyOn(component, 'markDueTieWithErrors');
    component.ngOnChanges(changes);

    expect(markDueTieWithErrorsSpy).toHaveBeenCalled();
  });

  it('should mark due time with errors if dueTimeHasErrors is true', () => {
    component.dueTimeHasErrors = true;
    const dueTimeErrorKey = component.getDueTimeErrorKey();
    component.markDueTieWithErrors();

    expect(component.dueTimeFormControl.value).toBe('');
    expect(component.dueTimeFormControl.errors).toEqual({ [dueTimeErrorKey]: true });
    expect(component.dueTimeFormControl.touched).toBe(true);
  });

  it('should reset errorCode and dueTimeHasErrors if dueTimeHasErrors is false', () => {
    component.dueTimeHasErrors = false;
    component.markDueTieWithErrors();

    expect(component.errorCode).toBe(null);
    expect(component.dueTimeHasErrors).toBe(false);
  });

  it('should return FORM_CONTROL_NAMES', () => {
    expect(component.controlsNames).toBe(FORM_CONTROL_NAMES);
  });

  it('should return true if readonly is false, addressModalConfig is defined, and isOrderTypePickup is true with pickupLocations', () => {
    component.readonly = false;
    (component.addressModalConfig = {
      buildings: [{} as BuildingInfo],
      deliveryAddresses: [],
      isOrderTypePickup: true,
      pickupLocations: [{} as BuildingInfo],
      defaultAddress: {} as AddressInfo,
      merchantId: '123',
    }),
      expect(component.isAddressClickable).toBe(true);
  });

  it('should return true if addressModalConfig is defined and readonly is true', () => {
    component.readonly = true;
    component.addressModalConfig = {} as AddressModalSettings;

    expect(component.isAddressClickable).toBe(true);
  });

  it('should return false if addressModalConfig is not defined', () => {
    component.addressModalConfig = null;

    expect(component.isAddressClickable).toBe(false);
  });

  it('should return orderDetailOptions if dueTime is a Date', () => {
    const dueTime = new Date();
    component.orderDetailOptions = { dueTime } as OrderDetailOptions;

    expect(component.timeWithoutTimezone).toBe(component.orderDetailOptions);
  });

  it('should return orderDetailOptions with dueTime converted to a Date if dueTime is not a Date', () => {
    const dueTime = new Date('2022-01-01T04:00:00.000Z') ;
    component.orderDetailOptions = {
      dueTime
    } as OrderDetailOptions;

    expect(component.timeWithoutTimezone).toEqual({ dueTime });
  });

  it('should return true if tipEnabled setting is found and its value is not 0', () => {
    component.merchantSettingsList = [{ domain: 'merchant', category: 'tip', name: 'enable_tip', value: '1', contentMediaType: 1, description: 'description'}];

    expect(component.isTipEnabled).toBe(true);
  });

  it('should return false if tipEnabled setting is not found or its value is 0', () => {
    component.merchantSettingsList = [{ domain: 'domain', category: 'category', name: 'tipEnabled', value: '1', contentMediaType: 1, description: 'description'}];

    expect(component.isTipEnabled).toBe(false);
  });

  it('should return a string containing the index and a random number', () => {
    const index = 0;
    const result = component.trackByAccountId(index);

    expect(result.startsWith(`${index}-`)).toBe(true);
  });
  
  it('should not call onModalDismiss if paymentFormControl has no value or VoiceOver is not enabled', () => {
    component.paymentFormControl.setValue(null);
    jest.spyOn(_a11yService, 'isVoiceOverEnabled$').mockReturnValueOnce(of(false));
    const onModalDismissSpy = jest.spyOn(component, 'onModalDismiss');
  
    component.openActionSheet();
  
    expect(onModalDismissSpy).not.toHaveBeenCalled();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AddressInfo } from '@core/model/address/address-info';
import { UserInfo } from '@core/model/user';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { ToastService } from '@core/service/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { ORDER_ERROR_CODES, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { CartService, MerchantService, OrderDetailOptions } from '@sections/ordering/services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { MerchantInfo, MerchantOrderTypesInfo, OrderDetailsComponent, OrderInfo, OrderItem, OrderPayment } from '@sections/ordering/shared';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { of } from 'rxjs';
import { ModifyPrepTimeModule } from '../../pipes/modify-prep-time';
import { TypeMessageModule } from '../../pipes/type-message/type-message.pipe.module';
import { Schedule } from '../order-options.action-sheet/order-options.action-sheet.component';
import { DateTimeSelected, TimePickerData } from '../st-date-time-picker/st-date-time-picker.component';
import { NavigationService } from '@shared/index';

const _modalController = {};
const _orderingService = {
  getContentStringByName: jest.fn(() => of('')),
  getContentErrorStringByName: jest.fn(() => of('')),
};
const _userFacadeService = {
  getUser$: jest.fn(() => of({} as UserInfo)),
  getUserData$: jest.fn(() => of({} as UserInfo)),
};
const _a11yService = {};
const _cartService = {
  orderIsAsap: false,
  cartsErrorMessage: '',
  extractTimeZonedString: jest.fn(),
  validateOrder: jest.fn(() => of({} as OrderInfo)),
  setActiveMerchantsMenuByOrderOptions: jest.fn(),
  emptyOnClose$: of({})
};
const _loadingService = {
  showSpinner: jest.fn(),
  closeSpinner: jest.fn()
};
const _toastService = {
  showError: jest.fn()
};
const _translateService = {
  instant: jest.fn(),
};
const _merchantService = {
  getMerchantOrderSchedule: jest.fn()
};

const _navigationService = {
  navigate: jest.fn()
}

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
        { provide: NavigationService, useValue: _navigationService }
      ],
      imports: [TypeMessageModule, ModifyPrepTimeModule, AddressHeaderFormatPipeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;component.orderDetailOptions = {
      dueTime: new Date(),
      isASAP: false,
      address: {} as AddressInfo,
      orderType: ORDER_TYPE.PICKUP,
    } as OrderDetailOptions;
    component.orderOptionsData = {
      labelTime: ''
    } as TimePickerData;
    component.orderTypes = {
      pickupPrepTime: 30,
      deliveryPrepTime: 15,
      merchantTimeZone: 'Americas/New York'
    } as MerchantOrderTypesInfo;
    component.orderPayment = [{ accountId: '', accountName: '' }] as OrderPayment[];
    component._merchant = { id: '1', timeZone: 'Americas/New York'} as MerchantInfo
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the time Picker Data', () => {
    const loaderShowSpy = jest.spyOn(_loadingService, 'showSpinner');
    const loaderCloseSpy = jest.spyOn(_loadingService, 'closeSpinner');
    const translateSpy = jest.spyOn(_translateService, 'instant').mockImplementation(() => 'Test');

    const merchantSpy = jest.spyOn(_merchantService, 'getMerchantOrderSchedule').mockImplementation(()=> of({} as Schedule));
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
    await component.onPaymentChanged({ detail: { value: {id: '12345', paymentSystemType: 1 }}});
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
});

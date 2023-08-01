import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AddressInfo } from '@core/model/address/address-info';
import { UserInfo } from '@core/model/user';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { ToastService } from '@core/service/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { CartService, MerchantService, OrderDetailOptions } from '@sections/ordering/services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { MerchantInfo, MerchantOrderTypesInfo, OrderDetailsComponent, OrderInfo, OrderPayment } from '@sections/ordering/shared';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { of } from 'rxjs';
import { ModifyPrepTimeModule } from '../../pipes/modify-prep-time';
import { TypeMessageModule } from '../../pipes/type-message/type-message.pipe.module';
import { Schedule } from '../order-options.action-sheet/order-options.action-sheet.component';
import { DateTimeSelected, TimePickerData } from '../st-date-time-picker/st-date-time-picker.component';

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
  validateOrder: jest.fn(() => of({} as OrderInfo))
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
      ],
      imports: [TypeMessageModule, ModifyPrepTimeModule, AddressHeaderFormatPipeModule],
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
      labelTime: ''
    } as TimePickerData;
    component.orderTypes = {
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

  it('should return  Due Time Error Key', () => {
    expect(component.getDueTimeErrorKey()).toEqual('PickUpOrderTimeNotAvailable');
  });

  it('should validate order when date time selected', async () => {
    const cartServiceSpy = jest.spyOn(_cartService, 'validateOrder').mockReturnValue(of({} as OrderInfo));
    await component.onDateTimeSelected({ dateTimePicker: 'ASAP' } as DateTimeSelected);
    expect(cartServiceSpy).toHaveBeenCalled();
    expect(_cartService.cartsErrorMessage).toBeNull();
  });
});

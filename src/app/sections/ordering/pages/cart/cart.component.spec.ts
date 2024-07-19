import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartService, MerchantService, OrderDetailOptions } from '@sections/ordering/services';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { ConnectionService, LockDownService, NavigationService } from '@shared/services';
import { CheckingProcess } from '@sections/check-in/services/check-in-process-builder';
import { NonCheckingService } from './services/non-checking.service';
import { TranslateService } from '@ngx-translate/core';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { of } from 'rxjs';
import { BuildingInfo, MerchantInfo, MerchantOrderTypesInfo, OrderInfo } from '@sections/ordering/components';
import { MerchantSettings, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { AddressInfo } from '@core/model/address/address-info';
import { FORM_CONTROL_NAMES, OrderDetailsFormData } from '@sections/ordering/shared';
import { UserAccount } from '@core/model/account/account.model';
import { AccountType } from 'src/app/app.global';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { Location } from '@angular/common';
import { AppRateService } from '@shared/services/app-rate/app-rate.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { PAYMENT_TYPE } from '@sections/accounts/accounts.config';

const mockData = {
  data: {
    accounts: [],
  },
};

const _cartService = {
  validateOrder: jest.fn(),
  orderInfo$: of({ type: ORDER_TYPE.PICKUP } as OrderInfo),
  merchant$: of({ id: '1' } as MerchantInfo),
  orderDetailsOptions$: of({} as OrderDetailOptions),
  updateOrderNote: jest.fn(),
  updateOrderPhone: jest.fn(),
  submitOrder: jest.fn(() => of({} as OrderInfo)),
  closeButtonClicked: jest.fn(),
  clearActiveOrder: jest.fn(),
  setTax: jest.fn(),
};

const _merchantService = {
  orderTypes$: of({} as MerchantOrderTypesInfo),
  retrieveBuildings: jest.fn(),
  isOutsideMerchantDeliveryArea: jest.fn(),
  getMerchant: jest.fn(() => of({
    id: '1',
    settings: {
      map: {
        [MerchantSettings.removeTaxCheckout]: { value: '1' }
      }
    }
  })),
};
const _loadingService = {
  showSpinner: jest.fn(),
  closeSpinner: jest.fn(),
};
const _settingsFacadeService = {};
const _activatedRoute = {
  snapshot: {
    data: mockData,
  },
};

const _toastService = {
  showError: jest.fn(),
};
const _popoverController = {
  create: jest.fn().mockReturnValue(Promise.resolve({ onDidDismiss: () => Promise.resolve() })),
};
const _orderingService = {
  getContentStringByName: jest.fn().mockReturnValue(of('')),
  getContentErrorStringByName: jest.fn().mockReturnValue(of('')),
};
const _userFacadeService = {
  isApplePayEnabled$: jest.fn(),
};
const _externalPaymentService = {
  payWithApplePay: jest.fn().mockReturnValue(Promise.resolve({ success: true, amount: '10' })),
};

const _routingService = {};
const _connectionService = {
  networkStatus: jest.fn(() => of(true)),
};
const _checkinProcess = {};
const _nonCheckingService = {};
const _lockDownService = {
  isLockDownOn: jest.fn(),
  loadStringsAndSettings: jest.fn(),
};
const _translateService = {};
const _priceUnitsResolverPipe = {};

const _platform = {
  backButton: {
    subscribeWithPriority: jest.fn(),
  },
};
const _location = {
  back: jest.fn(),
};

const _appRateService = {
  evaluateToRequestRateApp: jest.fn(),
};

const storageStateService = {
  getStateEntityByKey$: jest.fn(),
  updateStateEntity: jest.fn(),
} as any;

const _modalController = {
  create: jest.fn().mockReturnValue({
    present: jest.fn(),
    onDidDismiss: jest.fn().mockReturnValue(Promise.resolve({ data: 'test' })),
    addEventListener: jest.fn(),
    onWillDismiss: jest.fn().mockReturnValue(Promise.resolve({ data: 'test' })),
  }),
};

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: CartService, useValue: _cartService },
        { provide: MerchantService, useValue: _merchantService },
        { provide: LoadingService, useValue: _loadingService },
        { provide: SettingsFacadeService, useValue: _settingsFacadeService },
        { provide: ActivatedRoute, useValue: _activatedRoute },
        { provide: ToastService, useValue: _toastService },
        { provide: PopoverController, useValue: _popoverController },
        { provide: OrderingService, useValue: _orderingService },
        { provide: UserFacadeService, useValue: _userFacadeService },
        { provide: ExternalPaymentService, useValue: _externalPaymentService },
        { provide: NavigationService, useValue: _routingService },
        { provide: ConnectionService, useValue: _connectionService },
        { provide: CheckingProcess, useValue: _checkinProcess },
        { provide: NonCheckingService, useValue: _nonCheckingService },
        { provide: LockDownService, useValue: _lockDownService },
        { provide: TranslateService, useValue: _translateService },
        { provide: PriceUnitsResolverPipe, useValue: _priceUnitsResolverPipe },
        { provide: Platform, useValue: _platform },
        { provide: Location, useValue: _location },
        { provide: AppRateService, useValue: _appRateService },
        { provide: StorageStateService, useValue: storageStateService },
        { provide: ModalController, useValue: _modalController },
      ],
      imports: [PriceUnitsResolverModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit order with no errors', async () => {
    component.orderDetailOptions$ = of({
      address: { latitude: 123, longitude: 123 } as AddressInfo,
    } as OrderDetailOptions);
    component.cartFormState = {
      valid: true,
      data: {
        [FORM_CONTROL_NAMES.address]: { id: '1' } as BuildingInfo,
        [FORM_CONTROL_NAMES.paymentMethod]: { id: '1', accountType: AccountType.CHARGE } as UserAccount,
        [FORM_CONTROL_NAMES.note]: 'my notes',
        [FORM_CONTROL_NAMES.phone]: '1111111111',
      },
    } as OrderDetailsFormData;

    const lockDownSpy = jest.spyOn(_lockDownService, 'isLockDownOn').mockImplementation(() => false);
    const merchantSpy = jest
      .spyOn(_merchantService, 'isOutsideMerchantDeliveryArea')
      .mockImplementation(() => of(true));
    const toastSpy = jest.spyOn(_toastService, 'showError');
    const spinnerSpy = jest.spyOn(_loadingService, 'showSpinner');
    const noteSpy = jest.spyOn(_cartService, 'updateOrderNote');
    const phoneSpy = jest.spyOn(_cartService, 'updateOrderPhone');

    await component.onSubmit();

    expect(lockDownSpy).toHaveBeenCalled();
    expect(merchantSpy).not.toHaveBeenCalled();
    expect(toastSpy).not.toHaveBeenCalled();
    expect(spinnerSpy).toHaveBeenCalled();
    expect(noteSpy).toHaveBeenCalled();
    expect(phoneSpy).toHaveBeenCalled();
  });

  it('should not call location.back() when backButton is pressed and dueTimeHasErrors is true', async () => {
    component.dueTimeHasErrors = true;

    await component.ionViewDidEnter();
    const spyLocation = jest.spyOn(_location, 'back');
    const spySusbcribe = jest.spyOn(_platform.backButton, 'subscribeWithPriority');
    const backButtonCallback = (_platform.backButton.subscribeWithPriority as jest.Mock).mock.calls[0][1];
    backButtonCallback(); // Simulate back button press

    fixture.whenStable().then(() => {
      expect(spySusbcribe).toHaveBeenCalled();
      expect(spyLocation).not.toHaveBeenCalled();
    });
  });

  it('should call location.back() when backButton is pressed and dueTimeHasErrors is false', async () => {
    component.dueTimeHasErrors = false;
    component.ionViewDidEnter();

    const spySubscribe = jest.spyOn(_platform.backButton, 'subscribeWithPriority');
    const spyLocation = jest.spyOn(_location, 'back');

    const backButtonCallback = (_platform.backButton.subscribeWithPriority as jest.Mock).mock.calls[0][1];
    backButtonCallback();

    fixture.whenStable().then(() => {
      expect(spySubscribe).toHaveBeenCalled();
      expect(spyLocation).toHaveBeenCalled();
    });
  });

  it('should update tax based on selection when isRollUp and disableTaxCheckout are true', async () => {
    // Mock necessary data and states
    component.disableTaxCheckout = true;
    component.previousTax = 10;
    component.cartFormState = {
      valid: true,
      data: {
        [FORM_CONTROL_NAMES.paymentMethod]: {
          id: PAYMENT_TYPE.ROLLUP
        } as UserAccount,
      },
    } as any;
    const mockOrder = {
      id: '1',
      tax: 20,
      merchantName: 'Mock Merchant',
      amountDue: 100.0,
      checkNumber: 123,
      checkinStatus: 1,
      posCheckNumber: 'POS-123',
      posOrderId: 'POS-Order-123',
      submittedTime: new Date('2024-07-19T12:00:00Z'),
      displaySubmittedTime: 'July 19, 2024 12:00 PM',
      dueTime: '2024-07-20T12:00:00Z',
      displayDueTime: 'July 20, 2024 12:00 PM',
      userId: 'user-123',
      userPhone: '123-456-7890',
      transactionId: 'trans-123',
      authCode: 'auth-123',
      authCodeForReverse: 'reverse-auth-123',
      notificationId: 'notif-123',
      deliveryFee: 5.0,
      pickupFee: 0.0,
      tip: 10.0,
      useFee: 0.0,
      subTotal: 85.0,
      total: 103.0,
      discount: 0.0,
      discountSource: 0,
      merchantId: 'merchant-123',
      institutionId: 'institution-123',
      type: 1,
      deliveryAddressId: 'addr-123',
      status: 1,
      statusDetail: 'Order received',
      notes: 'No onions, extra ketchup',
      userName: 'John Doe',
      pickupAddressId: 'pickup-addr-123',
      mealBased: false,
      mealBasedNames: [],
      deliveryAddress: {},
      orderItems: [ ],
      orderPayment: [],
      orderNotifications: [],
      allItems: [],
      isWalkoutOrder: false,
    } as OrderInfo;
    component.order$ = of(mockOrder); // Mock order$ observable

    // Spy on methods that are called in updateTaxBasedOnSelection
    const updateTaxAndTotalsSpy = jest.spyOn(component, 'updateTaxAndTotals');


    await component.updateTaxBasedOnSelection();

    expect(updateTaxAndTotalsSpy).toHaveBeenCalledWith(0);
  });

  it('should update tax based on selection when not isRollUp and disableTaxCheckout are false', async () => {
    // Mock necessary data and states
    component.disableTaxCheckout = false;
    component.previousTax = 10;
    component.cartFormState = {
      valid: true,
      data: {
        [FORM_CONTROL_NAMES.paymentMethod]: {
          id: PAYMENT_TYPE.CREDIT
        } as UserAccount,
      },
    } as any;
    const mockOrder = {
      id: '1',
      tax: 20,
      merchantName: 'Mock Merchant',
      amountDue: 100.0,
      checkNumber: 123,
      checkinStatus: 1,
      posCheckNumber: 'POS-123',
      posOrderId: 'POS-Order-123',
      submittedTime: new Date('2024-07-19T12:00:00Z'),
      displaySubmittedTime: 'July 19, 2024 12:00 PM',
      dueTime: '2024-07-20T12:00:00Z',
      displayDueTime: 'July 20, 2024 12:00 PM',
      userId: 'user-123',
      userPhone: '123-456-7890',
      transactionId: 'trans-123',
      authCode: 'auth-123',
      authCodeForReverse: 'reverse-auth-123',
      notificationId: 'notif-123',
      deliveryFee: 5.0,
      pickupFee: 0.0,
      tip: 10.0,
      useFee: 0.0,
      subTotal: 85.0,
      total: 103.0,
      discount: 0.0,
      discountSource: 0,
      merchantId: 'merchant-123',
      institutionId: 'institution-123',
      type: 1,
      deliveryAddressId: 'addr-123',
      status: 1,
      statusDetail: 'Order received',
      notes: 'No onions, extra ketchup',
      userName: 'John Doe',
      pickupAddressId: 'pickup-addr-123',
      mealBased: false,
      mealBasedNames: [],
      deliveryAddress: {},
      orderItems: [ ],
      orderPayment: [],
      orderNotifications: [],
      allItems: [],
      isWalkoutOrder: false,
    } as OrderInfo;
    component.order$ = of(mockOrder); // Mock order$ observable

    // Spy on methods that are called in updateTaxBasedOnSelection
    const updateTaxAndTotalsSpy = jest.spyOn(component, 'updateTaxAndTotals');


    await component.updateTaxBasedOnSelection();

    expect(updateTaxAndTotalsSpy).toHaveBeenCalledWith(component.previousTax);
  });
});

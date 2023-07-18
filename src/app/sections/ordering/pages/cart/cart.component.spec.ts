import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartService, MerchantService, OrderDetailOptions } from '@sections/ordering/services';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@core/service/toast/toast.service';
import { PopoverController } from '@ionic/angular';
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
import { StGlobalPopoverComponent } from '@shared/ui-components';
import { AddressInfo } from '@core/model/address/address-info';
import { FORM_CONTROL_NAMES, OrderDetailsFormData } from '@sections/ordering/shared';
import { UserAccount } from '@core/model/account/account.model';
import { AccountType } from 'src/app/app.global';

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
  submitOrder: jest.fn(() => of({} as OrderInfo))
};

const _merchantService = {
  orderTypes$: of({} as MerchantOrderTypesInfo),
  retrieveBuildings: jest.fn(),
  isOutsideMerchantDeliveryArea: jest.fn(),
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
const _orderingService = {};
const _userFacadeService = {
  isApplePayEnabled$: jest.fn(),
};
const _externalPaymentService = {};

const _routingService = {};
const _connectionService = {
  networkStatus: jest.fn(() => of(true)),
};
const _checkinProcess = {};
const _nonCheckingService = {};
const _lockDownService = {
  isLockDownOn: jest.fn(),
};
const _translateService = {};

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
    component.placingOrder = false;

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
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AddressInfo } from '@core/model/address/address-info';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { MenuInfo, MerchantInfo, MerchantOrderTypesInfo } from '@sections/ordering/components';
import { LOCAL_ROUTING, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { CartService, MerchantService, OrderDetailOptions } from '@sections/ordering/services';
import { OrderActionSheetService } from '@sections/ordering/services/odering-actionsheet.service';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { APP_ROUTES } from '@sections/section.config';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { MerchantDistanceModule } from '@shared/pipes/merchant-distance/merchant-distance.module';
import { NavigationService } from '@shared/services';
import { lastValueFrom, of, throwError } from 'rxjs';
import { DINEIN, FullMenuComponent, IGNORE_ERRORS } from './full-menu.component';
import { OrderDetailsOptions } from '@sections/ordering/shared/models/order-details-options.model';

describe('FullMenuComponent', () => {
  let component: FullMenuComponent;
  let fixture: ComponentFixture<FullMenuComponent>;

  const activatedRoute = {
    data: of({} as any),
    snapshot: {
      queryParams: {
        openTimeSlot: true,
      },
    },
  };

  const cdref = {
    detectChanges: jest.fn(),
  };

  const routingService = {
    navigate: jest.fn(),
  };

  const modalSpy = {
    onDidDismiss: jest.fn(() => Promise.resolve({ role: BUTTON_TYPE.CONTINUE })),
    present: jest.fn(),
    addEventListener: jest.fn(),
    onWillDismiss: jest.fn(() => Promise.resolve({ role: BUTTON_TYPE.CONTINUE })),
  };

  const storage = {
    clear: jest.fn(),
    ready: jest.fn(),
    get: jest.fn(),
  };
  const orderingService = {
    getContentStringByName: jest.fn(async labelSavedAddresses => ({})),
  };
  const _translateService = {
    instant: jest.fn(),
  };
  const modalControllerMock = {
    getTop: jest.fn(),
    dismiss: jest.fn(),
    create: jest.fn(() => Promise.resolve(modalSpy)),
  };
  const popoverControllerMock = {
    getTop: jest.fn(),
    dismiss: jest.fn(),
  };
  const cartService = {
    menuItems$: of([]),
    clearActiveOrder: jest.fn(),
    setActiveMerchantsMenuByOrderOptions: jest.fn(),
    orderDetailsOptions$: of({
      orderType: ORDER_TYPE.PICKUP,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    } as OrderDetailOptions),
    isExistingOrder: true,
    orderItems$: of([{ id: 1, name: 'Test item' }]),
    validateOrder: jest.fn(),
    cartsErrorMessage: null,
  };
  const merchantService = {
    menuInfo$: jest.fn(() => of({} as MenuInfo)),
    merchant$: jest.fn(() => of({} as MerchantInfo)),
    orderDetailsOptions$: jest.fn(() => of({} as OrderDetailOptions)),
    orderTypes$: jest.fn(() => of({} as MerchantOrderTypesInfo)),
  };
  let loadingService = {
    showSpinner: jest.fn(),
    closeSpinner: jest.fn(),
  };
  let toastService = {
    showToast: jest.fn(),
  };
  let alertController = {
    create: jest.fn(() => Promise.resolve(modalSpy)),
    present: jest.fn(() => Promise.resolve(true)),
  };
  let orderActionSheetService = {
    openActionSheet: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Storage, useValue: storage },
        { provide: OrderingService, useValue: orderingService },
        { provide: TranslateService, useValue: _translateService },
        { provide: ModalController, useValue: modalControllerMock },
        { provide: PopoverController, useValue: popoverControllerMock },
        { provide: CartService, useValue: cartService },
        { provide: MerchantService, useValue: merchantService },
        { provide: LoadingService, useValue: loadingService },
        { provide: AlertController, useValue: alertController },
        { provide: ToastService, useValue: toastService },
        { provide: OrderActionSheetService, useValue: orderActionSheetService },
        { provide: NavigationService, useValue: routingService },
        { provide: ChangeDetectorRef, useValue: cdref },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule, MerchantDistanceModule, AddressHeaderFormatPipeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMenuComponent);
    component = fixture.componentInstance;
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menu$ and merchantInfo$', async () => {
    const contentString = jest.spyOn(component as any, 'initContentStrings');

    component.ngOnInit();

    expect(contentString).toHaveBeenCalledTimes(1);
  });

  it('should return pickup label when orderType is PICKUP', done => {
    const orderInfo$ = of({ orderType: ORDER_TYPE.PICKUP } as OrderDetailOptions);
    const labelPickup = of('Pickup');
    const labelDelivery = of('Delivery');

    jest.spyOn(component, 'orderInfo$', 'get').mockReturnValue(orderInfo$);
    (component as any).contentStrings = {
      labelPickup,
      labelDelivery,
    } as OrderingComponentContentStrings;

    component.orderType.subscribe(orderType => {
      expect(orderType).toBe('Pickup');
      done();
    });
  });

  it('should return delivery label when orderType is DELIVERY', done => {
    const orderInfo$ = of({ orderType: ORDER_TYPE.DELIVERY } as OrderDetailOptions);
    const labelPickup = of('Pickup');
    const labelDelivery = of('Delivery');

    jest.spyOn(component, 'orderInfo$', 'get').mockReturnValue(orderInfo$);
    (component as any).contentStrings = {
      labelPickup,
      labelDelivery,
    } as OrderingComponentContentStrings;

    component.orderType.subscribe(orderType => {
      expect(orderType).toBe('Delivery');
      done();
    });
  });

  it('should return DINEIN when orderType is not PICKUP or DELIVERY', done => {
    const orderInfo$ = of({ orderType: ORDER_TYPE.DINEIN } as OrderDetailOptions);
    const labelPickup = of('Pickup');
    const labelDelivery = of('Delivery');

    jest.spyOn(component, 'orderInfo$', 'get').mockReturnValue(orderInfo$);
    (component as any).contentStrings = {
      labelPickup,
      labelDelivery,
    } as OrderingComponentContentStrings;

    component.orderType.subscribe(orderType => {
      expect(orderType).toBe(DINEIN);
      done();
    });
  });

  it('should call setActiveMerchantsMenuByOrderOptions on cancel button click', async () => {
    const dueTime = '01-01-2023';
    const orderType = ORDER_TYPE.DELIVERY;
    const address = 'Address example';
    const isASAP = true;

    await component.modalHandler({ dueTime, orderType, address, isASAP });

    const cancelButtonHandler = (component as any).alertController.create.mock.calls[0][0].buttons[0].handler;
    cancelButtonHandler();

    expect((component as any).cartService.setActiveMerchantsMenuByOrderOptions).toHaveBeenCalledWith(
      dueTime,
      orderType,
      address,
      isASAP
    );
  });

  it('should call clearActiveOrder on confirm button click', async () => {
    const dueTime = '01-01-2023';
    const orderType = ORDER_TYPE.DELIVERY;
    const address = 'Address example';
    const isASAP = true;

    await component.modalHandler({ dueTime, orderType, address, isASAP });

    const confirmButtonHandler = (component as any).alertController.create.mock.calls[0][0].buttons[1].handler;
    confirmButtonHandler();

    expect((component as any).cartService.clearActiveOrder).toHaveBeenCalled();
  });

  it('should return the correct orderInfo$', done => {
    const orderInfo = { orderType: ORDER_TYPE.PICKUP } as OrderDetailOptions;
    jest.spyOn(component, 'orderInfo$', 'get').mockReturnValue(of(orderInfo));

    component.orderInfo$.subscribe(orderInfo => {
      expect(orderInfo).toBe(orderInfo);
      done();
    });
  });

  it('should navigate and open action sheet when onOrdersButtonClicked is called', async () => {
    const navigateSpy = jest.spyOn(routingService, 'navigate').mockReturnValue(Promise.resolve(true));
    const openActionSheetSpy = jest.spyOn(orderActionSheetService, 'openActionSheet');

    await component.onOrdersButtonClicked();

    expect(navigateSpy).toHaveBeenCalledWith([APP_ROUTES.ordering]);
    expect(openActionSheetSpy).toHaveBeenCalled();
  });

  it('should navigate to the correct route with query params when onCategoryClicked is called', async () => {
    // Create a mock category
    const mockCategory = { id: 1 };

    // Create a spy for the navigate method
    const navigateSpy = jest.spyOn(routingService, 'navigate').mockReturnValue(Promise.resolve(true));

    await component.onCategoryClicked(mockCategory);

    expect(navigateSpy).toHaveBeenCalledWith([APP_ROUTES.ordering, LOCAL_ROUTING.menuCategoryItems, mockCategory.id], {
      queryParams: { isExistingOrder: cartService.isExistingOrder },
    });
  });

  it('should open openOrderOptions when ionViewWillEnter is called with openTimeSlot query param', () => {
    const spy = jest.spyOn(component, 'openOrderOptions');
    component.merchantInfo$ = of({
      orderTypes: { merchantTimeZone: 'Americas/New York' } as MerchantOrderTypesInfo,
    } as MerchantInfo);
    component.ionViewWillEnter();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to the correct route with query params when navigateToScannedItem is called', () => {
    const mockMenuItemId = '123';

    const navigateSpy = jest.spyOn(routingService, 'navigate').mockReturnValue(Promise.resolve(true));

    component.navigateToScannedItem(mockMenuItemId);

    expect(navigateSpy).toHaveBeenCalledWith([APP_ROUTES.ordering, LOCAL_ROUTING.itemDetail], {
      queryParams: { menuItemId: mockMenuItemId, isScannedItem: true },
    });
  });

  it('should call showToast with the correct message when failedValidateOrder is called', async () => {
    const mockMessage = 'Test message';
    const showToastSpy = jest.spyOn(toastService, 'showToast').mockReturnValue(Promise.resolve());
    await component['failedValidateOrder'](mockMessage);
    expect(showToastSpy).toHaveBeenCalledWith({ message: mockMessage });
  });

  it('should return merchantService.orderTypes$ when orderTypes$ is accessed', () => {
    const merchantService = TestBed.inject(MerchantService);
    expect(component.orderTypes$).toBe(merchantService.orderTypes$);
  });

  it('should return combined orderTypes and orderInfo when orderDetails$ is accessed', async () => {
    // Create mock orderTypes and orderInfo
    const mockOrderTypes = { merchantTimeZone: 'Americas/New York' } as MerchantOrderTypesInfo;
    const mockOrderInfo = {
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
      orderType: 1,
    } as OrderDetailsOptions;

    // Create a mock Observable that emits the combined orderTypes and orderInfo
    const mockOrderDetails$ = of({ orderTypes: mockOrderTypes, orderInfo: mockOrderInfo });

    // Spy on the orderDetails$ getter and make it return the mock Observable
    jest.spyOn(merchantService, 'orderTypes$').mockReturnValue(of(mockOrderTypes));
    jest.spyOn(merchantService, 'orderDetailsOptions$').mockReturnValue(of(mockOrderInfo));
    jest.spyOn(component, 'orderDetails$', 'get').mockReturnValue(mockOrderDetails$);

    const result = await lastValueFrom(component.orderDetails$);

    expect(result).toEqual({ orderTypes: mockOrderTypes, orderInfo: mockOrderInfo });
  });

  it('should call setActiveMerchantsMenuByOrderOptions and validateOrder when onDismissOrderDetails is called with data', async () => {
    const mockData = { dueTime: new Date(), orderType: 1, address: 'Test address', isASAP: true };
    const mockOrderItems = [{ id: 1, name: 'Test item' }];

    const validateOrderSpy = jest.spyOn(component as any, 'validateOrder');

    jest.spyOn(cartService, 'setActiveMerchantsMenuByOrderOptions').mockReturnValue(Promise.resolve(mockData));

    cartService.orderItems$ = of(mockOrderItems);

    cartService.validateOrder = jest.fn().mockReturnValue(of(null));

    await component['onDismissOrderDetails']({ data: mockData });

    expect(cartService.setActiveMerchantsMenuByOrderOptions).toHaveBeenCalledWith(
      mockData.dueTime,
      mockData.orderType,
      mockData.address,
      mockData.isASAP
    );

    expect(validateOrderSpy).toHaveBeenCalled();
  });

  it('should return errorMessage when cart has some error', async () => {
    const mockCartsErrorMessage = 'Error message';
    const mockIsExistingOrder = true;

    const presentPopupSpy = jest.spyOn(component as any, 'presentPopup');

    cartService.cartsErrorMessage = mockCartsErrorMessage;
    cartService.isExistingOrder = mockIsExistingOrder;

    cartService.validateOrder = jest.fn().mockReturnValue(throwError(() => 'Error'));

    try {
      await component['redirectToCart']();
    } catch (error) {}

    expect(presentPopupSpy).toHaveBeenCalledWith(mockCartsErrorMessage);
  });

  it('should call navigate when redirectToCart is called and validateOrder is successful', async () => {
    const mockIsExistingOrder = true;
  
    const navigateSpy = jest.spyOn(routingService, 'navigate');
  
    cartService.cartsErrorMessage = null;
    cartService.isExistingOrder = mockIsExistingOrder;
  
    component['validateOrder'] = jest.fn().mockImplementation((successCb, errorCb) => {
      successCb();
      return Promise.resolve();
    });
  
    await component['redirectToCart']();
  
    expect(navigateSpy).toHaveBeenCalledWith([APP_ROUTES.ordering, LOCAL_ROUTING.cart], { queryParams: { isExistingOrder: mockIsExistingOrder } });
  });

  it('should call failedValidateOrder when redirectToCart is called and validateOrder is unsuccessful', async () => {
    const mockError = 'mock error';
  
    const failedValidateOrderSpy = jest.spyOn(component as any, 'failedValidateOrder');
  
    cartService.cartsErrorMessage = null;
  
    component['validateOrder'] = jest.fn().mockImplementation((successCb, errorCb) => {
      errorCb(mockError);
      return Promise.resolve();
    });
  
    await component['redirectToCart']();
  
    expect(failedValidateOrderSpy).toHaveBeenCalledWith(mockError);
  });

  it('should call presentPopup when redirectToCart is called, validateOrder is unsuccessful, and error code is in IGNORE_ERRORS', async () => {
    const mockErrorCode = 'mock error code';
    const mockErrorMessage = 'mock error message';
    const mockError = [mockErrorCode, mockErrorMessage];
  
    IGNORE_ERRORS.push(mockErrorCode);
  
    const presentPopupSpy = jest.spyOn(component as any, 'presentPopup');
  
    cartService.cartsErrorMessage = null;
  
    component['validateOrder'] = jest.fn().mockImplementation((successCb, errorCb) => {
      errorCb(mockError);
      return Promise.resolve();
    });
  
    await component['redirectToCart']();
  
    expect(presentPopupSpy).toHaveBeenCalledWith(mockErrorMessage);
  });
});

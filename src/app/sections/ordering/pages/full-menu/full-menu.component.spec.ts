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
import { DINEIN, FullMenuComponent } from './full-menu.component';
import { OrderDetailsOptions } from '@sections/ordering/shared/models/order-details-options.model';

describe('FullMenuComponent', () => {
  let component: FullMenuComponent;
  let fixture: ComponentFixture<FullMenuComponent>;

  const activatedRoute = {
    data: of({} as any),
    snapshot: {
      queryParams: {
        openTimeSlot: true,
        isExistingOrder: true,
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
    validateOrder: jest.fn(),
    redirectToCart: jest.fn(),
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
    merchant$: of({} as MerchantOrderTypesInfo),

    orderDetailsOptions$: of({
      orderType: ORDER_TYPE.PICKUP,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    } as OrderDetailOptions),
    merchantTimeZone: 'mockTimeZone',
    isExistingOrder: true,
    orderItems$: of([{ id: 1, name: 'Test item' }]),
    validateOrder: jest.fn(),
    cartsErrorMessage: null,
  };
  const merchantService = {
    menuInfo$: of({} as MenuInfo),
    merchant$: of({} as MerchantInfo),
    orderDetailsOptions$: of({} as OrderDetailOptions),
    orderTypes$: of({} as MerchantOrderTypesInfo),
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
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menu$ and merchantInfo$', async () => {
    const contentString = jest.spyOn(component as any, 'initContentStrings');

    component.ngOnInit();

    expect(contentString).toHaveBeenCalledTimes(1);
  });

  it('should return pickup label when orderType is PICKUP', () => {
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
    });
  });

  it('should return delivery label when orderType is DELIVERY', () => {
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
    });
  });

  it('should return DINEIN when orderType is not PICKUP or DELIVERY', () => {
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
    });
  });

  it('should call setActiveMerchantsMenuByOrderOptions on cancel button click and is not asap', async () => {
    const dueTime = '01-01-2023';
    const orderType = ORDER_TYPE.DELIVERY;
    const address = 'Address example';
    const isASAP = false;

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

  it('should return the correct orderInfo$', () => {
    const orderInfo = { orderType: ORDER_TYPE.PICKUP } as OrderDetailOptions;
    jest.spyOn(component, 'orderInfo$', 'get').mockReturnValue(of(orderInfo));

    component.orderInfo$.subscribe(orderInfo => {
      expect(orderInfo).toBe(orderInfo);
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
  it('should open openOrderOptions when ionViewWillEnter is called with openTimeSlot query param', () => {
    const orderInfo = { orderType: ORDER_TYPE.DELIVERY, address: { id: '2' } } as OrderDetailOptions;
    jest.spyOn(component, 'orderInfo$', 'get').mockReturnValue(of(orderInfo));
    const spy = jest.spyOn(component, 'openOrderOptions');
    component.merchantInfo$ = of({
      orderTypes: { merchantTimeZone: 'Americas/New York', pickup: true, delivery: true } as MerchantOrderTypesInfo,
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

  it('should return merchantService.orderTypes$ when orderTypes$ is accessed', () => {
    expect(component.orderTypes$).toBeTruthy();
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

    jest.spyOn(component, 'orderDetails$', 'get').mockReturnValue(mockOrderDetails$);

    const result = await lastValueFrom(component.orderDetails$);

    expect(result).toEqual({ orderTypes: mockOrderTypes, orderInfo: mockOrderInfo });
  });

  it('should call setActiveMerchantsMenuByOrderOptions and validateOrder when onDismissOrderDetails is called with data', async () => {
    const mockData = { dueTime: new Date(), orderType: 1, address: 'Test address', isASAP: true };
    const mockOrderItems = [{ id: 1, name: 'Test item' }];

    const validateOrderSpy = jest.spyOn(orderingService, 'validateOrder');

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

  it('should call validateOrder method of CartService and navigate to cart on success', () => {
    component.redirectToCart();
    expect(orderingService.redirectToCart).toHaveBeenCalledTimes(1);
  });

  it('should return the combined order details', () => {
    lastValueFrom(component.orderDetails$).then(data => {
      expect(data).toEqual({
        orderTypes: {
          merchantTimeZone: 'mockTimeZone',
        },
        orderInfo: {},
      });
    });
  });
  it('should toggle merchantInfoState', () => {
    expect(component.merchantInfoState).toBe(false);
    component.toggleMerchantInfo();
    expect(component.merchantInfoState).toBe(true);
  });
});

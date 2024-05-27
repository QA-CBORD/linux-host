import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderingPage } from './ordering.page';
import { CartService, MerchantService, OrderDetailOptions } from './services';
import { OrderingService } from './services/ordering.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { LoadingService } from '@core/service/loading/loading.service';
import { LockDownService, NavigationService } from '@shared/services';
import { ToastService } from '@core/service/toast/toast.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';
import { TypeMessageModule } from './shared/pipes/type-message/type-message.pipe.module';
import { SearchPipeModule } from '@shared/pipes/search-pipe/search.pipe.module';
import { MerchantInfo, MerchantOrderTypesInfo, MerchantSettingInfo } from './components';
import { ORDER_TYPE, TOAST_MESSAGES } from './ordering.config';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OrderActionSheetService } from './services/odering-actionsheet.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from '@sections/notifications/notifications.component.spec';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { AddressInfo } from 'net';
import { ActiveCartService } from './services/active-cart.service';

describe('OrderingPage', () => {
  let component: OrderingPage;
  let fixture: ComponentFixture<OrderingPage>;
  let mockMerchantService;
  let mockOrderingService;
  let mockModalController;
  let mockloadingService;
  let routingService;
  let lockDownService;
  let toastService;
  let mockPopoverController;
  let activatedRoute;
  let mockOrderActionSheetService;
  let mockCartService;
  let mockActiveCartService;
  let a11yService = {
    excuteSearchSpeech: jest.fn(),
  };
  let orderSchedule = {
    menuSchedule: [],
    days: [
      {
        date: '2024-05-08',
        dayOfWeek: 4,
        hourBlocks: [
          {
            timestamps: [],
            hour: 12,
            minuteBlocks: [0, 15, 30, 45],
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    mockMerchantService = {
      menuMerchants$: of([]),
      addFavoriteMerchant: jest.fn(),
      removeFavoriteMerchant: jest.fn(),
      getMerchantsWithFavoriteInfo: jest.fn(),
    };
    mockOrderingService = { getContentStringByName: jest.fn().mockReturnValue(of('')) };
    mockModalController = {
      create: jest.fn().mockReturnValue({
        present: jest.fn(),
        onDidDismiss: jest.fn().mockReturnValue(Promise.resolve({ data: 'test' })),
        addEventListener: jest.fn(),
        onWillDismiss: jest.fn().mockReturnValue(Promise.resolve({ data: 'test' })),
      }),
    };

    mockloadingService = { closeSpinner: jest.fn(), showSpinner: jest.fn() };

    mockPopoverController = {
      create: jest.fn().mockReturnValue({
        present: jest.fn(),
        onDidDismiss: jest.fn().mockReturnValue(Promise.resolve({ data: 'test' })),
        addEventListener: jest.fn(),
        onWillDismiss: jest.fn().mockReturnValue(Promise.resolve({ data: 'test' })),
      }),
    };

    activatedRoute = {
      snapshot: {
        paramMap: { get: jest.fn() },
        queryParams: { merchantId: 'testMerchantId' },
      },
    };

    mockOrderActionSheetService = {
      openOrderOptions: jest.fn(),
      openOrderOptionsByMerchantId: jest.fn(),
    };

    routingService = { navigate: jest.fn() };

    lockDownService = {
      isLockDownOn: jest.fn(),
      loadStringsAndSettings: jest.fn(),
    };

    toastService = { showError: jest.fn(), showToast: jest.fn() };

    mockCartService = {
      merchant$: of({}),
      menuItems$: of(0),
      showActiveCartWarning: jest.fn(),
      orderSchedule$: of({}),
      orderDetailsOptions$: of({
        orderType: ORDER_TYPE.PICKUP,
        address: {} as AddressInfo,
        dueTime: new Date(),
        isASAP: true,
      } as unknown as OrderDetailOptions),
      resetOrderSnapshot: jest.fn(),
    };
    mockActiveCartService = {
      preValidateOrderFlow: jest.fn(),
      resetOrderSnapshot: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        IonicStorageModule.forRoot(),
        TypeMessageModule,
        SearchPipeModule,
        TranslateModule,
      ],
      declarations: [OrderingPage],
      providers: [
        { provide: MerchantService, useValue: mockMerchantService },
        { provide: OrderingService, useValue: mockOrderingService },
        { provide: ModalController, useValue: mockModalController },
        { provide: LoadingService, useValue: mockloadingService },
        { provide: NavigationService, useValue: routingService },
        { provide: LockDownService, useValue: lockDownService },
        { provide: ToastService, useValue: toastService },
        { provide: PopoverController, useValue: mockPopoverController },
        { provide: ActivatedRoute, useValue: activatedRoute },
        {
          provide: OrderActionSheetService,
          useValue: mockOrderActionSheetService,
        },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: AccessibilityService, useValue: a11yService },
        { provide: CartService, useValue: mockCartService },
        { provide: ActiveCartService, useValue: mockActiveCartService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(OrderingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize merchantList$ and contentStrings when ngOnInit is called', async () => {
    const mockContentStrings = 'mockContentStrings';
    jest.spyOn(mockOrderingService, 'getContentStringByName').mockReturnValue(of(mockContentStrings));

    await component.ngOnInit();

    expect(component.merchantList$).toEqual(mockMerchantService.menuMerchants$);
  });

  it('should call handleActiveMerchantInRoute and closeSpinner when ionViewDidEnter is called', async () => {
    component.merchantList$ = of([
      {
        id: 'testMerchantId',
        orderTypes: { delivery: true, pickup: true } as MerchantOrderTypesInfo,
        settings: {
          list: [{}],
          map: {
            'merchant.order.order_ahead_enabled': '1',
          } as Map<string, MerchantSettingInfo> | Object,
        },
      } as MerchantInfo,
    ]);
    const handleActiveMerchantInRouteSpy = jest.spyOn(component as any, 'handleActiveMerchantInRoute');
    const closeSpinnerSpy = jest.spyOn(mockloadingService, 'closeSpinner');

    await component.ionViewDidEnter();

    expect(handleActiveMerchantInRouteSpy).toHaveBeenCalled();
    expect(closeSpinnerSpy).toHaveBeenCalled();
  });

  it('should handle merchant click correctly', async () => {
    const mockMerchantInfo = {
      walkout: false,
      name: 'Test Merchant',
      id: 'testMerchantId',
      orderTypes: { delivery: true, pickup: true } as MerchantOrderTypesInfo,
      settings: {
        list: [{}],
        map: {
          'merchant.order.order_ahead_enabled': '1',
        } as Map<string, MerchantSettingInfo> | Object,
      },
    } as MerchantInfo;
    const isLockDownOnSpy = jest.spyOn(lockDownService, 'isLockDownOn').mockReturnValue(false);
    const showErrorSpy = jest.spyOn(toastService, 'showError');
    const onToastDisplayedSpy = jest.spyOn(component as any, 'onToastDisplayed');
    const preValidateOrderFlowSpy = jest.spyOn(mockActiveCartService as any, 'preValidateOrderFlow');

    const openOrderOptionsSpy = jest.spyOn(component as any, 'openOrderOptions').mockImplementation(() => {}); // Mock openOrderOptions

    mockCartService.menuItems$ = of(0);
    mockCartService.merchant$ = of(null);
    component.orderSchedule = orderSchedule;

    await component.merchantClickHandler(mockMerchantInfo);

    expect(mockActiveCartService.preValidateOrderFlow).toHaveBeenCalledWith(
      mockMerchantInfo.id,
      expect.any(Function),
      orderSchedule
    );
    const boundFunction = mockActiveCartService.preValidateOrderFlow.mock.calls[0][1];
    boundFunction();
    expect(openOrderOptionsSpy).toHaveBeenCalledWith(mockMerchantInfo);
    expect(isLockDownOnSpy).toHaveBeenCalled();
    expect(showErrorSpy).not.toHaveBeenCalled();
    expect(onToastDisplayedSpy).not.toHaveBeenCalled();
    expect(preValidateOrderFlowSpy).toHaveBeenCalled();
    expect(openOrderOptionsSpy).toHaveBeenCalledWith(mockMerchantInfo);
  });

  it('should update searchString when onSearchedValue is called', () => {
    const testValue = 'test value';

    component.onSearchedValue(testValue);

    expect(component.searchString).toBe(testValue);
  });

  it('should return if lockdown is on', async () => {
    jest.spyOn(lockDownService, 'isLockDownOn').mockReturnValue(true);
    const merchantInfo = {} as MerchantInfo;

    await component.merchantClickHandler(merchantInfo);

    expect(lockDownService.isLockDownOn).toHaveBeenCalled();
  });

  it('should show error if merchant is walkout', async () => {
    const merchantInfo = {
      walkout: true,
      name: 'Test Merchant',
      id: 'testMerchantId',
      orderTypes: { delivery: true, pickup: true } as MerchantOrderTypesInfo,
      settings: {
        list: [{}],
        map: {
          'merchant.order.order_ahead_enabled': '1',
        } as Map<string, MerchantSettingInfo> | Object,
      },
    } as MerchantInfo;
    const showErrorSpy = jest.spyOn(toastService, 'showError');

    await component.merchantClickHandler(merchantInfo);

    expect(showErrorSpy).toHaveBeenCalledWith(TOAST_MESSAGES.isWalkOut);
  });

  it('should add or remove merchant from favorites', async () => {
    const isFavorite = true;
    const id = 'testMerchantId';
    const addFavoriteMerchantSpy = jest.spyOn(mockMerchantService, 'addFavoriteMerchant').mockReturnValue(of({}));
    const removeFavoriteMerchantSpy = jest.spyOn(mockMerchantService, 'removeFavoriteMerchant').mockReturnValue(of({}));
    const getMerchantsWithFavoriteInfoSpy = jest
      .spyOn(mockMerchantService, 'getMerchantsWithFavoriteInfo')
      .mockReturnValue(of({}));
    const closeSpinnerSpy = jest.spyOn(mockloadingService, 'closeSpinner');

    await component.favouriteHandler({ isFavorite, id });

    expect(addFavoriteMerchantSpy).toHaveBeenCalled();
    expect(removeFavoriteMerchantSpy).toHaveBeenCalledWith(id);
    expect(getMerchantsWithFavoriteInfoSpy).toHaveBeenCalled();
    expect(closeSpinnerSpy).toHaveBeenCalled();
  });
  it('should open order options by merchant id', async () => {
    await component['handleActiveMerchantInRoute']();

    expect(mockOrderActionSheetService.openOrderOptionsByMerchantId).toHaveBeenCalledWith('testMerchantId');
  });
});

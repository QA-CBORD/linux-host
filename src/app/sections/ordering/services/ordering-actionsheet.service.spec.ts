import { TestBed } from '@angular/core/testing';
import { OrderActionSheetService } from './odering-actionsheet.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { ToastService } from '@core/service/toast/toast.service';
import { NavigationService } from '@shared/index';
import { CartService, OrderDetailOptions } from './cart.service';
import { MerchantService } from './merchant.service';
import { of } from 'rxjs';
import { OrderInfo, MerchantInfo, MerchantOrderTypesInfo, MerchantSettingInfo } from '../components';
import { ORDER_TYPE } from '../ordering.config';
import { TranslateService } from '@ngx-translate/core';

describe('OrderActionSheetService', () => {
  let service: OrderActionSheetService;
  const _cartService = {
    validateOrder: jest.fn(),
    setActiveMerchant: jest.fn(),
    orderInfo$: of({ type: ORDER_TYPE.PICKUP } as OrderInfo),
    merchant$: of({ id: '1' } as MerchantInfo),
    orderDetailsOptions$: of({} as OrderDetailOptions),
    updateOrderNote: jest.fn(),
    updateOrderPhone: jest.fn(),
    submitOrder: jest.fn(() => of({} as OrderInfo)),
    closeButtonClicked: jest.fn(),
    removeOrderDetailsOptions: jest.fn(),
    clearActiveOrder: jest.fn(),
    setActiveMerchantsMenuByOrderOptions: jest.fn(),
  };
  const _merchantService = {
    orderTypes$: of({} as MerchantOrderTypesInfo),
    retrieveBuildings: jest.fn(),
    isOutsideMerchantDeliveryArea: jest.fn(),
    isOpen: jest.fn(),
    menuMerchants$: of([]),
    getMerchantsWithFavoriteInfo: jest.fn().mockReturnValue(of([])),
  };
  const _routingService = {};
  const _toastService = {
    showError: jest.fn(),
    showToast: jest.fn().mockResolvedValue({}),
  };

  const _modalService = {
    create: jest.fn().mockResolvedValue({ present: () => Promise.resolve() }),
    createActionSheet: jest
      .fn()
      .mockResolvedValue({ onDidDismiss: () => Promise.resolve({ data: {} }), present: () => Promise.resolve() }),
  };

  const _translateService = { instant: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CartService, useValue: _cartService },
        { provide: ModalsService, useValue: _modalService },
        { provide: MerchantService, useValue: _merchantService },
        { provide: NavigationService, useValue: _routingService },
        { provide: ToastService, useValue: _toastService },
        { provide: TranslateService, useValue: _translateService },
      ],
    });
    service = TestBed.inject(OrderActionSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit openActionSheet event', () => {
    let isOpenActionSheetCalled = false;

    service.openActionSheet$.subscribe(() => {
      isOpenActionSheetCalled = true;
    });

    service.openActionSheet();

    expect(isOpenActionSheetCalled).toBeTruthy();
  });

  it('should display toast if merchant is closed', async () => {
    const merchantInfo = {
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
    const onToastDisplayedSpy = jest.spyOn(service as any, 'onToastDisplayed');

    const errorMessage = `${merchantInfo.name} is currently closed, please try again during operating hours`;
    _translateService.instant.mockReturnValueOnce(errorMessage);
    service.openOrderOptions(merchantInfo);
    expect(onToastDisplayedSpy).toHaveBeenCalledWith(errorMessage);
  });

  it('should open order options if merchant is open and not in lockdown or walkout', () => {
    const merchantInfo = {
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
    _merchantService.isOpen.mockReturnValue(true);
    const openOrderOptionsSpy = jest.spyOn(service as any, 'actionSheet');

    service.openOrderOptions(merchantInfo);

    expect(openOrderOptionsSpy).toHaveBeenCalled();
  });

  it('should display toast if merchant is not found', async () => {
    const onToastDisplayedSpy = jest.spyOn(service as any, 'onToastDisplayed');

    const errorMessage = 'We were unable to find your merchant - Please try again';
    _translateService.instant.mockReturnValueOnce(errorMessage);
    await service.openOrderOptionsByMerchantId('testMerchantId');
    expect(onToastDisplayedSpy).toHaveBeenCalledWith(errorMessage);
  });

  it('should open order options if merchant is open', async () => {
    const merchantInfo = {
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
    _merchantService.menuMerchants$ = of([merchantInfo]);
    _merchantService.isOpen.mockReturnValue(true);
    const openOrderOptionsSpy = jest.spyOn(service as any, 'openOrderOptions');

    await service.openOrderOptionsByMerchantId('testMerchantId');
    expect(openOrderOptionsSpy).toHaveBeenCalledWith(merchantInfo);
  });
});

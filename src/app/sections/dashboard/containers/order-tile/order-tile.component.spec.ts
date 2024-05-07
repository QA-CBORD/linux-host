import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { CartService, MerchantInfo, MerchantOrderTypesInfo, MerchantService, MerchantSettingInfo } from '@sections/ordering';
import { LockDownService, NavigationService } from '@shared/services';
import { of } from 'rxjs';
import { OrderTileComponent } from './order-tile.component';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { APP_ROUTES } from '@sections/section.config';

const environmentFacadeService = {
  getImageURL: jest.fn(),
};
const merchantService = {
  getMerchantsWithFavoriteInfo: jest.fn(() => of([])),
};
const router = {
  navigate: jest.fn(),
};
const toastService = {
  showError: jest.fn(),
};
const lockDownService = {
  isLockDownOn: jest.fn(),
};
const routingService = { navigate: jest.fn() };

const mockCartService = {
  merchant$: of({}),
  menuItems$: of(0),
  showActiveCartWarning: jest.fn(),
};

describe('OrderTileComponent', () => {
  let component: OrderTileComponent;
  let fixture: ComponentFixture<OrderTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //TODO: Temp fix for Swiper imports, should setup JEST instead
      declarations: [OrderTileComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: EnvironmentFacadeService, useValue: environmentFacadeService },
        { provide: MerchantService, useValue: merchantService },
        { provide: Router, useValue: router },
        { provide: ToastService, useValue: toastService },
        { provide: LockDownService, useValue: lockDownService },
        { provide: NavigationService, useValue: routingService },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should not redirect when lockDown is on', () => {
    const routerSpy = jest.spyOn(router, 'navigate');
    const lockDownSpy = jest.spyOn(lockDownService, 'isLockDownOn').mockResolvedValue(true);
    component.goToMerchant({} as MerchantInfo);
    expect(lockDownSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledTimes(0);
  });
  it('should display warning if there is items in the cart and a diferent merchant is clicked', async () => {
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

    const mockNewMerchantInfo = {
      walkout: false,
      name: 'Test Merchant',
      id: 'testMerchantId1',
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
    const openCleaCartModalSpy = jest.spyOn(mockCartService as any, 'showActiveCartWarning');

    mockCartService.menuItems$ = of(2);
    mockCartService.merchant$ = of(mockMerchantInfo);

    await component.goToMerchant(mockNewMerchantInfo);

    expect(isLockDownOnSpy).toHaveBeenCalled();
    expect(showErrorSpy).not.toHaveBeenCalled();
    expect(openCleaCartModalSpy).toHaveBeenCalled();
  });

  it('should handle merchant click correctly if there are items in the cart and the merchant is the same', async () => {
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
    const onNavigateSpy = jest.spyOn(routingService, 'navigate');

    mockCartService.menuItems$ = of(2);
    mockCartService.merchant$ = of(mockMerchantInfo);

    await component.goToMerchant(mockMerchantInfo);
    mockCartService.merchant$.subscribe(merchant => {
      expect(merchant).toEqual(mockMerchantInfo);
    });
    expect(isLockDownOnSpy).toHaveBeenCalled();
    expect(showErrorSpy).not.toHaveBeenCalled();
    expect(onNavigateSpy).toHaveBeenCalledWith([APP_ROUTES.ordering, LOCAL_ROUTING.fullMenu], {
      queryParams: { isExistingOrder: true },
    });
  });
});

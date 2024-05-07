import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { FavoriteMerchantsService } from './services/favorite-merchants.service';
import { MerchantInfo, MerchantOrderTypesInfo, MerchantSettingInfo } from '../../shared/models';
import { CartService } from '../../services';
import { MerchantService } from '../../services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { FavoriteMerchantsComponent } from './favorite-merchants.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@ionic/storage-angular';
import { AlertController, AngularDelegate, ModalController, PopoverController } from '@ionic/angular';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { APP_ROUTES } from '@sections/section.config';
import { of } from 'rxjs';
import { LockDownService, NavigationService } from '@shared/index';

describe('FavoriteMerchantsComponent', () => {
  let component: FavoriteMerchantsComponent;
  let fixture: ComponentFixture<FavoriteMerchantsComponent>;

  const mockCartService = {
    merchant$: of({}),
    menuItems$: of(0),
    showActiveCartWarning: jest.fn(),
  };
  const lockDownService = {
    isLockDownOn: jest.fn(),
    loadStringsAndSettings: jest.fn(),
  };
  const toastService = { showError: jest.fn(), showToast: jest.fn() };
  const routingService = { navigate: jest.fn() };

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const activatedRouteStub = () => ({ data: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: array => ({}) });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({}),
    });
    const favoriteMerchantsServiceStub = () => ({
      getFavoriteMerchants: () => ({}),
    });
    const cartServiceStub = () => ({
      setActiveMerchant: merchant => ({}),
      setActiveMerchantsMenuByOrderOptions: (dueTime, orderType, address, isASAP) => ({}),
    });
    const merchantServiceStub = () => ({
      removeFavoriteMerchant: id => ({
        pipe: () => ({ subscribe: f => f({}) }),
      }),
    });
    const orderingServiceStub = () => ({
      getContentStringByName: backToOrdering => ({}),
    });
    const toastServiceStub = () => ({
      showError: isWalkOut => ({}),
      showToast: object => ({}),
    });
    const modalsServiceStub = () => ({
      createActionSheet: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({}),
      }),
    });
    const alertControllerStub = () => ({
      create: () => ({}),
    });

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FavoriteMerchantsComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        {
          provide: FavoriteMerchantsService,
          useFactory: favoriteMerchantsServiceStub,
        },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: ModalsService, useFactory: modalsServiceStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: LockDownService, useValue: lockDownService },
        { provide: ToastService, useValue: toastService },
        { provide: CartService, useValue: mockCartService },
        { provide: NavigationService, useValue: routingService },
        ModalController,
        Storage,
        AngularDelegate,
        PopoverController,
      ],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(FavoriteMerchantsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`merchantList has default value`, () => {
    expect(component.merchantList).toEqual([]);
  });

  describe('backToOrdering', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      jest.spyOn(routerStub, 'navigate');
      component.backToOrdering();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
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
    const onToastDisplayedSpy = jest.spyOn(component as any, 'onToastDisplayed');
    const openOrderOptionsSpy = jest.spyOn(component as any, 'openOrderOptions');
    const openCleaCartModalSpy = jest.spyOn(mockCartService as any, 'showActiveCartWarning');

    mockCartService.menuItems$ = of(2);
    mockCartService.merchant$ = of(mockMerchantInfo);

    await component.merchantClickHandler(mockNewMerchantInfo);

    expect(isLockDownOnSpy).toHaveBeenCalled();
    expect(showErrorSpy).not.toHaveBeenCalled();
    expect(onToastDisplayedSpy).not.toHaveBeenCalled();
    expect(openOrderOptionsSpy).not.toHaveBeenCalled();
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
    const openOrderOptionsSpy = jest.spyOn(component as any, 'openOrderOptions');

    mockCartService.menuItems$ = of(2);
    mockCartService.merchant$ = of(mockMerchantInfo);

    await component.merchantClickHandler(mockMerchantInfo);
    mockCartService.merchant$.subscribe(merchant => {
      expect(merchant).toEqual(mockMerchantInfo);
    });
    expect(isLockDownOnSpy).toHaveBeenCalled();
    expect(showErrorSpy).not.toHaveBeenCalled();
    expect(openOrderOptionsSpy).not.toHaveBeenCalled();
    expect(onNavigateSpy).toHaveBeenCalledWith([APP_ROUTES.ordering, LOCAL_ROUTING.fullMenu], {
      queryParams: { isExistingOrder: true },
    });
  });
});

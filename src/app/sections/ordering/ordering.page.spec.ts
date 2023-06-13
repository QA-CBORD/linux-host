import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CartService } from './services';
import { MerchantService } from './services';
import { MerchantInfo } from './shared/models';
import { LoadingService } from '@core/service/loading/loading.service';
import { ActivatedRoute } from '@angular/router';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { NavigationService } from '@shared/services/navigation.service';
import { OrderingPage } from './ordering.page';

describe('OrderingPage', () => {
  let component: OrderingPage;
  let fixture: ComponentFixture<OrderingPage>;

  beforeEach(() => {
    const cartServiceStub = () => ({
      setActiveMerchant: merchant => ({}),
      removeOrderDetailsOptions: () => ({}),
      clearActiveOrder: () => ({}),
      setActiveMerchantsMenuByOrderOptions: (
        dueTime,
        orderType,
        address,
        isASAP
      ) => ({})
    });
    const merchantServiceStub = () => ({
      menuMerchants$: {},
      removeFavoriteMerchant: id => ({}),
      addFavoriteMerchant: id => ({}),
      getMerchantsWithFavoriteInfo: () => ({}),
      orderTypes: {}
    });
    const loadingServiceStub = () => ({
      closeSpinner: () => ({}),
      showSpinner: () => ({})
    });
    const activatedRouteStub = () => ({
      snapshot: { queryParams: { merchantId: {} } }
    });
    const orderingServiceStub = () => ({
      getContentStringByName: labelAddedToFavorites => ({})
    });
    const toastServiceStub = () => ({
      showError: isWalkOut => ({}),
      showToast: object => ({})
    });
    const modalsServiceStub = () => ({
      createActionSheet: (object, arg) => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const navigationServiceStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrderingPage],
      providers: [
        { provide: CartService, useFactory: cartServiceStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: ModalsService, useFactory: modalsServiceStub },
        { provide: NavigationService, useFactory: navigationServiceStub }
      ]
    });
    fixture = TestBed.createComponent(OrderingPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('merchantClickHandler', () => {
    it('makes expected calls', () => {
      const merchantInfoStub: MerchantInfo = <any>{};
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
      spyOn(toastServiceStub, 'showError').and.callThrough();
      component.merchantClickHandler(merchantInfoStub);
      expect(toastServiceStub.showError).toHaveBeenCalled();
    });
  });
});

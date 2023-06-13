import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CartService } from '@sections/ordering';
import { MerchantService } from '@sections/ordering';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { LoadingService } from '@core/service/loading/loading.service';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { NavigationService } from '@shared/services/navigation.service';
import { FullMenuComponent } from './full-menu.component';

describe('FullMenuComponent', () => {
  let component: FullMenuComponent;
  let fixture: ComponentFixture<FullMenuComponent>;

  beforeEach(() => {
    const cartServiceStub = () => ({
      menuInfo$: {},
      merchant$: {},
      menuItems$: {},
      isExistingOrder: {},
      orderDetailsOptions$: { pipe: () => ({ toPromise: () => ({}) }) },
      setActiveMerchantsMenuByOrderOptions: (
        dueTime,
        orderType,
        address,
        isASAP
      ) => ({}),
      orderItems$: { pipe: () => ({ subscribe: f => f({}) }) },
      cartsErrorMessage: {},
      validateOrder: () => ({
        pipe: () => ({
          toPromise: () => ({
            then: () => ({ catch: () => ({ finally: () => ({}) }) })
          })
        })
      }),
      removeLastOrderItem: () => ({})
    });
    const merchantServiceStub = () => ({});
    const activatedRouteStub = () => ({ snapshot: { queryParams: {} } });
    const alertControllerStub = () => ({
      create: object => ({ present: () => ({}) })
    });
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const orderingServiceStub = () => ({
      getContentStringByName: buttonExplore => ({})
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const modalsServiceStub = () => ({
      createActionSheet: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const navigationServiceStub = () => ({ navigate: (array, object) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FullMenuComponent],
      providers: [
        { provide: CartService, useFactory: cartServiceStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: ModalsService, useFactory: modalsServiceStub },
        { provide: NavigationService, useFactory: navigationServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FullMenuComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`merchantInfoState has default value`, () => {
    expect(component.merchantInfoState).toEqual(false);
  });

  describe('redirectToCart', () => {
    it('makes expected calls', () => {
      const navigationServiceStub: NavigationService = fixture.debugElement.injector.get(
        NavigationService
      );
      spyOn(navigationServiceStub, 'navigate').and.callThrough();
      component.redirectToCart();
      expect(navigationServiceStub.navigate).toHaveBeenCalled();
    });
  });
});

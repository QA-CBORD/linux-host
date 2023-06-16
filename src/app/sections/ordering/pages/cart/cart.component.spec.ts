import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '@sections/ordering/services/cart.service';
import { MerchantService } from '@sections/ordering';
import { OrderInfo } from '@sections/ordering';
import { LoadingService } from '@core/service/loading/loading.service';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { ToastService } from '@core/service/toast/toast.service';
import { NavigationService } from '@shared/services/navigation.service';
import { ConnectionService } from '@shared/services/connection-service';
import { CheckingProcess } from '@sections/check-in/services/check-in-process-builder';
import { NonCheckingService } from './services/non-checking.service';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({
      detectChanges: () => ({}),
      detach: () => ({}),
      reattach: () => ({})
    });
    const cartServiceStub = () => ({
      orderInfo$: { pipe: () => ({ toPromise: () => ({}) }) },
      merchant$: {
        pipe: () => ({ toPromise: () => ({}), subscribe: f => f({}) })
      },
      merchantTimeZone: {},
      orderDetailsOptions$: {},
      updateOrderAddress: arg => ({}),
      setOrderTip: amount => ({}),
      addPaymentInfoToOrder: partial => ({}),
      removeOrderItemFromOrderById: id => ({}),
      addOrderItems: removedItem => ({}),
      updateOrderNote: arg => ({}),
      updateOrderPhone: arg => ({}),
      submitOrder: (accountId, arg, clientOrderId) => ({
        pipe: () => ({
          toPromise: () => ({
            then: () => ({ catch: () => ({ finally: () => ({}) }) })
          })
        })
      }),
      clientOrderId: {},
      changeClientOrderId: {},
      menuInfo$: {},
      validateOrder: () => ({
        pipe: () => ({
          toPromise: () => ({ catch: () => ({ finally: () => ({}) }) })
        })
      }),
      orderIsAsap: {},
      checkNumber: {},
      currentOrderId: {}
    });
    const merchantServiceStub = () => ({
      orderTypes$: { pipe: () => ({}) },
      retrieveBuildings: () => ({}),
      isOutsideMerchantDeliveryArea: (id, latitude, longitude) => ({
        toPromise: () => ({})
      }),
      retrieveDeliveryAddresses: id => ({}),
      retrievePickupLocations: (storeAddress, arg) => ({}),
      getMerchantPaymentAccounts: id => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({ bind: () => ({}) })
    });
    const activatedRouteStub = () => ({
      snapshot: { data: { data: { accounts: {} } } }
    });
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const orderingServiceStub = () => ({
      getContentStringByName: buttonPlaceOrder => ({}),
      getContentErrorStringByName: insufficientBalanceMealsPayment => ({})
    });
    const userFacadeServiceStub = () => ({ isApplePayEnabled$: () => ({}) });
    const settingsFacadeServiceStub = () => ({
      getSetting: cREDIT_PAYMENT_SYSTEM_TYPE => ({
        pipe: () => ({ toPromise: () => ({}) })
      })
    });
    const externalPaymentServiceStub = () => ({
      payWithApplePay: (oRDERS_WITH_APPLE_PAY, orderData) => ({
        then: () => ({ catch: () => ({ finally: () => ({}) }) })
      }),
      addUSAePayCreditCard: () => ({})
    });
    const toastServiceStub = () => ({
      showToast: object => ({}),
      showError: message => ({})
    });
    const navigationServiceStub = () => ({ navigate: (array, object) => ({}) });
    const connectionServiceStub = () => ({
      networkStatus: () => ({ subscribe: f => f({}) })
    });
    const checkingProcessStub = () => ({
      start: (object, isExistingOrder) => ({})
    });
    const nonCheckingServiceStub = () => ({ setSummary: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CartComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: CartService, useFactory: cartServiceStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        {
          provide: ExternalPaymentService,
          useFactory: externalPaymentServiceStub
        },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: NavigationService, useFactory: navigationServiceStub },
        { provide: ConnectionService, useFactory: connectionServiceStub },
        { provide: CheckingProcess, useFactory: checkingProcessStub },
        { provide: NonCheckingService, useFactory: nonCheckingServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`placingOrder has default value`, () => {
    expect(component.placingOrder).toEqual(false);
  });

  it(`isProcessingOrder has default value`, () => {
    expect(component.isProcessingOrder).toEqual(false);
  });

  it(`isOnline has default value`, () => {
    expect(component.isOnline).toEqual(true);
  });

  describe('showModal', () => {
    it('makes expected calls', () => {
      const orderInfoStub: OrderInfo = <any>{};
      const navigationServiceStub: NavigationService = fixture.debugElement.injector.get(
        NavigationService
      );
      const checkingProcessStub: CheckingProcess = fixture.debugElement.injector.get(
        CheckingProcess
      );
      const nonCheckingServiceStub: NonCheckingService = fixture.debugElement.injector.get(
        NonCheckingService
      );
     jest.spyOn(navigationServiceStub, 'navigate');
     jest.spyOn(checkingProcessStub, 'start');
     jest.spyOn(nonCheckingServiceStub, 'setSummary');
      component.showModal(orderInfoStub);
      expect(navigationServiceStub.navigate).toHaveBeenCalled();
      expect(checkingProcessStub.start).toHaveBeenCalled();
      expect(nonCheckingServiceStub.setSummary).toHaveBeenCalled();
    });
  });

  describe('ionViewWillEnter', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
     jest.spyOn(changeDetectorRefStub, 'detectChanges');
      component.ionViewWillEnter();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const userFacadeServiceStub: UserFacadeService = fixture.debugElement.injector.get(
        UserFacadeService
      );
     jest.spyOn(component, 'initAddressModalConfig');
     jest.spyOn(component, 'subscribe2NetworkChanges');
     jest.spyOn(userFacadeServiceStub, 'isApplePayEnabled$');
      component.ngOnInit();
      expect(component.initAddressModalConfig).toHaveBeenCalled();
      expect(component.subscribe2NetworkChanges).toHaveBeenCalled();
      expect(userFacadeServiceStub.isApplePayEnabled$).toHaveBeenCalled();
    });
  });

  describe('subscribe2NetworkChanges', () => {
    it('makes expected calls', () => {
      const connectionServiceStub: ConnectionService = fixture.debugElement.injector.get(
        ConnectionService
      );
     jest.spyOn(connectionServiceStub, 'networkStatus');
      component.subscribe2NetworkChanges();
      expect(connectionServiceStub.networkStatus).toHaveBeenCalled();
    });
  });

  describe('initAddressModalConfig', () => {
    it('makes expected calls', () => {
      const merchantServiceStub: MerchantService = fixture.debugElement.injector.get(
        MerchantService
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
     jest.spyOn(merchantServiceStub, 'retrieveBuildings');
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(loadingServiceStub, 'closeSpinner');
      component.initAddressModalConfig();
      expect(merchantServiceStub.retrieveBuildings).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });
});

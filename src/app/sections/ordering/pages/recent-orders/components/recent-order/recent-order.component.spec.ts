import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MerchantService } from '@sections/ordering';
import { PopoverController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CartService } from '@sections/ordering/services/cart.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { CheckingProcess } from '@sections/check-in/services/check-in-process-builder';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { RecentOrderComponent } from './recent-order.component';

describe('RecentOrderComponent', () => {
  let component: RecentOrderComponent;
  let fixture: ComponentFixture<RecentOrderComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({ snapshot: { params: { id: {} } } });
    const routerStub = () => ({ navigate: array => ({}) });
    const merchantServiceStub = () => ({
      extractAllAvailableMenuItemsFromMenu: menu => ({ find: () => ({}) }),
      recentOrders$: { pipe: () => ({}) },
      menuMerchants$: { pipe: () => ({}) },
      extractAllAvailableMenuItemOptionsFromMenuItem: menuItem => ({
        find: () => ({})
      }),
      retrievePickupLocations: (storeAddress, arg) => ({ pipe: () => ({}) }),
      retrieveUserAddressList: () => ({ pipe: () => ({}) }),
      cancelOrderById: id => ({}),
      orderTypes: {}
    });
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const alertControllerStub = () => ({
      create: object => ({ present: () => ({}) })
    });
    const cartServiceStub = () => ({
      menuInfo$: {},
      clearCart: () => ({}),
      setActiveMerchant: merchant => ({}),
      setActiveMerchantsMenuByOrderOptions: (
        dueTime,
        orderType,
        address,
        isASAP
      ) => ({}),
      addOrderItems: orderItems => ({}),
      updateOrderNote: notes => ({}),
      validateReOrderItems: () => ({ pipe: () => ({}) }),
      onAddItems: object => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({ bind: () => ({}) })
    });
    const orderingServiceStub = () => ({
      getContentStringByName: buttonClose => ({})
    });
    const userFacadeServiceStub = () => ({ getUserData$: () => ({}) });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const modalsServiceStub = () => ({
      createAlert: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      }),
      createActionSheet: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const institutionFacadeServiceStub = () => ({
      cachedInstitutionInfo$: { pipe: () => ({}) }
    });
    const checkingProcessStub = () => ({ start: arg => ({}) });
    const checkingServiceFacadeStub = () => ({
      navedFromCheckin: {},
      getContentStringByName$: string => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RecentOrderComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: CartService, useFactory: cartServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: ModalsService, useFactory: modalsServiceStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        { provide: CheckingProcess, useFactory: checkingProcessStub },
        {
          provide: CheckingServiceFacade,
          useFactory: checkingServiceFacadeStub
        }
      ]
    });
    fixture = TestBed.createComponent(RecentOrderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initData').and.callThrough();
      component.ngOnInit();
      expect(component.initData).toHaveBeenCalled();
    });
  });

  describe('ionViewWillEnter', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initData').and.callThrough();
      component.ionViewWillEnter();
      expect(component.initData).toHaveBeenCalled();
    });
  });

  describe('resolveMenuItemsInOrder', () => {
    it('makes expected calls', () => {
      const merchantServiceStub: MerchantService = fixture.debugElement.injector.get(
        MerchantService
      );
      spyOn(
        merchantServiceStub,
        'extractAllAvailableMenuItemsFromMenu'
      ).and.callThrough();
      component.resolveMenuItemsInOrder();
      expect(
        merchantServiceStub.extractAllAvailableMenuItemsFromMenu
      ).toHaveBeenCalled();
    });
  });

  describe('back', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.back();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('openChecking', () => {
    it('makes expected calls', () => {
      const checkingProcessStub: CheckingProcess = fixture.debugElement.injector.get(
        CheckingProcess
      );
      spyOn(checkingProcessStub, 'start').and.callThrough();
      component.openChecking();
      expect(checkingProcessStub.start).toHaveBeenCalled();
    });
  });

  describe('onClosed', () => {
    it('makes expected calls', () => {
      spyOn(component, 'openChecking').and.callThrough();
      spyOn(component, 'back').and.callThrough();
      component.onClosed();
      expect(component.openChecking).toHaveBeenCalled();
      expect(component.back).toHaveBeenCalled();
    });
  });

  describe('onAddItems', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const cartServiceStub: CartService = fixture.debugElement.injector.get(
        CartService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(cartServiceStub, 'onAddItems').and.callThrough();
      component.onAddItems();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(cartServiceStub.onAddItems).toHaveBeenCalled();
    });
  });
});

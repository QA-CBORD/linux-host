import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CoordsService } from '@core/service/coords/coords.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { CartService } from '@sections/ordering';
import { MerchantService } from '@sections/ordering';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { CheckInPendingComponent } from './check-in-pending.component';

describe('CheckInPendingComponent', () => {
  let component: CheckInPendingComponent;
  let fixture: ComponentFixture<CheckInPendingComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const activatedRouteStub = () => ({
      snapshot: { queryParams: { path: { includes: () => ({}) } } },
      data: { subscribe: f => f({}) }
    });
    const routerStub = () => ({ navigate: (array, object) => ({}) });
    const coordsServiceStub = () => ({ location$: { subscribe: f => f({}) } });
    const loadingServiceStub = () => ({
      closeSpinner: () => ({}),
      showSpinner: () => ({})
    });
    const alertControllerStub = () => ({});
    const modalControllerStub = () => ({
      create: object => ({
        present: () => ({}),
        onDidDismiss: () => ({ then: () => ({}) })
      })
    });
    const platformStub = () => ({
      backButton: { subscribeWithPriority: () => ({}) }
    });
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const checkingServiceFacadeStub = () => ({
      navedFromCheckin: {},
      checkInOrderByBarcode: (orderId, scanCodeResult) => ({
        pipe: () => ({
          toPromise: () => ({ then: () => ({ catch: () => ({}) }) })
        })
      }),
      checkInOrderByLocation: orderId => ({
        toPromise: () => ({ then: () => ({ catch: () => ({}) }) })
      })
    });
    const cartServiceStub = () => ({ orderDetailsOptions$: {} });
    const merchantServiceStub = () => ({
      recentOrders$: {
        pipe: () => ({ toPromise: () => ({ find: () => ({}) }) })
      }
    });
    const recentOrdersResolverStub = () => ({
      resolve: () => ({ then: () => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CheckInPendingComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: CoordsService, useFactory: coordsServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: Platform, useFactory: platformStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        {
          provide: CheckingServiceFacade,
          useFactory: checkingServiceFacadeStub
        },
        { provide: CartService, useFactory: cartServiceStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: RecentOrdersResolver, useFactory: recentOrdersResolverStub }
      ]
    });
    fixture = TestBed.createComponent(CheckInPendingComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ionViewWillEnter', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      spyOn(changeDetectorRefStub, 'detectChanges').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      component.ionViewWillEnter();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });

  describe('onCheckingClicked', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
      spyOn(popoverControllerStub, 'create').and.callThrough();
      component.onCheckingClicked();
      expect(popoverControllerStub.create).toHaveBeenCalled();
    });
  });

  describe('onClosed', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const recentOrdersResolverStub: RecentOrdersResolver = fixture.debugElement.injector.get(
        RecentOrdersResolver
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(recentOrdersResolverStub, 'resolve').and.callThrough();
      component.onClosed();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(recentOrdersResolverStub.resolve).toHaveBeenCalled();
    });
  });

  describe('goToOrderDetails', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const recentOrdersResolverStub: RecentOrdersResolver = fixture.debugElement.injector.get(
        RecentOrdersResolver
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(recentOrdersResolverStub, 'resolve').and.callThrough();
      component.goToOrderDetails();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(recentOrdersResolverStub.resolve).toHaveBeenCalled();
    });
  });

  describe('onScanCode', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      const checkingServiceFacadeStub: CheckingServiceFacade = fixture.debugElement.injector.get(
        CheckingServiceFacade
      );
      spyOn(modalControllerStub, 'create').and.callThrough();
      spyOn(
        checkingServiceFacadeStub,
        'checkInOrderByBarcode'
      ).and.callThrough();
      component.onScanCode();
      expect(modalControllerStub.create).toHaveBeenCalled();
      expect(
        checkingServiceFacadeStub.checkInOrderByBarcode
      ).toHaveBeenCalled();
    });
  });

  describe('onLocationCheckinClicked', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const checkingServiceFacadeStub: CheckingServiceFacade = fixture.debugElement.injector.get(
        CheckingServiceFacade
      );
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(
        checkingServiceFacadeStub,
        'checkInOrderByLocation'
      ).and.callThrough();
      component.onLocationCheckinClicked();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(
        checkingServiceFacadeStub.checkInOrderByLocation
      ).toHaveBeenCalled();
    });
  });
});

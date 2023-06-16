import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@sections/ordering';
import { MerchantService } from '@sections/ordering';
import { OrderInfo } from '@sections/ordering';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { CheckingProcess } from '@sections/check-in/services/check-in-process-builder';
import { LoadingService } from '@core/service/loading/loading.service';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { DateUtilObject } from '@sections/accounts/shared/ui-components/filter/date-util';
import { RecentOrdersComponent } from './recent-orders.component';

describe('RecentOrdersComponent', () => {
  let component: RecentOrdersComponent;
  let fixture: ComponentFixture<RecentOrdersComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const cartServiceStub = () => ({ currentOrderId: {} });
    const merchantServiceStub = () => ({
      getRecentOrdersPeriod: () => ({
        pipe: () => ({ subscribe: f => f({}) })
      }),
      recentOrders$: {},
      period: {},
      orderStatus: {}
    });
    const orderingServiceStub = () => ({
      getContentStringByName: buttonDashboardStartOrder => ({})
    });
    const checkingProcessStub = () => ({ start: (orderInfo, arg) => ({}) });
    const loadingServiceStub = () => ({
      closeSpinner: () => ({}),
      showSpinner: () => ({})
    });
    const checkingServiceFacadeStub = () => ({
      getContentStringByName: string => ({ toPromise: () => ({}) })
    });
    const modalsServiceStub = () => ({
      createActionSheet: (object, arg) => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RecentOrdersComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: CartService, useFactory: cartServiceStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: CheckingProcess, useFactory: checkingProcessStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        {
          provide: CheckingServiceFacade,
          useFactory: checkingServiceFacadeStub
        },
        { provide: ModalsService, useFactory: modalsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(RecentOrdersComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onOrderPicked', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const orderInfoStub: OrderInfo = <any>{};
     jest.spyOn(routerStub, 'navigate');
      component.onOrderPicked(orderInfoStub);
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('back', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
     jest.spyOn(routerStub, 'navigate');
      component.back();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
     jest.spyOn(routerStub, 'navigate');
     jest.spyOn(loadingServiceStub, 'showSpinner');
      component.close();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
    });
  });

  describe('onFilter', () => {
    it('makes expected calls', () => {
      const modalsServiceStub: ModalsService = fixture.debugElement.injector.get(
        ModalsService
      );
     jest.spyOn(component, 'filterChange');
     jest.spyOn(modalsServiceStub, 'createActionSheet');
      component.onFilter();
      expect(component.filterChange).toHaveBeenCalled();
      expect(modalsServiceStub.createActionSheet).toHaveBeenCalled();
    });
  });
});

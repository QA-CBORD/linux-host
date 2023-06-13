import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { MerchantService } from '@sections/ordering';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { CheckInSuccessComponent } from './check-in-success.component';

describe('CheckInSuccessComponent', () => {
  let component: CheckInSuccessComponent;
  let fixture: ComponentFixture<CheckInSuccessComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { data: { data: { contentString: {} } } },
      queryParams: { subscribe: f => f({}) }
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const nativeStartupFacadeServiceStub = () => ({
      blockGlobalNavigationStatus: {}
    });
    const merchantServiceStub = () => ({ recentOrders$: { pipe: () => ({}) } });
    const recentOrdersResolverStub = () => ({ resolve: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CheckInSuccessComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        {
          provide: NativeStartupFacadeService,
          useFactory: nativeStartupFacadeServiceStub
        },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: RecentOrdersResolver, useFactory: recentOrdersResolverStub }
      ]
    });
    fixture = TestBed.createComponent(CheckInSuccessComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initContentString').and.callThrough();
      component.ngOnInit();
      expect(component.initContentString).toHaveBeenCalled();
    });
  });

  describe('ionViewWillLeave', () => {
    it('makes expected calls', () => {
      const recentOrdersResolverStub: RecentOrdersResolver = fixture.debugElement.injector.get(
        RecentOrdersResolver
      );
      spyOn(recentOrdersResolverStub, 'resolve').and.callThrough();
      component.ionViewWillLeave();
      expect(recentOrdersResolverStub.resolve).toHaveBeenCalled();
    });
  });

  describe('goToRecentOrders', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.goToRecentOrders();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});

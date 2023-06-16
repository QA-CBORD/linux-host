import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MerchantInfo } from '@sections/ordering';
import { MerchantService } from '@sections/ordering';
import { Router } from '@angular/router';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { OrderTileComponent } from './order-tile.component';

describe('OrderTileComponent', () => {
  let component: OrderTileComponent;
  let fixture: ComponentFixture<OrderTileComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const merchantServiceStub = () => ({
      getMerchantsWithFavoriteInfo: () => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    const routerStub = () => ({ navigate: (array, object) => ({}) });
    const environmentFacadeServiceStub = () => ({});
    const toastServiceStub = () => ({ showError: isWalkOut => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrderTileComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: Router, useFactory: routerStub },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    fixture = TestBed.createComponent(OrderTileComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`amountPerSlide has default value`, () => {
    expect(component.amountPerSlide).toEqual(1);
  });

  it(`slides has default value`, () => {
    expect(component.slides).toEqual([]);
  });

  it(`skeletonArray has default value`, () => {
    expect(component.skeletonArray).toEqual([]);
  });

  it(`isLoading has default value`, () => {
    expect(component.isLoading).toEqual(true);
  });

  describe('goToMerchant', () => {
    it('makes expected calls', () => {
      const merchantInfoStub: MerchantInfo = <any>{};
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
     jest.spyOn(routerStub, 'navigate');
     jest.spyOn(toastServiceStub, 'showError');
      component.goToMerchant(merchantInfoStub);
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(toastServiceStub.showError).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'initMerchantSlides');
      component.ngOnInit();
      expect(component.initMerchantSlides).toHaveBeenCalled();
    });
  });

  describe('initMerchantSlides', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const merchantServiceStub: MerchantService = fixture.debugElement.injector.get(
        MerchantService
      );
     jest.spyOn(changeDetectorRefStub, 'detectChanges');
     jest.spyOn(
        merchantServiceStub,
        'getMerchantsWithFavoriteInfo'
      );
      component.initMerchantSlides();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
      expect(
        merchantServiceStub.getMerchantsWithFavoriteInfo
      ).toHaveBeenCalled();
    });
  });
});

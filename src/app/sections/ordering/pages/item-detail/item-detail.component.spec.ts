import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@sections/ordering';
import { LoadingService } from '@core/service/loading/loading.service';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { NavigationService } from '@shared/services/navigation.service';
import { ItemDetailComponent } from './item-detail.component';

describe('ItemDetailComponent', () => {
  let component: ItemDetailComponent;
  let fixture: ComponentFixture<ItemDetailComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const activatedRouteStub = () => ({ data: { subscribe: f => f({}) } });
    const cartServiceStub = () => ({
      menuInfo$: {},
      orderItems$: { pipe: () => ({ toPromise: () => ({ length: {} }) }) },
      removeOrderItemFromOrderById: orderItemId => ({}),
      addOrderItems: menuItem => ({}),
      validateOrder: () => ({
        pipe: () => ({
          toPromise: () => ({
            then: () => ({ catch: () => ({ finally: () => ({}) }) })
          })
        })
      }),
      cartsErrorMessage: {},
      removeLastOrderItem: () => ({}),
      menuItems$: { pipe: () => ({ subscribe: f => f({}) }) },
      merchant$: {},
      orderInfo$: { pipe: () => ({ subscribe: f => f({}) }) }
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const orderingServiceStub = () => ({
      getContentStringByName: buttonAdd => ({})
    });
    const environmentFacadeServiceStub = () => ({ getImageURL: () => ({}) });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const navigationServiceStub = () => ({ navigate: (array, object) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ItemDetailComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: CartService, useFactory: cartServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: NavigationService, useFactory: navigationServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ItemDetailComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`errorState has default value`, () => {
    expect(component.errorState).toEqual(false);
  });

  it(`cartOrderItemOptions has default value`, () => {
    expect(component.cartOrderItemOptions).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
     jest.spyOn(component, 'calculateTotalPrice');
     jest.spyOn(changeDetectorRefStub, 'detectChanges');
      component.ngOnInit();
      expect(component.calculateTotalPrice).toHaveBeenCalled();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
    });
  });

  describe('navigateToFullMenu', () => {
    it('makes expected calls', () => {
      const navigationServiceStub: NavigationService = fixture.debugElement.injector.get(
        NavigationService
      );
     jest.spyOn(navigationServiceStub, 'navigate');
      component.navigateToFullMenu();
      expect(navigationServiceStub.navigate).toHaveBeenCalled();
    });
  });

  describe('onClose', () => {
    it('makes expected calls', () => {
      const navigationServiceStub: NavigationService = fixture.debugElement.injector.get(
        NavigationService
      );
     jest.spyOn(navigationServiceStub, 'navigate');
      component.onClose();
      expect(navigationServiceStub.navigate).toHaveBeenCalled();
    });
  });

  describe('initForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
     jest.spyOn(formBuilderStub, 'group');
      component.initForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('removeItems', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'calculateTotalPrice');
      component.removeItems();
      expect(component.calculateTotalPrice).toHaveBeenCalled();
    });
  });

  describe('addItems', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'calculateTotalPrice');
      component.addItems();
      expect(component.calculateTotalPrice).toHaveBeenCalled();
    });
  });
});

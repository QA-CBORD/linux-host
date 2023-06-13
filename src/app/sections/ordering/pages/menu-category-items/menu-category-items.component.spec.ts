import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@sections/ordering/services';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '@core/service/loading/loading.service';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ToastService } from '@core/service/toast/toast.service';
import { NavigationService } from '@shared/services/navigation.service';
import { MenuCategoryItemsComponent } from './menu-category-items.component';

describe('MenuCategoryItemsComponent', () => {
  let component: MenuCategoryItemsComponent;
  let fixture: ComponentFixture<MenuCategoryItemsComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const activatedRouteStub = () => ({
      snapshot: { queryParams: {} },
      params: {}
    });
    const cartServiceStub = () => ({
      menuInfo$: {},
      menuItems$: { pipe: () => ({}) },
      cartsErrorMessage: {},
      validateOrder: () => ({
        pipe: () => ({
          toPromise: () => ({
            then: () => ({ catch: () => ({ finally: () => ({}) }) })
          })
        })
      })
    });
    const alertControllerStub = () => ({
      create: object => ({ present: () => ({}) })
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const orderingServiceStub = () => ({
      getContentStringByName: labelSearch => ({})
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const navigationServiceStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MenuCategoryItemsComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: CartService, useFactory: cartServiceStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: NavigationService, useFactory: navigationServiceStub }
      ]
    });
    fixture = TestBed.createComponent(MenuCategoryItemsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`searchState has default value`, () => {
    expect(component.searchState).toEqual(false);
  });

  it(`filteredMenuCategoryItems has default value`, () => {
    expect(component.filteredMenuCategoryItems).toEqual([]);
  });

  describe('ionViewWillEnter', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      spyOn(changeDetectorRefStub, 'detectChanges').and.callThrough();
      component.ionViewWillEnter();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
    });
  });

  describe('onBackBtnClicked', () => {
    it('makes expected calls', () => {
      const navigationServiceStub: NavigationService = fixture.debugElement.injector.get(
        NavigationService
      );
      spyOn(navigationServiceStub, 'navigate').and.callThrough();
      component.onBackBtnClicked();
      expect(navigationServiceStub.navigate).toHaveBeenCalled();
    });
  });

  describe('redirectToCart', () => {
    it('makes expected calls', () => {
      const cartServiceStub: CartService = fixture.debugElement.injector.get(
        CartService
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const navigationServiceStub: NavigationService = fixture.debugElement.injector.get(
        NavigationService
      );
      spyOn(cartServiceStub, 'validateOrder').and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      spyOn(navigationServiceStub, 'navigate').and.callThrough();
      component.redirectToCart();
      expect(cartServiceStub.validateOrder).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(navigationServiceStub.navigate).toHaveBeenCalled();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { FavoriteMerchantsService } from './services/favorite-merchants.service';
import { MerchantInfo } from '../../shared/models';
import { CartService } from '../../services';
import { MerchantService } from '../../services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { FavoriteMerchantsComponent } from './favorite-merchants.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FavoriteMerchantsComponent', () => {
  let component: FavoriteMerchantsComponent;
  let fixture: ComponentFixture<FavoriteMerchantsComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const activatedRouteStub = () => ({ data: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: array => ({}) });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const favoriteMerchantsServiceStub = () => ({
      getFavoriteMerchants: () => ({})
    });
    const cartServiceStub = () => ({
      setActiveMerchant: merchant => ({}),
      setActiveMerchantsMenuByOrderOptions: (
        dueTime,
        orderType,
        address,
        isASAP
      ) => ({})
    });
    const merchantServiceStub = () => ({
      removeFavoriteMerchant: id => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    const orderingServiceStub = () => ({
      getContentStringByName: backToOrdering => ({})
    });
    const toastServiceStub = () => ({
      showError: isWalkOut => ({}),
      showToast: object => ({})
    });
    const modalsServiceStub = () => ({
      createActionSheet: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FavoriteMerchantsComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        {
          provide: FavoriteMerchantsService,
          useFactory: favoriteMerchantsServiceStub
        },
        { provide: CartService, useFactory: cartServiceStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: ModalsService, useFactory: modalsServiceStub }
      ],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(FavoriteMerchantsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`merchantList has default value`, () => {
    expect(component.merchantList).toEqual([]);
  });

  describe('backToOrdering', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
     jest.spyOn(routerStub, 'navigate');
      component.backToOrdering();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});

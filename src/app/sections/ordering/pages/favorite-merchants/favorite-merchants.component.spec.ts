import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { FavoriteMerchantsService } from './services/favorite-merchants.service';
import { CartService, OrderDetailOptions } from '../../services';
import { MerchantService } from '../../services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { FavoriteMerchantsComponent } from './favorite-merchants.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@ionic/storage-angular';
import { AlertController, AngularDelegate, ModalController, PopoverController } from '@ionic/angular';
import { of } from 'rxjs';
import { LockDownService, NavigationService } from '@shared/index';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { AddressInfo } from 'net';
import { ActiveCartService } from '@sections/ordering/services/active-cart.service';

describe('FavoriteMerchantsComponent', () => {
  let component: FavoriteMerchantsComponent;
  let fixture: ComponentFixture<FavoriteMerchantsComponent>;

  const mockCartService = {
    merchant$: of({}),
    menuItems$: of(0),
    showActiveCartWarning: jest.fn(),
    orderDetailsOptions$: of({
      orderType: ORDER_TYPE.PICKUP,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    } as unknown as OrderDetailOptions),
  };
  const mockActiveCartService = {
    preValidateOrderFlow: jest.fn(),

  }
  const lockDownService = {
    isLockDownOn: jest.fn(),
    loadStringsAndSettings: jest.fn(),
  };
  const toastService = { showError: jest.fn(), showToast: jest.fn() };
  const routingService = { navigate: jest.fn() };

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const activatedRouteStub = () => ({ data: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: array => ({}) });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({}),
    });
    const favoriteMerchantsServiceStub = () => ({
      getFavoriteMerchants: () => ({}),
    });
    const merchantServiceStub = () => ({
      removeFavoriteMerchant: id => ({
        pipe: () => ({ subscribe: f => f({}) }),
      }),
    });
    const orderingServiceStub = () => ({
      getContentStringByName: backToOrdering => ({}),
    });
    const modalsServiceStub = () => ({
      createActionSheet: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({}),
      }),
    });
    const alertControllerStub = () => ({
      create: () => ({}),
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
          useFactory: favoriteMerchantsServiceStub,
        },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: ModalsService, useFactory: modalsServiceStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: LockDownService, useValue: lockDownService },
        { provide: ToastService, useValue: toastService },
        { provide: CartService, useValue: mockCartService },
        { provide: NavigationService, useValue: routingService },
        { provide: ActiveCartService, useValue: mockActiveCartService },
        ModalController,
        Storage,
        AngularDelegate,
        PopoverController,
      ],
      imports: [HttpClientTestingModule],
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

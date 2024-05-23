import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CartPreviewComponent } from './cart-preview.component';
import { CartService, MerchantService, OrderDetailOptions } from '@sections/ordering/services';
import { NavigationService } from '@shared/index';
import { ModalsService } from '@core/service/modals/modals.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { OrderItemDetailsModule } from '@sections/ordering/shared/ui-components/order-item-details/order-item-details.module';
import { StHeaderModule } from '@shared/ui-components';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FullMenuComponent } from '@sections/ordering/pages/full-menu/full-menu.component';
import { ORDER_ERROR_CODES, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { AddressInfo } from '@core/model/address/address-info';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { Schedule } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';

describe('CartPreviewComponent', () => {
  let component: CartPreviewComponent;
  let fixture: ComponentFixture<CartPreviewComponent>;
  let cartServiceStub: Partial<CartService>;
  let navigationServiceStub: Partial<NavigationService>;
  let alertControllerStub: Partial<AlertController>;
  let modalsServiceMock: Partial<ModalsService>;
  let loadingServiceStub: Partial<LoadingService>;
  let toastServiceStub: Partial<ToastService>;
  let merchantServiceStub: Partial<MerchantService>;
  let orderingService: Partial<OrderingService>;

  beforeEach(waitForAsync(() => {
    cartServiceStub = {
      orderInfo$: new BehaviorSubject<any>({ orderItems: [], mealBased: true }),
      merchant$: new BehaviorSubject<any>({ name: 'Mock Merchant' }),
      cartsErrorMessage: null,
      isExistingOrder: false,
      validateOrder: jest.fn(),
      orderDetailsOptions$: of({
        address: {} as AddressInfo,
        isASAP: true,
        orderType: ORDER_TYPE.PICKUP,
      } as OrderDetailOptions),
    };

    loadingServiceStub = {
      closeSpinner: jest.fn(),
      showSpinner: jest.fn(),
    };

    modalsServiceMock = {
      dismiss: jest.fn(),
    };

    navigationServiceStub = {
      navigate: jest.fn(),
    };

    merchantServiceStub = {
      getMerchantOrderSchedule: jest.fn().mockReturnValue(of({})),
    };

    alertControllerStub = {
      create: jest.fn().mockResolvedValue({ present: jest.fn(), onDidDismiss: jest.fn().mockResolvedValue(true) }),
      dismiss: jest.fn(),
    };

    orderingService = {
      validateOrder: jest.fn(),
      redirectToCart: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [PriceUnitsResolverPipe],
      imports: [
        IonicModule,
        StHeaderModule,
        TranslateModule.forRoot(),
        OrderItemDetailsModule,
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: 'patron/ordering/full-menu', component: FullMenuComponent }]),
      ],
      providers: [
        { provide: CartService, useValue: cartServiceStub },
        { provide: NavigationService, useValue: navigationServiceStub },
        { provide: AlertController, useValue: alertControllerStub },
        { provide: ModalsService, useValue: modalsServiceMock },
        { provide: LoadingService, useValue: loadingServiceStub },
        { provide: ToastService, useValue: toastServiceStub },
        { provide: MerchantService, useValue: merchantServiceStub },
        { provide: OrderingService, useValue: orderingService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CartPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss cart preview when onClose is tapped', () => {
    const modalServiceSpy = jest.spyOn(modalsServiceMock, 'dismiss');
    component.onClose();
    expect(modalServiceSpy).toHaveBeenCalled();
  });
  it('should confirm the cart removal before proceeding', () => {
    const alertController = jest.spyOn(alertControllerStub, 'create');
    component.removeCart();
    expect(alertController).toHaveBeenCalled();
  });

  it('should validate order successfully', async () => {
    await component.validateOrder();

    expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
    expect(cartServiceStub.validateOrder).toHaveBeenCalled();
    expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    expect(component.hasErrors).toBeFalsy();
  });

  it('should handle error when validating order', async () => {
    const error = { message: ORDER_ERROR_CODES.INVALID_ORDER };
    cartServiceStub.validateOrder = jest.fn().mockReturnValue(throwError(() => new Error('9010|error')));

    await component.validateOrder();

    expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
    expect(cartServiceStub.validateOrder).toHaveBeenCalled();
    expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    expect(component.hasErrors).toBeTruthy();
  });
});

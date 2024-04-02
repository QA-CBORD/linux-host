import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CartPreviewComponent } from './cart-preview.component';
import { CartService } from '@sections/ordering/services';
import { NavigationService } from '@shared/index';
import { ModalsService } from '@core/service/modals/modals.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { OrderItemDetailsModule } from '@sections/ordering/shared/ui-components/order-item-details/order-item-details.module';
import { StHeaderModule } from '@shared/ui-components';
import { BehaviorSubject } from 'rxjs';

describe('CartPreviewComponent', () => {
  let component: CartPreviewComponent;
  let fixture: ComponentFixture<CartPreviewComponent>;
  let cartServiceStub: Partial<CartService>;
  let navigationServiceStub: Partial<NavigationService>;
  let alertControllerStub: Partial<AlertController>;
  let modalsServiceMuck: Partial<ModalsService>;
  let loadingServiceStub: Partial<LoadingService>;
  let toastServiceStub: Partial<ToastService>;

  beforeEach(waitForAsync(() => {
    cartServiceStub = {
      orderInfo$: new BehaviorSubject<any>({ orderItems: [], mealBased: true }),
      merchant$: new BehaviorSubject<any>({ name: 'Mock Merchant' }),
      cartsErrorMessage: null,
      isExistingOrder: false,
      validateOrder: () => new BehaviorSubject(null),
    };

    // navigationServiceStub = {
    //   navigate: () => Promise.resolve(),
    // };

    // alertControllerStub = {
    //   create: () => Promise.resolve(),
    // };

    modalsServiceMuck = {
      dismiss: jest.fn()
    };

    // loadingServiceStub = {
    //   showSpinner: () => {},
    //   closeSpinner: () => {},
    // };

    // toastServiceStub = {
    //   showToast: () => Promise.resolve(),
    // };

    TestBed.configureTestingModule({
      declarations: [PriceUnitsResolverPipe],
      imports: [IonicModule, StHeaderModule, TranslateModule.forRoot(), OrderItemDetailsModule, CommonModule],
      providers: [
        { provide: CartService, useValue: cartServiceStub },
        { provide: NavigationService, useValue: navigationServiceStub },
        { provide: AlertController, useValue: alertControllerStub },
        { provide: ModalsService, useValue: modalsServiceMuck },
        { provide: LoadingService, useValue: loadingServiceStub },
        { provide: ToastService, useValue: toastServiceStub },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CartPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call modalService.dismiss() when onClose is called', () => {
    const modalServiceSpy = jest.spyOn(modalsServiceMuck, 'dismiss');
    component.onClose();
    expect(modalServiceSpy).toHaveBeenCalled();
  });
});

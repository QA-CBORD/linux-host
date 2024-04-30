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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FullMenuComponent } from '@sections/ordering/pages/full-menu/full-menu.component';

describe('CartPreviewComponent', () => {
  let component: CartPreviewComponent;
  let fixture: ComponentFixture<CartPreviewComponent>;
  let cartServiceStub: Partial<CartService>;
  let navigationServiceStub: Partial<NavigationService>;
  let alertControllerStub: Partial<AlertController>;
  let modalsServiceMock: Partial<ModalsService>;
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

    modalsServiceMock = {
      dismiss: jest.fn(),
    };

    navigationServiceStub = {
      navigate: jest.fn(),
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

  it('should navigate to full menu when addMoreItems is tapped', async () => {
    const routerSpy = jest.spyOn(navigationServiceStub, 'navigate').mockResolvedValue(true);
    await component.addMoreItems();
    expect(routerSpy).toHaveBeenCalledWith(["ordering","full-menu"], { queryParams: { isExistingOrder: true } });
  });

  it('should dismiss cart preview after navigating to full menu', async () => {
    const modalServiceSpy = jest.spyOn(modalsServiceMock, 'dismiss');
    const routerSpy = jest.spyOn(navigationServiceStub, 'navigate').mockResolvedValue(true);
    await component.addMoreItems();
    expect(routerSpy).toHaveBeenCalled();
    expect(modalServiceSpy).toHaveBeenCalled();
  });

  it('should not dismiss cart preview if it did not navigate to full menu', async () => {
    const modalServiceSpy = jest.spyOn(modalsServiceMock, 'dismiss');
    const routerSpy = jest.spyOn(navigationServiceStub, 'navigate').mockResolvedValue(false);
    await component.addMoreItems();
    expect(routerSpy).toHaveBeenCalled();
    expect(modalServiceSpy).not.toHaveBeenCalled();
  });
});

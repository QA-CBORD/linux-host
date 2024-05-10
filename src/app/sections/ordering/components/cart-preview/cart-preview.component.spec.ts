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
import { BehaviorSubject, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FullMenuComponent } from '@sections/ordering/pages/full-menu/full-menu.component';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { AddressInfo } from '@core/model/address/address-info';
import { OrderingService } from '@sections/ordering/services/ordering.service';

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
  let orderingServiceStub: Partial<OrderingService>;

  beforeEach(waitForAsync(() => {
    cartServiceStub = {
      orderInfo$: new BehaviorSubject<any>({ orderItems: [], mealBased: true }),
      merchant$: new BehaviorSubject<any>({ name: 'Mock Merchant' }),
      cartsErrorMessage: null,
      isExistingOrder: false,
      validateOrder: () => new BehaviorSubject(null),
      orderDetailsOptions$: of({
        address: {} as AddressInfo,
        isASAP: true,
        orderType: ORDER_TYPE.PICKUP,
      } as OrderDetailOptions),
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

    orderingServiceStub = {
      validateOrder: jest.fn(),
      redirectToCart : jest.fn()
    }

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
        { provide: OrderingService, useValue: orderingServiceStub },
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

  it('should return true if isASAP is true', () => {
    const result = component.isOrderTimeValid(true, '2022-01-01T12:00:00');
    expect(result).toBe(true);
  });

  it('should return true if the order time is within the schedule', () => {
    component.orderSchedule = {
      menuSchedule: [],
      days: [
        {
          date: '2024-05-08',
          dayOfWeek: 4,
          hourBlocks: [
            {
              timestamps: [],
              hour: 12,
              minuteBlocks: [0, 15, 30, 45],
            },
          ],
        },
      ],
    };
    const result = component.isOrderTimeValid(false, '2024-05-08T12:00:00');
    expect(result).toBe(true);
  });

  it('should return false if the order time is not within the schedule', () => {
    component.orderSchedule = {
      menuSchedule: [],
      days: [
        {
          date: '2024-05-08',
          dayOfWeek: 4,
          hourBlocks: [
            {
              timestamps: [],
              hour: 12,
              minuteBlocks: [45],
            },
          ],
        },
      ],
    };
    const result = component.isOrderTimeValid(false, '2024-05-08T12:00:00');
    expect(result).toBe(false);
  });

  it('should navigate to full menu when addMoreItems is tapped and order is ASAP', async () => {
    jest
      .spyOn(cartServiceStub.orderDetailsOptions$, 'pipe')
      .mockReturnValue(
        of({ address: {} as AddressInfo, isASAP: true, orderType: ORDER_TYPE.PICKUP } as OrderDetailOptions)
      );

    const routerSpy = jest.spyOn(navigationServiceStub, 'navigate').mockResolvedValue(true);
    await component.addMoreItems();
    expect(routerSpy).toHaveBeenCalledWith(['ordering', 'full-menu'], {
      queryParams: { isExistingOrder: true, canDismiss: true, openTimeSlot: undefined },
    });
  });

  it('should navigate to full menu when addMoreItems is tapped, order is not ASAP and time has passed', async () => {
    component.orderSchedule = {
      menuSchedule: [],
      days: [
        {
          date: '2024-05-08',
          dayOfWeek: 4,
          hourBlocks: [
            {
              timestamps: [],
              hour: 12,
              minuteBlocks: [45],
            },
          ],
        },
      ],
    };
    const alertController = jest.spyOn(alertControllerStub, 'create');
    const validateTimeSpy = jest.spyOn(component, 'isOrderTimeValid').mockReturnValue(false);
    const routerSpy = jest.spyOn(navigationServiceStub, 'navigate').mockResolvedValue(true);
    await component.addMoreItems();
    expect(validateTimeSpy).toHaveBeenCalled();
    expect(routerSpy).not.toHaveBeenCalled();
    expect(alertController).toHaveBeenCalled();
  });

  it('should create and present an alert for PICKUP order type', async () => {
    const alertController = jest.spyOn(alertControllerStub, 'create');
    await component.showActiveCartWarning(ORDER_TYPE.PICKUP);
    expect(alertController).toHaveBeenCalled();
  });

  it('should return order type and validity of order time', async () => {
    const result = await component.getOrderTimeAvailability();
    expect(result).toEqual({ orderType: ORDER_TYPE.PICKUP, isTimeValid: true });
  });

  it('should redirect to cart if order time is valid', async () => {
    const warningSpy = jest.spyOn(component, 'showActiveCartWarning');
    await component.redirectToCart();

    expect(orderingServiceStub.redirectToCart).toHaveBeenCalledWith(true);
    expect(warningSpy).not.toHaveBeenCalled();
  });

  it('should show active cart warning if order time is not valid', async () => {
    const warningSpy = jest.spyOn(component, 'showActiveCartWarning');
    component.getOrderTimeAvailability = jest.fn().mockResolvedValue({ isTimeValid: false, orderType: ORDER_TYPE.PICKUP });

    await component.redirectToCart();

    expect(orderingServiceStub.redirectToCart).not.toHaveBeenCalled();
    expect(warningSpy).toHaveBeenCalledWith(ORDER_TYPE.PICKUP);
  });

  it('should confirm the cart removal before proceeding', async () => {
    const alertController = jest.spyOn(alertControllerStub, 'create');
    component.removeCart();
    expect(alertController).toHaveBeenCalled();
  });
  it('should return order type and validity of order time', async () => {
    const result = await component.getOrderTimeAvailability();
    expect(result).toEqual({ orderType: ORDER_TYPE.PICKUP, isTimeValid: true });
  });

  it('should redirect to cart if order time is valid', async () => {
    const warningSpy = jest.spyOn(component, 'showActiveCartWarning');
    await component.redirectToCart();

    expect(orderingServiceStub.redirectToCart).toHaveBeenCalledWith(true);
    expect(warningSpy).not.toHaveBeenCalled();
  });

  it('should show active cart warning if order time is not valid', async () => {
    const warningSpy = jest.spyOn(component, 'showActiveCartWarning');
    component.getOrderTimeAvailability = jest.fn().mockResolvedValue({ isTimeValid: false, orderType: ORDER_TYPE.PICKUP });

    await component.redirectToCart();

    expect(orderingServiceStub.redirectToCart).not.toHaveBeenCalled();
    expect(warningSpy).toHaveBeenCalledWith(ORDER_TYPE.PICKUP);
  });

});

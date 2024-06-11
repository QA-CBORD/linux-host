import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalsService } from '@core/service/modals/modals.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from '@shared/index';
import { AddressInfo } from 'net';
import { of } from 'rxjs';
import { CartService, OrderDetailOptions } from '.';
import { CartPreviewComponent } from '../components/cart-preview/cart-preview.component';
import { ORDER_TYPE } from '../ordering.config';
import { ActiveCartService } from './active-cart.service';
import { OrderingService } from './ordering.service';

describe('ActiveCartService', () => {
  let service: ActiveCartService;
  let alertControllerMock = {
    create: jest.fn().mockReturnValue({
      present: jest.fn(),
      onDidDismiss: jest.fn().mockResolvedValue({}),
      dismiss: jest.fn(),
    }),
  };
  const routingServiceMock: any = {
    navigate: jest.fn(),
  };
  const translateServiceMock = {
    instant: jest.fn(),
  };

  const mockCartService = {
    menuItems$: of(0),
    merchant$: of({ id: 'defaultMerchantId' }),
    clearActiveOrder: jest.fn(),
    orderDetailsOptions$: of({
      orderType: ORDER_TYPE.PICKUP,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    } as unknown as OrderDetailOptions),
    clearCart: jest.fn(),
    updateMerchantSettings:jest.fn()
  };
  const orderingService = {
    redirectToCart: jest.fn(),
  };
  const modalService = {
    dismiss: jest.fn(),
    createActionSheet: jest.fn().mockResolvedValue({
      present: jest.fn(),
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActiveCartService,
        { provide: AlertController, useValue: alertControllerMock },
        { provide: CartService, useValue: mockCartService },
        { provide: NavigationService, useValue: routingServiceMock },
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: ModalsService, useValue: modalService },
        { provide: OrderingService, useValue: orderingService },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ActiveCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should create, present an alert and confirm', async () => {
    const openOrderOptionsMock = jest.fn();

    await service.showChangeMerchantWarning(openOrderOptionsMock);
    const alert = await alertControllerMock.create.mock.results[0].value;
    expect(alert.present).toHaveBeenCalled();

    const cancelButtonHandler = alertControllerMock.create.mock.calls[0][0].buttons[0].handler;
    cancelButtonHandler();
    expect(alert.dismiss).toHaveBeenCalled();

    const confirmButtonHandler = alertControllerMock.create.mock.calls[0][0].buttons[1].handler;
    await confirmButtonHandler();
    expect(mockCartService.clearActiveOrder).toHaveBeenCalled();
    expect(openOrderOptionsMock).toHaveBeenCalled();
  });

  it('should call onContinue when no items in cart', async () => {
    mockCartService.menuItems$ = of(0);
    mockCartService.merchant$ = of({ id: 'merchantId' });
    const onContinueMock = jest.fn();

    await service.preValidateOrderFlow('merchantId', onContinueMock);

    expect(jest.spyOn(service, 'showChangeMerchantWarning')).not.toHaveBeenCalled();
    expect(routingServiceMock.navigate).not.toHaveBeenCalled();
    expect(onContinueMock).toHaveBeenCalled();
  });

  it('should navigate to full menu when addMoreItems is tapped, order is not ASAP and time has passed', async () => {
    const alertController = jest.spyOn(alertControllerMock, 'create');
    const validateTimeSpy = jest.spyOn(service, 'isOrderTimeValid').mockReturnValue(false);
    const routerSpy = jest.spyOn(routingServiceMock, 'navigate').mockResolvedValue(true);
    await service.addMoreItems();
    expect(validateTimeSpy).toHaveBeenCalled();
    expect(routerSpy).not.toHaveBeenCalled();
    expect(alertController).toHaveBeenCalled();
  });

  it('should create and present an alert for PICKUP order type', async () => {
    const alertController = jest.spyOn(alertControllerMock, 'create');
    await service.showTimePastWarning(ORDER_TYPE.PICKUP);
    expect(alertController).toHaveBeenCalled();
  });
  it('should return true if isASAP is true', () => {
    const result = service.isOrderTimeValid(true, '2022-01-01T12:00:00');
    expect(result).toBe(true);
  });

  it('should return true if the order time is valid', () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const result = service.isOrderTimeValid(false, date.toISOString());
    expect(result).toBe(true);
  });

  it('should return false if the order time is not within the schedule', () => {
    const result = service.isOrderTimeValid(false, '2024-05-08T12:00:00');
    expect(result).toBe(false);
  });

  it('should navigate to full menu when addMoreItems is tapped and order is ASAP', async () => {
    jest
      .spyOn(mockCartService.orderDetailsOptions$, 'pipe')
      .mockReturnValue(
        of({ address: {} as AddressInfo, isASAP: true, orderType: ORDER_TYPE.PICKUP } as unknown as OrderDetailOptions)
      );

    const routerSpy = jest.spyOn(routingServiceMock, 'navigate').mockResolvedValue(true);
    await service.addMoreItems();
    expect(routerSpy).toHaveBeenCalledWith(['ordering', 'full-menu'], {
      queryParams: { isExistingOrder: false, canDismiss: true, openTimeSlot: true },
    });
  });

  it('should return order type and validity of order time', async () => {
    const result = await service.getOrderTimeAvailability();
    expect(result).toEqual({ orderType: ORDER_TYPE.PICKUP, isTimeValid: true });
  });

  it('should redirect to cart if order time is valid', async () => {
    const warningSpy = jest.spyOn(service, 'showTimePastWarning');
    const spy = jest.spyOn(service, 'getOrderTimeAvailability').mockResolvedValueOnce({
      isTimeValid: true,
      orderType: ORDER_TYPE.DELIVERY,
    });
    await service.redirectToCart({ isCartPreview: true });

    expect(orderingService.redirectToCart).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(warningSpy).not.toHaveBeenCalled();
  });

  it('should create and present the cart preview action sheet', async () => {
    await service.openCartpreview();

    expect(modalService.createActionSheet).toHaveBeenCalledWith({
      component: CartPreviewComponent,
      cssClass: 'cart-preview-action-sheet',
    });

    const modal = await modalService.createActionSheet.mock.results[0].value;
    expect(modal.present).toHaveBeenCalled();
  });
});

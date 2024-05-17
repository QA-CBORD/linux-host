import { TestBed } from '@angular/core/testing';

import { ActiveCartService } from './active-cart.service';
import { AddressInfo } from 'net';
import { of, throwError } from 'rxjs';
import { CartService, OrderDetailOptions } from '.';
import { ORDER_TYPE, ORDER_ERROR_CODES } from '../ordering.config';
import { AlertController } from '@ionic/angular';
import { NavigationService } from '@shared/index';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalsService } from '@core/service/modals/modals.service';
import { OrderingService } from './ordering.service';

describe('ActiveCartService', () => {
  let service: ActiveCartService;
  let mockAlert = {
    cssClass: 'active_cart',
    header: 'patron-ui.ordering.active_cart_alert_change_title',
    message: 'patron-ui.ordering.active_cart_alert_change_msg',
    buttons: [
      {
        text: 'patron-ui.ordering.active_cart_alert_change_cancel',
        role: 'cancel',
        cssClass: 'button__option_cancel',
        handler: expect.any(Function),
      },
      {
        text: 'patron-ui.ordering.active_cart_alert_change_proceed',
        role: 'confirm',
        cssClass: 'button__option_confirm',
        handler: expect.any(Function),
      },
    ],
  };
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
  };
  const orderingService = {
    redirectToCart: jest.fn(),
  };
  const modalService = {
    dismiss: jest.fn(),
  };
  let orderSchedule = {
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

    expect(alertControllerMock.create).toHaveBeenCalledWith({
      cssClass: 'active_cart',
      header: 'patron-ui.ordering.active_cart_alert_change_title',
      message: 'patron-ui.ordering.active_cart_alert_change_msg',
      buttons: [
        {
          text: 'patron-ui.ordering.active_cart_alert_change_cancel',
          role: 'cancel',
          cssClass: 'button__option_cancel',
          handler: expect.any(Function),
        },
        {
          text: 'patron-ui.ordering.active_cart_alert_change_proceed',
          role: 'confirm',
          cssClass: 'button__option_confirm',
          handler: expect.any(Function),
        },
      ],
    });

    const alert = await alertControllerMock.create.mock.results[0].value;
    expect(alert.present).toHaveBeenCalled();

    const confirmButtonHandler = alertControllerMock.create.mock.calls[0][0].buttons[1].handler;
    await confirmButtonHandler();

    expect(mockCartService.clearActiveOrder).toHaveBeenCalled();
    expect(openOrderOptionsMock).toHaveBeenCalled();
  });
  it('should create, present an alert and cancel', async () => {
    const openOrderOptionsMock = jest.fn();

    await service.showChangeMerchantWarning(openOrderOptionsMock);

    expect(alertControllerMock.create).toHaveBeenCalledWith(mockAlert);

    const alertHandler = alertControllerMock.create.mock.calls[0][0].buttons[0].handler;
    await alertHandler();

    expect(openOrderOptionsMock).not.toHaveBeenCalled();
  });
  it('should show active cart warning when items in cart and merchant has changed', async () => {
    mockCartService.menuItems$ = of(2);
    mockCartService.merchant$ = of({ id: 'oldMerchantId' });
    const onContinueMock = jest.fn();

    await service.preValidateOrderFlow('newMerchantId', onContinueMock, orderSchedule);

    expect(alertControllerMock.create).toHaveBeenCalledWith(mockAlert);
    expect(routingServiceMock.navigate).not.toHaveBeenCalled();
    expect(onContinueMock).not.toHaveBeenCalled();
  });

  it('should call onContinue when no items in cart', async () => {
    mockCartService.menuItems$ = of(0);
    mockCartService.merchant$ = of({ id: 'merchantId' });
    const onContinueMock = jest.fn();

    await service.preValidateOrderFlow('merchantId', onContinueMock, orderSchedule);

    expect(jest.spyOn(service, 'showChangeMerchantWarning')).not.toHaveBeenCalled();
    expect(routingServiceMock.navigate).not.toHaveBeenCalled();
    expect(onContinueMock).toHaveBeenCalled();
  });

  it('should navigate to full menu when addMoreItems is tapped, order is not ASAP and time has passed', async () => {
    orderSchedule = {
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
    const alertController = jest.spyOn(alertControllerMock, 'create');
    const validateTimeSpy = jest.spyOn(service, 'isOrderTimeValid').mockReturnValue(false);
    const routerSpy = jest.spyOn(routingServiceMock, 'navigate').mockResolvedValue(true);
    await service.addMoreItems({ orderSchedule });
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
    const result = service.isOrderTimeValid(true, '2022-01-01T12:00:00', orderSchedule);
    expect(result).toBe(true);
  });

  it('should return true if the order time is within the schedule', () => {
    orderSchedule = {
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
    const result = service.isOrderTimeValid(false, '2024-05-08T12:00:00', orderSchedule);
    expect(result).toBe(true);
  });

  it('should return false if the order time is not within the schedule', () => {
    orderSchedule = {
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
    const result = service.isOrderTimeValid(false, '2024-05-08T12:00:00', orderSchedule);
    expect(result).toBe(false);
  });

  it('should navigate to full menu when addMoreItems is tapped and order is ASAP', async () => {
    jest
      .spyOn(mockCartService.orderDetailsOptions$, 'pipe')
      .mockReturnValue(
        of({ address: {} as AddressInfo, isASAP: true, orderType: ORDER_TYPE.PICKUP } as unknown as OrderDetailOptions)
      );

    const routerSpy = jest.spyOn(routingServiceMock, 'navigate').mockResolvedValue(true);
    await service.addMoreItems({ orderSchedule });
    expect(routerSpy).toHaveBeenCalledWith(['ordering', 'full-menu'], {
      queryParams: { isExistingOrder: true, canDismiss: true, openTimeSlot: undefined },
    });
  });

  it('should return order type and validity of order time', async () => {
    const result = await service.getOrderTimeAvailability(orderSchedule);
    expect(result).toEqual({ orderType: ORDER_TYPE.PICKUP, isTimeValid: true });
  });

  it('should redirect to cart if order time is valid', async () => {
    const warningSpy = jest.spyOn(service, 'showTimePastWarning');
    await service.redirectToCart({ orderSchedule,hasErrors:false,isCartPreview:true });

    expect(orderingService.redirectToCart).toHaveBeenCalledWith(true);
    expect(warningSpy).not.toHaveBeenCalled();
  });

  it('should show active cart warning if order time is not valid', async () => {
    const warningSpy = jest.spyOn(service, 'showTimePastWarning');
    service.getOrderTimeAvailability = jest
      .fn()
      .mockResolvedValue({ isTimeValid: false, orderType: ORDER_TYPE.PICKUP });

    await service.redirectToCart({ orderSchedule });

    expect(orderingService.redirectToCart).not.toHaveBeenCalled();
    expect(warningSpy).toHaveBeenCalledWith(ORDER_TYPE.PICKUP);
  });
});

import { TestBed } from '@angular/core/testing';

import { ActiveCartService } from './active-cart.service';

describe('ActiveCartService', () => {
  let service: ActiveCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create, present an alert and confirm', async () => {
    const openOrderOptionsMock = jest.fn();

    await service.showChangeMerchantWarning(openOrderOptionsMock);

    expect(alertControllerMock.create).toHaveBeenCalledWith(mockAlert);

    const alertHandler = alertControllerMock.create.mock.calls[0][0].buttons[1].handler;
    await alertHandler();

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
    menuItems$ = of(2);
    merchant$ = of({ id: 'oldMerchantId' });

    jest.spyOn(service, 'menuItems$', 'get').mockReturnValue(menuItems$);
    jest.spyOn(service, 'merchant$', 'get').mockReturnValue(merchant$);
    const onContinueMock = jest.fn();

    await service.preValidateOrderFlow('newMerchantId', onContinueMock, orderSchedule);

    expect(alertControllerMock.create).toHaveBeenCalledWith(mockAlert);
    expect(routingServiceMock.navigate).not.toHaveBeenCalled();
    expect(onContinueMock).not.toHaveBeenCalled();
  });

  it('should call onContinue when no items in cart', async () => {
    menuItems$ = of(0);
    merchant$ = of({ id: 'merchantId' });

    jest.spyOn(service, 'menuItems$', 'get').mockReturnValue(menuItems$);
    jest.spyOn(service, 'merchant$', 'get').mockReturnValue(merchant$);
    const onContinueMock = jest.fn();

    await service.preValidateOrderFlow('merchantId', onContinueMock, orderSchedule);

    expect(jest.spyOn(service, 'showChangeMerchantWarning')).not.toHaveBeenCalled();
    expect(routingServiceMock.navigate).not.toHaveBeenCalled();
    expect(onContinueMock).toHaveBeenCalled();
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
      .spyOn(orderDetailsOptions$, 'pipe')
      .mockReturnValue(
        of({ address: {} as AddressInfo, isASAP: true, orderType: ORDER_TYPE.PICKUP } as unknown as OrderDetailOptions)
      );

    const routerSpy = jest.spyOn(routingServiceMock, 'navigate').mockResolvedValue(true);
    await service.addMoreItems(orderSchedule);
    expect(routerSpy).toHaveBeenCalledWith(['ordering', 'full-menu'], {
      queryParams: { isExistingOrder: true, canDismiss: true, openTimeSlot: undefined },
    });
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
    await service.addMoreItems(orderSchedule);
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

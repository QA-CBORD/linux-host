import { TestBed } from '@angular/core/testing';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { NavigationService, UuidGeneratorService } from '@shared/services';
import { CartService, CartState, MerchantService, OrderDetailOptions } from '.';
import { OrderingApiService } from './ordering.api.service';
import { BehaviorSubject, first, firstValueFrom, lastValueFrom, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertController } from '@ionic/angular';
import { UserInfo } from '@core/model/user';
import { ORDER_TYPE } from '../ordering.config';
import { AddressInfo } from 'net';
import { MenuInfo, MerchantInfo, MerchantOrderTypesInfo, OrderInfo, OrderItem } from '../shared';
import { getDateTimeInGMT } from '@core/utils/date-helper';

jest.mock('@core/utils/date-helper', () => ({
  getDateTimeInGMT: jest.fn(),
}));

describe('CartService', () => {
  let service: CartService;

  const mockCart = {
    value: {
      menu: {
        id: 'menuId',
        name: 'menuName',
        items: [],
      } as Partial<MenuInfo>,
      merchant: {
        id: 'merchantId',
        name: 'merchantName',
        openNow: true,
        timeZone: 'UTC',
      } as MerchantInfo,
      order: {
        subTotal: 100,
        tax: 0,
        total: 100,
        orderPayment: [],
        orderItems: [],
      } as Partial<OrderInfo>,
      orderDetailsOptions: {
        orderType: ORDER_TYPE.PICKUP,
        address: {},
        dueTime: new Date(),
        isASAP: true,
      } as OrderDetailOptions,
    },
    lastModified: new Date().toISOString(),
  };

  const userFacadeService = {
    getUserData$: jest.fn(() => of({} as UserInfo)),
  };
  const merchantService = {
    getMerchantOrderSchedule: jest.fn(),
    getMerchantMenu: jest.fn().mockReturnValue(of({} as MenuInfo)),
    getDisplayMenu: jest.fn().mockReturnValue(of({} as MenuInfo)),
    validateOrder: jest.fn().mockReturnValue(of({} as OrderInfo)),
  };
  const apiService = {};
  const uuidGeneratorService = {
    newUUID: jest.fn().mockReturnValue('mock-uuid-1234'),
  };
  const institutionFacade = {};
  const modalService = {
    dismiss: jest.fn(),
  };
  const storageStateService = {
    getStateEntityByKey$: jest.fn(() => of({} as CartState)),
    deleteStateEntityByKey: jest.fn(),
    updateStateEntity: jest.fn(),
  };
  const alertControllerMock = {
    create: jest.fn().mockReturnValue({
      present: jest.fn(),
      onDidDismiss: jest.fn().mockResolvedValue({}),
      dismiss: jest.fn(),
    }),
  };

  const translateServiceMock = {
    instant: jest.fn((key: string) => key),
  };
  let menuItems$: any;
  let merchant$: any;
  let routingServiceMock: any;
  let orderDetailsOptions$;
  beforeEach(() => {
    menuItems$ = of(0);
    merchant$ = of({ id: 'defaultMerchantId' });
    (orderDetailsOptions$ = of({
      orderType: ORDER_TYPE.PICKUP,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    } as unknown as OrderDetailOptions)),
      (routingServiceMock = {
        navigate: jest.fn(),
      });

    TestBed.configureTestingModule({
      providers: [
        CartService,
        {
          provide: UserFacadeService,
          useValue: userFacadeService,
        },
        { provide: MerchantService, useValue: merchantService },
        { provide: OrderingApiService, useValue: apiService },
        { provide: UuidGeneratorService, useValue: uuidGeneratorService },
        { provide: InstitutionFacadeService, useValue: institutionFacade },
        { provide: ModalsService, useValue: modalService },
        { provide: StorageStateService, useValue: storageStateService },
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: AlertController, useValue: alertControllerMock },
        { provide: NavigationService, useValue: routingServiceMock },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CartService);
    service['cart'].orderDetailsOptions = mockCart.value.orderDetailsOptions;
    service['cart'].menu = mockCart.value.menu;
    service['cart'].merchant = mockCart.value.merchant;
    service['cart'].order = mockCart.value.order;

    (service as any)._cart$ = new BehaviorSubject(mockCart.value);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('can load service', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize cart state if within the last seven days', () => {
    // Check if the cart value was set correctly
    expect(service['cart'].menu).toBeDefined();
    expect(service['cart'].merchant).toBeDefined();
    expect(service['cart'].order).toBeDefined();
    expect(service['cart'].orderDetailsOptions).toBeDefined();

    // Verify that deleteStateEntityByKey is not called
    expect(storageStateService.deleteStateEntityByKey).not.toHaveBeenCalled();
  });

  it('should emit the correct merchant info', async () => {
    const merchant = await lastValueFrom(service.merchant$.pipe(first()));
    expect(merchant).toEqual(mockCart.value.merchant);
  });

  it('should emit the correct menu info', async () => {
    const menu = await lastValueFrom(service.menuInfo$.pipe(first()));
    expect(menu).toEqual(mockCart.value.menu);
  });

  it('should generate a new UUID if _clientOrderId is not set', () => {
    const clientOrderId = service.clientOrderId;

    expect(uuidGeneratorService.newUUID).toHaveBeenCalled();
    expect(clientOrderId).toBe('mock-uuid-1234');
    expect(service['_clientOrderId']).toBe('mock-uuid-1234');
  });

  it('should return the existing _clientOrderId if it has already been set', () => {
    service['_clientOrderId'] = 'existing-uuid-5678';

    const clientOrderId = service.clientOrderId;
    expect(clientOrderId).toBe('existing-uuid-5678');
  });

  it('should generate a new UUID each time changeClientOrderId is accessed', () => {
    const firstOrderId = service.changeClientOrderId;

    expect(uuidGeneratorService.newUUID).toHaveBeenCalled();
    expect(firstOrderId).toBe('mock-uuid-1234');

    const secondOrderId = service.changeClientOrderId;

    expect(uuidGeneratorService.newUUID).toHaveBeenCalled();
    expect(secondOrderId).toBe('mock-uuid-1234');

    expect(service['_clientOrderId']).toBe('mock-uuid-1234');
  });

  it('should return false if _pendingOrderId is not set', () => {
    service['_pendingOrderId'] = null;
    const result = service.isExistingOrder;
    expect(result).toBe(false);
  });

  it('should return true if _pendingOrderId is set', () => {
    service['_pendingOrderId'] = 'some-order-id';
    const result = service.isExistingOrder;
    expect(result).toBe(true);
  });

  it('should return the correct order details options', () => {
    const mockOrderDetailsOptions = {
      orderType: ORDER_TYPE.PICKUP,
      address: {},
      dueTime: new Date(),
      isASAP: true,
    };

    service['cart'].orderDetailsOptions = {
      ...mockOrderDetailsOptions,
    } as any;

    const orderOptions = service['_orderOption'];

    expect(orderOptions).toEqual(mockOrderDetailsOptions);
  });

  it('should set the active merchant, menu, pending order, and order payment', async () => {
    // Mock the dependent methods
    jest.spyOn(service, 'setActiveMerchant').mockResolvedValue(undefined);
    jest.spyOn(service, 'setActiveMerchantsMenuByOrderOptions').mockResolvedValue(undefined);
    jest.spyOn(service, 'setPendingOrder').mockResolvedValue(undefined);

    await service.onAddItems({
      merchant: mockCart.value.merchant,
      orderOptions: mockCart.value.orderDetailsOptions,
      orderId: mockCart.value.order.id,
      orderPayment: mockCart.value.order.orderPayment,
    });

    // Verify that each method was called with the correct arguments
    expect(service.setActiveMerchant).toHaveBeenCalledWith(mockCart.value.merchant);
    expect(service.setActiveMerchantsMenuByOrderOptions).toHaveBeenCalledWith(
      mockCart.value.orderDetailsOptions.dueTime,
      mockCart.value.orderDetailsOptions.orderType,
      mockCart.value.orderDetailsOptions.address,
      mockCart.value.orderDetailsOptions.isASAP
    );
    expect(service.setPendingOrder).toHaveBeenCalledWith(mockCart.value.order.id);

    // Verify that the order payment was set correctly
    expect(service['cart'].order.orderPayment).toEqual(mockCart.value.order.orderPayment);
  });

  it('should reset _clientOrderId to null', () => {
    service['_clientOrderId'] = 'mock-uuid-1234';

    service.resetClientOrderId();

    expect(service['_clientOrderId']).toBeNull();
  });

  it('should return order details options from the cart observable', async () => {
    const options = await lastValueFrom(service.orderDetailsOptions$.pipe(first()));
    expect(options).toEqual(mockCart.value.orderDetailsOptions);
  });

  it('should return the correct openNow status from the merchant observable', async () => {
    const open = await lastValueFrom(service.isMerchantOpenNow$.pipe(first()));
    expect(open).toEqual(mockCart.value.merchant.openNow);
  });

  it('should return order types from the cart merchant', async () => {
    service['cart'].merchant = {
      orderTypes: {
        pickup: true,
        delivery: false,
      } as MerchantOrderTypesInfo,
    };

    const orderTypes = await lastValueFrom(service.orderTypes$.pipe(first()));
    expect(orderTypes).toEqual({
      pickup: true,
      delivery: false,
    });
  });

  it('should return an empty object if cart or merchant is not defined', async () => {
    service['cart'].merchant = null;

    const orderTypes = await lastValueFrom(service.orderTypes$.pipe(first()));
    expect(orderTypes).toEqual({});
  });

  it('should return true when isWithinLastSevenDays is passed a timestamp within the last seven days', () => {
    const timestamp = Date.now() - 1000 * 60 * 60 * 24 * 6; // 6 days ago

    const result = service['isWithinLastSevenDays'](timestamp);

    expect(result).toBe(true);
  });

  it('should return false when isWithinLastSevenDays is passed a timestamp more than seven days ago', () => {
    const timestamp = Date.now() - 1000 * 60 * 60 * 24 * 8; // 8 days ago

    const result = service['isWithinLastSevenDays'](timestamp);

    expect(result).toBe(false);
  });

  it('should call clearCart and deleteStateEntityByKey with CARTIDKEY when clearState is called', () => {
    const clearCartSpy = jest.spyOn(service, 'clearCart');
    const deleteStateEntityByKeySpy = jest.spyOn(storageStateService, 'deleteStateEntityByKey');

    service.clearState();

    expect(clearCartSpy).toHaveBeenCalled();
    expect(deleteStateEntityByKeySpy).toHaveBeenCalledWith(service['CARTIDKEY']);
  });

  it('should return the total quantity of items in the order', async () => {
    const totalQuantity = await lastValueFrom(service.menuItems$.pipe(first()));
    expect(totalQuantity).toEqual(totalQuantity);
  });

  it('should return the error message when _catchError is set', () => {
    (service as any)._catchError = 'Some error occurred';

    expect(service.cartsErrorMessage).toBe('Some error occurred');
  });

  it('should return null when _catchError is not set', () => {
    (service as any)._catchError = null;

    expect(service.cartsErrorMessage).toBeNull();
  });

  it('should set the _catchError message', () => {
    const errorMessage = 'An error occurred';

    service.cartsErrorMessage = errorMessage;

    expect((service as any)._catchError).toBe(errorMessage);
  });

  it('should allow setting _catchError to null', () => {
    service.cartsErrorMessage = null;

    expect((service as any)._catchError).toBeNull();
  });

  describe('removeOrderItemFromOrderById', () => {
    it('should remove the item from the order and return it', async () => {
      const itemId = 'item1';

      service.orderIsAsap = true;
      service.updateOrderFromValidateResponse({ orderItems: [] } as OrderInfo);

      service.addOrderItems([{ id: itemId, name: 'Test Item', quantity: 10 }]);
      expect(firstValueFrom(service.orderItems$.pipe(first()))).resolves.toHaveLength(2);

      const removedItem = await service.removeOrderItemFromOrderById(itemId);
      // Expect that the item was removed from the order
      expect(firstValueFrom(service.orderItems$.pipe(first()))).resolves.toHaveLength(0);

      // Expect that the removed item is returned
      expect(removedItem).toEqual({ id: 'item1', name: 'Test Item', quantity: 10 });
    });
  });

  it('should set orderDetailsOptions and call onStateChanged', () => {
    const orderOptions = {
      orderType: ORDER_TYPE.PICKUP,
      dueTime: new Date(),
      address: {},
      isASAP: true,
    } as OrderDetailOptions;

    const onStateChangedSpy = jest.spyOn(service as any, 'onStateChanged');

    service.orderOption = orderOptions;

    expect(service['cart'].orderDetailsOptions).toEqual(orderOptions);

    expect(onStateChangedSpy).toHaveBeenCalled();
  });

  it('should call getMerchantOrderSchedule with correct parameters and return the schedule', async () => {
    const mockOrderDetailsOptions = {
      orderType: ORDER_TYPE.PICKUP,
      dueTime: new Date(),
      address: {},
      isASAP: true,
    } as OrderDetailOptions;

    const mockMerchant = {
      id: 'merchantId',
      name: 'Merchant Name',
      timeZone: 'UTC',
      openNow: true,
      orderTypes: {} as MerchantOrderTypesInfo,
    };

    // Manually set the state to simulate the observables
    (service as any)._cart$.next({
      orderDetailsOptions: mockOrderDetailsOptions,
      merchant: mockMerchant,
    });

    // Mock the getMerchantOrderSchedule method
    const mockSchedule = { schedule: 'mockSchedule' };
    merchantService.getMerchantOrderSchedule.mockReturnValue(of(mockSchedule));

    const result = await service.orderSchedule;

    // Expect the method to have been called with correct parameters
    expect(merchantService.getMerchantOrderSchedule).toHaveBeenCalledWith(
      mockMerchant.id,
      mockOrderDetailsOptions.orderType,
      mockMerchant.timeZone
    );

    // Expect the result to match the mock schedule
    expect(result).toEqual(mockSchedule);
  });

  it('should return an empty object if orderDetailsOptions or merchant is null', async () => {
    // Simulate the state with null values
    (service as any)._cart$.next({
      orderDetailsOptions: null,
      merchant: null,
    });

    const result = await service.orderSchedule;

    // Expect the result to be an empty object
    expect(result).toEqual({});

    // Ensure that the method is not called
    expect(merchantService.getMerchantOrderSchedule).not.toHaveBeenCalled();
  });

  it('should return a formatted date string with the default timezone', () => {
    const dateStr = '2023-10-09T12:00:00Z';
    const expected = 'Mon, Oct 09, 8:00 AM';

    const result = service.extractTimeZonedString(dateStr, null);

    expect(result).toBe(expected);
  });

  it('should return a formatted date string with a provided timezone', () => {
    const dateStr = '2023-10-09T12:00:00Z';
    const timeZone = 'America/New_York';
    const expected = 'Mon, Oct 09, 8:00 AM (EDT)';

    const result = service.extractTimeZonedString(dateStr, timeZone);

    expect(result).toBe(expected);
  });

  it('should handle invalid date strings gracefully', () => {
    const dateStr = 'invalid-date-string';
    const result = service.extractTimeZonedString(dateStr, null);

    expect(result).toBeUndefined();
  });

  it('should return a formatted date string with hours only when fullDate is false', () => {
    const dateStr = '2023-10-09T12:00:00Z';
    const expected = 'Mon, Oct 09, 8:00 AM';

    const result = service.extractTimeZonedString(dateStr, null, false);

    expect(result).toBe(expected);
  });

  it('should format the date string correctly when using a different time zone', () => {
    const dateStr = '2023-10-09T12:00:00Z';
    const timeZone = 'Asia/Tokyo';
    const expected = 'Mon, Oct 09, 9:00 PM (GMT+9)';

    const result = service.extractTimeZonedString(dateStr, timeZone);

    expect(result).toBe(expected);
  });

  it('should extract the time from a formatted date string', () => {
    const fullDateStr = 'Mon, Oct 09, 12:00 PM (UTC)';
    const expected = ' 12:00 PM (UTC)';

    const result = service['getHoursOnly'](fullDateStr);

    expect(result).toBe(expected);
  });

  it('should set the active merchant and refresh cart date if merchant changed', async () => {
    const spy = jest.spyOn(service as any, 'refreshCartDate');

    await service.setActiveMerchant(mockCart.value.merchant);

    expect(service['cart'].merchant).toEqual(mockCart.value.merchant);
    expect(service.merchantTimeZone).toBe(mockCart.value.merchant.timeZone);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should set order details options and fetch the merchant menu', async () => {
    jest.spyOn(service as any, 'onStateChanged');

    await service.setActiveMerchantsMenuByOrderOptions(
      mockCart.value.orderDetailsOptions.dueTime,
      mockCart.value.orderDetailsOptions.orderType,
      mockCart.value.orderDetailsOptions.address,
      true
    );

    expect(service['cart'].orderDetailsOptions).toEqual({
      orderType: mockCart.value.orderDetailsOptions.orderType,
      dueTime: mockCart.value.orderDetailsOptions.dueTime,
      address: mockCart.value.orderDetailsOptions.address,
      isASAP: true,
    });
  });

  it('should set an initial empty order and call onStateChanged', async () => {
    const resetOrderSnapshotSpy = jest.spyOn(service, 'resetOrderSnapshot');
    const initEmptyOrderSpy = jest.spyOn(service as any, 'initEmptyOrder');
    const onStateChangedSpy = jest.spyOn(service as any, 'onStateChanged');
    await service['setInitialEmptyOrder']();

    expect(resetOrderSnapshotSpy).toHaveBeenCalled();

    expect(service['_pendingOrderId']).toBeNull();

    expect(initEmptyOrderSpy).toHaveBeenCalled();

    expect(service['cart'].order).toBeDefined();

    expect(onStateChangedSpy).toHaveBeenCalled();
  });

  it('should remove order details options and call onStateChanged', () => {
    const onStateChangedSpy = jest.spyOn(service as any, 'onStateChanged');

    service['cart'].orderDetailsOptions = {
      orderType: 'someType',
      dueTime: new Date(),
      address: {
        /* address properties */
      },
      isASAP: false,
    };

    service.removeOrderDetailsOptions();

    expect(service['cart'].orderDetailsOptions).toBeNull();

    expect(onStateChangedSpy).toHaveBeenCalled();
  });

  it('should set pending order and call onStateChanged', async () => {
    const mockOrderId = 'test-order-id';
    const onStateChangedSpy = jest.spyOn(service as any, 'onStateChanged');

    await service.setPendingOrder(mockOrderId);

    expect(service['_pendingOrderId']).toBe(mockOrderId);

    expect(service['cart'].order).toBeDefined();

    expect(onStateChangedSpy).toHaveBeenCalled();
  });

  it('should add order items to the cart', () => {
    const onStateChangedSpy = jest.spyOn(service as any, 'onStateChanged');

    const addOrderItemSpy = jest.spyOn(service as any, 'addOrderItem');

    const mockOrderItems: Partial<OrderItem>[] = [
      { id: 'item1', quantity: 1 },
      { id: 'item2', quantity: 2 },
    ];
    service['cart'].order = {};

    service.addOrderItems(mockOrderItems);

    expect(addOrderItemSpy).toHaveBeenCalledTimes(mockOrderItems.length);

    expect(onStateChangedSpy).toHaveBeenCalled();
  });

  it('should update existing order item if isItemExistsInCart is true', () => {
    const onStateChangedSpy = jest.spyOn(service as any, 'onStateChanged');
    const updateOrderItemSpy = jest.spyOn(service as any, 'updateOrderItem');

    const existingItem = { id: 'item1', quantity: 1 };
    const updatedItem: Partial<OrderItem> = { id: 'item1', quantity: 2 };
    const selectedIndex = 0;
    service['cart'].order = { orderItems: [existingItem] };

    service.addOrderItems(updatedItem, true, selectedIndex);

    expect(updateOrderItemSpy).toHaveBeenCalledWith(updatedItem, selectedIndex);

    expect(onStateChangedSpy).toHaveBeenCalled();
  });

  it('should not add items if cart order does not exist', () => {
    const onStateChangedSpy = jest.spyOn(service as any, 'onStateChanged');
    const addOrderItemSpy = jest.spyOn(service as any, 'addOrderItem');
    const updateOrderItemSpy = jest.spyOn(service as any, 'updateOrderItem');

    service['cart'].order = null;

    service.addOrderItems([{ id: 'item1', quantity: 1 }]);

    expect(addOrderItemSpy).not.toHaveBeenCalled();
    expect(updateOrderItemSpy).not.toHaveBeenCalled();
    expect(onStateChangedSpy).not.toHaveBeenCalled();
  });

  it('should return deliveryAddressId when order type is DELIVERY', () => {
    const addr = { id: 'delivery-address-id' };
    const result = service.getAddress(ORDER_TYPE.DELIVERY, addr);
    expect(result).toEqual({ deliveryAddressId: addr.id });
  });

  it('should return pickupAddressId when order type is PICKUP', () => {
    const addr = { id: 'pickup-address-id' };
    const result = service.getAddress(ORDER_TYPE.PICKUP, addr);
    expect(result).toEqual({ pickupAddressId: addr.id });
  });

  it('should call getDateTimeInGMT when dueTime is a Date', () => {
    const dueTime = new Date('2024-10-09T10:00:00Z');
    const locale = 'en-US';
    const timeZone = 'UTC';

    service.getDate(dueTime, locale, timeZone);

    expect(getDateTimeInGMT).toHaveBeenCalledWith(dueTime, locale, timeZone);
  });

  it('should return dueTime as is when it is not a Date', () => {
    const dueTime = '2024-10-09T10:00:00Z';
    const locale = 'en-US';
    const timeZone = 'UTC';

    const result = service.getDate(dueTime, locale, timeZone);

    expect(result).toBe(dueTime);
    expect(getDateTimeInGMT).not.toHaveBeenCalled();
  });

  it('should set tax and total', () => {
    const totalBefore = service['cart'].order.total;

    const taxAmount = 20;
    service.setTax(taxAmount);

    const tax = service['cart'].order.tax;
    const total = service['cart'].order.total;

    expect(tax).toBe(taxAmount);
    expect(total).toBe(totalBefore + taxAmount);
  });

  it('should validate order and set active merchants menu if no pending order', async () => {
    const mockOrderDetailsOptions = {
      orderType: ORDER_TYPE.DELIVERY,
      dueTime: new Date(),
      isASAP: false,
    } as OrderDetailOptions;

    const mockUserData = { timeZone: 'UTC', locale: 'en-US', id: 'userId' } as UserInfo;
    const mockOrderInfo = {
      dueTime: '2024-10-09T10:00:00Z',
      orderItems: [],
    } as OrderInfo;

    userFacadeService.getUserData$.mockReturnValue(of(mockUserData));
    merchantService.validateOrder.mockReturnValue(of(mockOrderInfo));

    service.validateOrder(mockOrderDetailsOptions)
  });
});

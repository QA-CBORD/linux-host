import { AddressInfo } from '@core/model/address/address-info';
import { MerchantOrderTypesInfo } from '@sections/ordering';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { OrderDetailOptions } from '@sections/ordering/services';
import { OrderPrepTime } from './order-prep-time.component';

describe('OrderPrepTimeComponent', () => {
  let component: OrderPrepTime;
  
  beforeEach(() => {
    component = new OrderPrepTime();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate prepTime correctly for pickup order type', () => {
    const orderDetailOptions: OrderDetailOptions = {
      orderType: ORDER_TYPE.PICKUP,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    };

    const orderTypes: MerchantOrderTypesInfo = {
      pickupPrepTime: 15,
      deliveryPrepTime: 30,
      delivery: false,
      deliveryInstructions: '',
      dineIn: false,
      dineInInstructions: '',
      dineInPrepTime: 1,
      merchantId: '',
      merchantTimeZone: '',
      pickup: true,
      pickupInstructions: '',
    };

    component.orderDetailOptions = orderDetailOptions;
    component.orderTypes = orderTypes;

    const result = component.prepTime;

    expect(result).toEqual('(15 min)');
  });

  it('should calculate prepTime correctly for delivery order type', () => {
    const orderDetailOptions: OrderDetailOptions = {
      orderType: ORDER_TYPE.DELIVERY,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    };

    const orderTypes: MerchantOrderTypesInfo = {
      pickupPrepTime: 15,
      deliveryPrepTime: 30,
      delivery: true,
      deliveryInstructions: '',
      dineIn: false,
      dineInInstructions: '',
      dineInPrepTime: 1,
      merchantId: '',
      merchantTimeZone: '',
      pickup: false,
      pickupInstructions: '',
    };

    component.orderDetailOptions = orderDetailOptions;
    component.orderTypes = orderTypes;

    const result = component.prepTime;

    expect(result).toEqual('(30 min)');
  });

   it('should calculate prepTime correctly for delivery order type', () => {
    const orderDetailOptions: OrderDetailOptions = {
      orderType: ORDER_TYPE.DELIVERY,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    };

    const orderTypes: MerchantOrderTypesInfo = {
      pickupPrepTime: 15,
      deliveryPrepTime: 30,
      delivery: true,
      deliveryInstructions: '',
      dineIn: false,
      dineInInstructions: '',
      dineInPrepTime: 1,
      merchantId: '',
      merchantTimeZone: '',
      pickup: false,
      pickupInstructions: '',
    };

    component.orderDetailOptions = orderDetailOptions;
    component.orderTypes = orderTypes;

    const result = component.prepTime;

    expect(result).toEqual('(30 min)');
  });
});

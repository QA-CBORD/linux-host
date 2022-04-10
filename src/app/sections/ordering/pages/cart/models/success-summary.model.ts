import { MerchantOrderTypesInfo, OrderDetailOptions } from '@sections/ordering';

export interface NonCheckingSummary {
  tax?: number;
  discount?: number;
  checkNumber?: number;
  total?: number;
  accountName?: string;
  deliveryFee?: number;
  pickupFee?: number;
  subTotal?: number;
  tip?: number;
  mealBased?: boolean;
  orderType?: MerchantOrderTypesInfo;
  dueTime?: string;
  type?: number;
  orderDetailOptions?: OrderDetailOptions;
}

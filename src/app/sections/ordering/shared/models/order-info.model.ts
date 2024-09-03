import { OrderItem, OrderPayment, OrderNotification } from '../models';
import { AddressInfo } from '@core/model/address/address-info';

export interface OrderInfo {
  id: string;
  merchantName?: string;
  amountDue: number;
  checkNumber: number;
  checkinStatus: number,
  posCheckNumber: string;
  posOrderId: string;
  submittedTime: Date;
  displaySubmittedTime: string;
  dueTime: string;
  displayDueTime: string;
  userId: string;
  userPhone: string;
  transactionId: string;
  authCode: string;
  authCodeForReverse: string;
  notificationId: string;
  deliveryFee: number;
  pickupFee: number;
  tip: number;
  useFee: number;
  subTotal: number;
  tax: number;
  total: number;
  discount: number;
  discountSource: number;
  merchantId: string;
  institutionId: string;
  type: number;
  deliveryAddressId: string;
  status: number;
  statusDetail: string;
  notes: string;
  userName: string;
  pickupAddressId: string;
  mealBased: boolean;
  mealBasedNames: string[];
  deliveryAddress: AddressInfo;
  orderItems: OrderItem[];
  orderPayment: OrderPayment[];
  orderNotifications: OrderNotification[];
  allItems?:OrderItem[]
  isWalkoutOrder: boolean;
  isAutoAsapSelection?: boolean;
}

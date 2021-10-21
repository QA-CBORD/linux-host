import { OrderItem, OrderPayment } from '.';

export interface ExistingOrderInfo {
  orderID: string;
  itemsToAdd: OrderItem[];
  orderPayment: OrderPayment[];
  clientAddItemsID: string;
  cvv: string;
}

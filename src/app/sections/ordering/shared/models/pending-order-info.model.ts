import { OrderItem } from '.';

export interface ExistingOrderInfo {
  orderID: string;
  itemsToAdd: OrderItem[];
  clientAddItemsID?: string;
  cvv?: string;
}

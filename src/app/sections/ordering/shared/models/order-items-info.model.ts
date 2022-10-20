import { OrderInfo } from "./order-info.model";
import { OrderItem } from "./order-item.model";

export interface ItemsOrderInfo {
  order: OrderInfo;
  orderRemovedItems: OrderItem[]
}

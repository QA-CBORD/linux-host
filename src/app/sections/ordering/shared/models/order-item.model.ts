export interface OrderItem {
  orderId: string;
  menuItemId: string;
  parentOrderItemId: string;
  quantity: number;
  displayRank: number;
  salePrice: number;
  specialInstructions: string;
  keyedName: string;
  status: number;
  name: string;
  optionType: string;
  orderItemOptions: OrderItem[];
}

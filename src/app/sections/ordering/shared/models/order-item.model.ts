export interface OrderItem {
  id: string;
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
  reportingCategory: string;
  optionType: string;
  orderItemOptions: OrderItem[];
  cartPreviewItems?: OrderItem[];
}

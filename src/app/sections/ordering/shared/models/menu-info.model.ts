import { MenuCategoryInfo } from './menu-category-info.model';

export interface MenuInfo {
  merchantId: string;
  name: string;
  taxRate: number;
  minOrderAmount: number;
  maxOrderAmount: number;
  minDeliveryAmount: number;
  deliveryFee: number;
  pickupFee: number;
  maxOrderItems: number;
  visible: boolean;
  active: boolean;
  mealBased: boolean;
  menuCategories: MenuCategoryInfo[];
}

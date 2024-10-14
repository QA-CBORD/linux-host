import { MenuItemOptionInfo } from '@sections/ordering/shared/models/menu-item-option-info.model';

export interface MenuItemInfo {
  id: string;
  merchantId: string;
  externalSystemRef: string; // don't care about this
  name: string;
  description: string;
  minimumPrice: number; // Not used
  price: number;
  externalSystemFields: string; // don't care about this
  taxMask: number; // Not used
  visible: boolean; // must be visible, active, and not deleted to show
  active: boolean;
  deleted: boolean;
  calories: number;
  reportingCategory: string;
  carbs: number;
  protein: number;
  imageReference: string;
  menuItemOptions: MenuItemOptionInfo[];
  barcode?: string;
  displayCalories: string;
}

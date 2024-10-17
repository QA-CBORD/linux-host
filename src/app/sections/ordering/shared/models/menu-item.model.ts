import { MenuItemOptionInfo } from '@sections/ordering/shared/models/menu-item-option-info.model';

export interface MenuItemInfo {
  id: string;
  merchantId: string;
  name: string;
  description: string;
  price: number;
  visible: boolean; // must be visible, active, and not deleted to show
  active: boolean;
  deleted: boolean;
  calories: number;
  reportingCategory: string;
  carbs: number;
  cholesterol: number;
  sodium: number;
  sugar: number;
  protein: number;
  dietaryFiber: number;
  imageReference: string;
  menuItemOptions: MenuItemOptionInfo[];
  barcode?: string;
  displayCalories: string;
  allergens?: string[];
  nutritionInfo: NutritionInfoList;
}

export interface NutritionInfo {
  label: string;
  name: string;
  displayValue: string;
}

export type NutritionInfoList = NutritionInfo[];

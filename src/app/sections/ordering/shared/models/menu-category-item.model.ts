import { MenuItemInfo } from '@sections/ordering';

export interface MenuCategoryItemInfo {
  id: string;
  menuCategoryId: string;
  menuItem: MenuItemInfo;    // information about this item
  displayRank: number;             // display order (0 is top)
  visible: boolean;                 // must be visible and active to show
  active: boolean;
}

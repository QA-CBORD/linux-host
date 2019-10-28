import { MenuCategoryItemInfo } from '@sections/ordering';

export interface MenuCategoryInfo {
  displayRank: number;
  id: string;
  menuCategoryItems: MenuCategoryItemInfo[];
  menuId: string;
  name: string;
}

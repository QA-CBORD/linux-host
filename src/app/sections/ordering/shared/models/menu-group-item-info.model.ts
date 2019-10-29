import { MenuItemInfo } from '@sections/ordering';

export interface MenuGroupItemInfo {
  menuGroupId: string;
  menuGroupName: string;
  menuItem: MenuItemInfo;           // information about this customization option
  displayRank: number;             // display order (0 is top)
  priceOverride: number;            // not used
  visible: boolean;                 // must be visible and active to show
  active: boolean;
  notes: string;
}

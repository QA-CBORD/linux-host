import { MenuGroupInfo } from '@sections/ordering/shared/models/menu-group-info.model';

export interface MenuItemOptionInfo {
  menuGroup: MenuGroupInfo;
  menuItemId: string;
  displayRank: number;             // display order (0 is top)
  visible: boolean;                 // must be visible and active
  active: boolean;
}

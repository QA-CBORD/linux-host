import { MenuGroupItemInfo } from '@sections/ordering/shared/models/menu-group-item-info.model';

export interface MenuGroupInfo {
  merchantId: string;
  name: string;
  description: string;
  minimum: number;                 // minimum number of options the user must select
  maximum: number;                 // maximum number of options the user must select
  externalSystemRef: string;        // don't care about this
  priceOverride: number;            // not used
  visible: boolean;                 // must be visible and active to show
  active: boolean;
  menuGroupItems: MenuGroupItemInfo[];
}

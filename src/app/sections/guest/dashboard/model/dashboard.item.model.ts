import { Type } from '@angular/core';
import { GuestSetting } from '../../model/guest-settings';

export interface GuestDashboardSection {
  title: string;
  imageUrl: string;
  visibilityOn: (settings: GuestSetting) => boolean;
  willNavigate: boolean;
  stackNavigation?: boolean;
  url?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalConfig?: { component: Type<any>; props?: any };
}

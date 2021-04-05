import { Type } from '@angular/core';
import { GuestSetting } from '../../model/guest-settings';

export interface GuestDashboardSection {
  title: string;
  imageUrl: string;
  visibilityOn: (settings: GuestSetting) => boolean;
  willNavigate: boolean;
  url?: string;
  modalConfig?: { component: Type<any>; props?: any };
}

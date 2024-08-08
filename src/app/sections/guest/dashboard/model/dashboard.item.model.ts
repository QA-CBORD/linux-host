import { Type } from '@angular/core';

export interface GuestDashboardSection {
  id: string;
  title: string;
  imageUrl: string;
  willNavigate: boolean;
  stackNavigation?: boolean;
  url?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalConfig?: { component: Type<any>; props?: any };
}

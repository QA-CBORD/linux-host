import { APP_PROFILES } from '@sections/dashboard/models';
import { GuestSetting } from '@sections/guest/model/guest-settings';
import { PATRON_NAVIGATION } from '../../../app.global';

export interface NavigationBottomBarElement {
  url: PATRON_NAVIGATION | string;
  isEnable: boolean;
  iconCssPostfix: string;
  name: string;
  id: string;
  visibilityOn?: (settings: GuestSetting) => boolean,
  supportProfiles: APP_PROFILES[]
}

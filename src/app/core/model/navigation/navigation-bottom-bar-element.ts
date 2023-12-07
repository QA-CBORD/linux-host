import { APP_PROFILES } from '@sections/dashboard/models';
import { GuestSetting } from '@sections/guest/model/guest-settings';
import { PATRON_NAVIGATION } from '../../../app.global';
import { Observable } from 'rxjs';

export interface NavigationBottomBarElement {
  url: PATRON_NAVIGATION | string;
  isEnabled: boolean;
  iconCssPostfix: string;
  name: string;
  id: string;
  visibilityOn?: (settings: GuestSetting) => boolean;
  supportProfiles: APP_PROFILES[];
  indicatorValue$?: Observable<string>;
  indicatorAriaLabel?: string;
}

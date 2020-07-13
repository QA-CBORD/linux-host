import { PATRON_NAVIGATION } from '../../../app.global';

export interface NavigationBottomBarElement {
  url: PATRON_NAVIGATION | string;
  isEnable: boolean;
  iconCssPostfix: string;
  name: string;
  id: string;
}

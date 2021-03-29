import { TILES_ID, TILES_TITLE } from '@sections/dashboard/dashboard.config';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';
import { GUEST_NAVIGATION, PATRON_NAVIGATION } from '../../../app.global';
import { GuestSetting } from '@sections/guest/model/guest-settings';

export const GUEST_NAVIGATION_BASE_CONFIG: ReadonlyArray<NavigationBottomBarElement> = [
  {
    id: TILES_ID.home,
    iconCssPostfix: 'home',
    isEnable: true,
    name: TILES_TITLE.home,
    url: GUEST_NAVIGATION.dashboard,
    visibilityOn: () => true,
  },
  {
    id: TILES_ID.order, // enable_food
    iconCssPostfix: 'order',
    isEnable: false,
    name: TILES_TITLE.order,
    url: GUEST_NAVIGATION.ordering,
    visibilityOn: (setting: GuestSetting) => setting.canOrder,
  },
  {
    id: TILES_ID.explore,
    iconCssPostfix: 'explore',
    isEnable: true,
    name: TILES_TITLE.explore,
    url: GUEST_NAVIGATION.explore,
    visibilityOn: (setting: GuestSetting) => setting.canExplore,
  },

  {
    id: TILES_ID.settings,
    iconCssPostfix: 'settings',
    isEnable: true,
    name: TILES_TITLE.settings,
    url: GUEST_NAVIGATION.settings,
    visibilityOn: () => true,
  },
];

export const NAVIGATION_BASE_CONFIG: ReadonlyArray<NavigationBottomBarElement> = [
  {
    id: TILES_ID.home,
    iconCssPostfix: 'home',
    isEnable: true,
    name: TILES_TITLE.home,
    url: PATRON_NAVIGATION.dashboard,
  },
  {
    id: TILES_ID.mobileAccess,
    iconCssPostfix: 'access',
    isEnable: false,
    name: TILES_TITLE.mobileAccess,
    url: PATRON_NAVIGATION.mobileAccess,
  },
  {
    id: TILES_ID.accounts,
    iconCssPostfix: 'accounts',
    isEnable: true,
    name: TILES_TITLE.accounts,
    url: PATRON_NAVIGATION.accounts,
  },
  {
    id: TILES_ID.order,
    iconCssPostfix: 'order',
    isEnable: false,
    name: TILES_TITLE.order,
    url: PATRON_NAVIGATION.ordering,
  },
  {
    id: TILES_ID.housing,
    iconCssPostfix: 'housing',
    isEnable: false,
    name: TILES_TITLE.housing,
    url: PATRON_NAVIGATION.housing,
  },
  {
    id: TILES_ID.rewards,
    iconCssPostfix: 'rewards',
    isEnable: false,
    name: TILES_TITLE.rewards,
    url: PATRON_NAVIGATION.rewards,
  },
  {
    id: TILES_ID.explore,
    iconCssPostfix: 'explore',
    isEnable: false,
    name: TILES_TITLE.explore,
    url: PATRON_NAVIGATION.explore,
  },
  {
    id: TILES_ID.conversations,
    iconCssPostfix: 'conversations',
    isEnable: false,
    name: TILES_TITLE.conversations,
    url: PATRON_NAVIGATION.secureMessage,
  },
  {
    id: TILES_ID.settings,
    iconCssPostfix: 'settings',
    isEnable: true,
    name: TILES_TITLE.settings,
    url: PATRON_NAVIGATION.settings,
  },
];

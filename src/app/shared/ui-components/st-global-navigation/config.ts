import { TILES_ID, TILES_TITLE } from '@sections/dashboard/dashboard.config';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';
import { GUEST_NAVIGATION, PATRON_NAVIGATION } from '../../../app.global';
import { GuestSetting } from '@sections/guest/model/guest-settings';
import { APP_PROFILES } from '@sections/dashboard/models';

export const GUEST_NAVIGATION_BASE_CONFIG: ReadonlyArray<NavigationBottomBarElement> = [
  {
    id: TILES_ID.home,
    iconCssPostfix: 'home',
    isEnabled: true,
    name: TILES_TITLE.home,
    url: GUEST_NAVIGATION.dashboard,
    visibilityOn: () => true,
    supportProfiles: [APP_PROFILES.guest]
  },
  {
    id: TILES_ID.order, // enable_food
    iconCssPostfix: 'order',
    isEnabled: false,
    name: TILES_TITLE.order,
    url: GUEST_NAVIGATION.ordering,
    supportProfiles: [APP_PROFILES.guest]
  },
  {
    id: TILES_ID.explore,
    iconCssPostfix: 'explore',
    isEnabled: true,
    name: TILES_TITLE.explore,
    url: GUEST_NAVIGATION.explore,
    visibilityOn: (setting: GuestSetting) => setting.canExplore,
    supportProfiles: [APP_PROFILES.guest]
  },

  {
    id: TILES_ID.settings,
    iconCssPostfix: 'settings',
    isEnabled: true,
    name: TILES_TITLE.settings,
    url: GUEST_NAVIGATION.settings,
    visibilityOn: () => true,
    supportProfiles: [APP_PROFILES.guest]
  },
  {
    id: TILES_ID.notificationBell,
    iconCssPostfix: 'notifications',
    indicatorAriaLabel: 'a11y.bottom_navigation.notifications',
    isEnabled: false,
    name: TILES_TITLE.notificationBell,
    url: GUEST_NAVIGATION.notifications,
    supportProfiles: [APP_PROFILES.guest]
  },
];

export const NAVIGATION_BASE_CONFIG: ReadonlyArray<NavigationBottomBarElement> = [
  {
    id: TILES_ID.home,
    iconCssPostfix: 'home',
    isEnabled: true,
    name: TILES_TITLE.home,
    url: PATRON_NAVIGATION.dashboard,
    supportProfiles: [APP_PROFILES.patron, APP_PROFILES.housing]
  },
  {
    id: TILES_ID.mobileAccess,
    iconCssPostfix: 'access',
    isEnabled: false,
    name: TILES_TITLE.mobileAccess,
    url: PATRON_NAVIGATION.mobileAccess,
    supportProfiles: [APP_PROFILES.patron]
  },
  {
    id: TILES_ID.accounts,
    iconCssPostfix: 'accounts',
    isEnabled: true,
    name: TILES_TITLE.accounts,
    url: PATRON_NAVIGATION.accounts,
    supportProfiles: [APP_PROFILES.patron]
  },
  {
    id: TILES_ID.order,
    iconCssPostfix: 'order',
    isEnabled: false,
    name: TILES_TITLE.order,
    url: PATRON_NAVIGATION.ordering,
    supportProfiles: [APP_PROFILES.patron, APP_PROFILES.housing]
  },
  {
    id: TILES_ID.housing,
    iconCssPostfix: 'housing',
    isEnabled: false,
    name: TILES_TITLE.housing,
    url: PATRON_NAVIGATION.housing,
    supportProfiles: [APP_PROFILES.patron, APP_PROFILES.housing]
  },
  {
    id: TILES_ID.rewards,
    iconCssPostfix: 'rewards',
    isEnabled: false,
    name: TILES_TITLE.rewards,
    url: PATRON_NAVIGATION.rewards,
    supportProfiles: [APP_PROFILES.patron]
  },
  {
    id: TILES_ID.explore,
    iconCssPostfix: 'explore',
    isEnabled: false,
    name: TILES_TITLE.explore,
    url: PATRON_NAVIGATION.explore,
    supportProfiles: [APP_PROFILES.patron, APP_PROFILES.housing]
  },
  {
    id: TILES_ID.conversations,
    iconCssPostfix: 'conversations',
    isEnabled: false,
    name: TILES_TITLE.conversations,
    url: PATRON_NAVIGATION.secureMessage,
    supportProfiles: [APP_PROFILES.patron, APP_PROFILES.housing]
  },
  {
    id: TILES_ID.settings,
    iconCssPostfix: 'settings',
    isEnabled: true,
    name: TILES_TITLE.settings,
    url: PATRON_NAVIGATION.settings,
    supportProfiles: [APP_PROFILES.patron, APP_PROFILES.housing]
  },
  {
    id: TILES_ID.notificationBell,
    iconCssPostfix: 'notifications',
    indicatorAriaLabel: 'a11y.bottom_navigation.notifications',
    isEnabled: true,
    name: TILES_TITLE.notificationBell,
    url: PATRON_NAVIGATION.notifications,
    supportProfiles: [APP_PROFILES.patron]
  },
];

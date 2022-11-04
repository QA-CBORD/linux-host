import { PATRON_NAVIGATION, Settings } from 'src/app/app.global';
import { APP_PROFILES, TileWrapperConfig } from './models';
import { ALL_ACCOUNTS, LOCAL_ROUTING as ACCOUNT_ROUTING } from '@sections/accounts/accounts.config';
import { getSettingName } from '@core/utils/settings-helper';

export enum DASHBOARD_NAVIGATE {
  scanCard = 'scan-card',
}

export const TILES_ID = {
  home: 'dashboard',
  accounts: 'accounts',
  transactions: 'transactions',
  settings: 'settings',
  rewards: getSettingName(Settings.Setting.REWARDS_ENABLED),
  mobileAccess: getSettingName(Settings.Setting.MOBILE_ACCESS_ENABLED),
  mealDonations: getSettingName(Settings.Setting.MEAL_DONATIONS_ENABLED),
  order: getSettingName(Settings.Setting.FOOD_ENABLED),
  explore: getSettingName(Settings.Setting.PLACES_ENABLED),
  conversations: getSettingName(Settings.Setting.SECURE_MESSAGING_ENABLED),
  housing: getSettingName(Settings.Setting.HOUSING_ENABLED),
};

export enum TILES_TITLE {
  home = 'Home',
  settings = 'Settings',
  accounts = 'Accounts',
  transactions = 'Transactions',
  rewards = 'Rewards',
  mobileAccess = 'Mobile Access',
  mealDonations = 'Meal Donations',
  order = 'Order',
  explore = 'Explore',
  conversations = 'Conversations',
  housing = 'Housing',
}

export const TILES_BASE_CONFIG: TileWrapperConfig[] = [
  {
    id: TILES_ID.accounts,
    title: 'Accounts',
    iconPath: '/assets/icon/accounts.svg',
    isEnable: true,
    navigate: PATRON_NAVIGATION.accounts,
    buttonConfig: {
      show: false,
      title: 'Add Funds',
      navigate: `${PATRON_NAVIGATION.accounts}/${ACCOUNT_ROUTING.addFunds}`,
    },
    supportProfiles: [APP_PROFILES.patron]
  },
  {
    id: TILES_ID.transactions,
    title: 'Transactions',
    iconPath: '/assets/icon/transactions.svg',
    isEnable: true,
    navigate: `${PATRON_NAVIGATION.accounts}/${ACCOUNT_ROUTING.accountDetailsM}/${ALL_ACCOUNTS}`,
    buttonConfig: {
      show: true,
      title: 'All Transactions',
      navigate: `${PATRON_NAVIGATION.accounts}/${ACCOUNT_ROUTING.accountDetailsM}/${ALL_ACCOUNTS}`,
    },
    navigateBack: PATRON_NAVIGATION.accounts,
    supportProfiles: [APP_PROFILES.patron]
  },
  {
    id: TILES_ID.rewards,
    title: 'Rewards',
    iconPath: '/assets/icon/trophy.svg',
    isEnable: false,
    navigate: PATRON_NAVIGATION.rewards,
    buttonConfig: {
      show: false,
    },
    supportProfiles: [APP_PROFILES.patron]
  },
  {
    id: TILES_ID.mobileAccess,
    title: 'Mobile Access',
    iconPath: '/assets/icon/mobile-access-tile.svg',
    isEnable: false,
    navigate: PATRON_NAVIGATION.mobileAccess,
    buttonConfig: {
      show: true,
      title: 'All Locations',
      navigate: PATRON_NAVIGATION.mobileAccess,
    },
    supportProfiles: [APP_PROFILES.patron]
  },
  {
    id: TILES_ID.mealDonations,
    title: 'Meals',
    iconPath: '/assets/icon/meal-outline.svg',
    isEnable: false,
    navigate: `${PATRON_NAVIGATION.accounts}/${ACCOUNT_ROUTING.mealDonations}`,
    buttonConfig: {
      show: true,
      title: 'Meal Donation',
      navigate: `${PATRON_NAVIGATION.accounts}/${ACCOUNT_ROUTING.mealDonations}`,
    },
    supportProfiles: [APP_PROFILES.patron]
  },
  {
    id: TILES_ID.order,
    title: 'Order',
    iconPath: '/assets/icon/order.svg',
    isEnable: false,
    navigate: PATRON_NAVIGATION.ordering,
    buttonConfig: {
      show: true,
      title: 'Start an order',
      navigate: PATRON_NAVIGATION.ordering,
    },
    supportProfiles: [APP_PROFILES.patron, APP_PROFILES.guest]
  },
  {
    id: TILES_ID.explore,
    title: 'Explore',
    iconPath: '/assets/icon/map.svg',
    isEnable: false,
    navigate: PATRON_NAVIGATION.explore,
    buttonConfig: {
      show: true,
      title: 'Explore All',
      navigate: PATRON_NAVIGATION.explore,
    },
    supportProfiles: [APP_PROFILES.patron, APP_PROFILES.guest]
  },
  {
    id: TILES_ID.conversations,
    title: 'Conversations',
    iconPath: '/assets/icon/chat.svg',
    isEnable: false,
    navigate: PATRON_NAVIGATION.secureMessage,
    buttonConfig: {
      show: true,
      title: 'Start a conversation',
      navigate: PATRON_NAVIGATION.secureMessage,
    },
    supportProfiles: [APP_PROFILES.patron, APP_PROFILES.housing]
  },
  {
    id: TILES_ID.housing,
    title: 'Housing',
    iconPath: '/assets/icon/building.svg',
    isEnable: false,
    navigate: PATRON_NAVIGATION.housing,
    buttonConfig: {
      show: true,
      title: 'Go to Housing',
      navigate: PATRON_NAVIGATION.housing,
    },
    supportProfiles: [APP_PROFILES.patron, APP_PROFILES.housing]
  },
  // {
  //   id: TILES_ID.settings,
  //   title: 'Settings',
  //   iconPath: '/assets/icon/trophy.svg',
  //   isEnable: true,
  //   navigate: PATRON_NAVIGATION.settings,
  //   buttonConfig: {
  //     show: true,
  //     title: 'Go to Settings',
  //     navigate: PATRON_NAVIGATION.settings,
  //   },
  // },
];

export const DASHBOARD_SLIDE_CONFIG = {
  initialSlide: 0,
  spaceBetween: 0,
  speed: 400,
  width: 350,
  autoHeight: true,
};

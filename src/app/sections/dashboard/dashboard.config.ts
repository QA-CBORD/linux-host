import { NAVIGATE } from 'src/app/app.global';
import { TileWrapperConfig } from './models';
import { LOCAL_ROUTING as ACCOUNT_ROUTING, ALL_ACCOUNTS } from '@sections/accounts/accounts.config';

export enum DASHBOARD_NAVIGATE {
  scanCard = 'scan-card',
}

export const DASHBOARD_SETTINGS_CONFIG = {
  enableScanCardButton: {
    domain: 'get',
    category: 'feature',
    name: 'enable_get_my_card',
  },
  enableRewards: {
    domain: 'get',
    category: 'feature',
    name: 'enable_rewards',
  },
  enableMobileAccess: {
    domain: 'get',
    category: 'feature',
    name: 'enable_open_my_door',
  },
  enableMeals: {
    domain: 'get',
    category: 'feature',
    name: 'meal_donations_enabled',
  },
  enableOrder: {
    domain: 'get',
    category: 'feature',
    name: 'enable_food',
  },
  enableExplore: {
    domain: 'get',
    category: 'feature',
    name: 'enable_merchants',
  },
  enableConversation: {
    domain: 'get',
    category: 'feature',
    name: 'enable_secure_messaging',
  },
  enableHousing: {
    domain: 'get',
    category: 'feature',
    name: 'enable_housing',
  },
};

export const ACCOUNTS_SETTINGS_CONFIG = {
  enableOnetimeDeposits: {
    domain: 'get',
    category: 'deposit',
    name: 'enable_onetime_deposits',
  },
  paymentTypes: {
    domain: 'get',
    category: 'deposit',
    name: 'payment_types',
  },
};

export enum TILES_ID {
  accounts = 'accounts',
  transactions = 'transactions',
  rewards = 'rewards',
  mobileAccess = 'mobileAccess',
  mealDonations = 'mealDonations',
  order = 'order',
  explore = 'explore',
  conversations = 'conversations',
  housing = 'housing'
}

export enum TILES_TITLE {
  accounts = 'Accounts',
  transactions = 'Transactions',
  rewards = 'Rewards',
  mobileAccess = 'Mobile Access',
  mealDonations = 'Meal Donations',
  order = 'Order',
  explore = 'Explore',
  conversations = 'Conversations',
  housing = 'Housing'
}

export const TILES_BASE_CONFIG: TileWrapperConfig[] = [
  {
    id: TILES_ID.accounts,
    title: 'Accounts',
    iconPath: '/assets/icon/accounts.svg',
    isEnable: true,
    navigate: NAVIGATE.accounts,
    buttonConfig: {
      show: false,
      title: 'Add Funds',
      navigate: `${NAVIGATE.accounts}/${ACCOUNT_ROUTING.addFunds}`,
    },
  },
  {
    id: TILES_ID.transactions,
    title: 'Transactions',
    iconPath: '/assets/icon/transactions.svg',
    isEnable: true,
    navigate: `${NAVIGATE.accounts}/${ACCOUNT_ROUTING.accountDetailsM}/${ALL_ACCOUNTS}`,
    buttonConfig: {
      show: true,
      title: 'All Transactions',
      navigate: `${NAVIGATE.accounts}/${ACCOUNT_ROUTING.accountDetailsM}/${ALL_ACCOUNTS}`,
    },
  },
  {
    id: DASHBOARD_SETTINGS_CONFIG.enableRewards.name,
    title: 'Rewards',
    iconPath: '/assets/icon/trophy.svg',
    isEnable: false,
    navigate: NAVIGATE.rewards,
    buttonConfig: {
      show: false,
    },
  },
  {
    id: DASHBOARD_SETTINGS_CONFIG.enableMobileAccess.name,
    title: 'Mobile Access',
    iconPath: '/assets/icon/mobile-access-tile.svg',
    isEnable: false,
    navigate: NAVIGATE.mobileAccess,
    buttonConfig: {
      show: true,
      title: 'All Locations',
      navigate: NAVIGATE.mobileAccess,
    },
  },
  {
    id: DASHBOARD_SETTINGS_CONFIG.enableMeals.name,
    title: 'Meal Donations',
    iconPath: '/assets/icon/meal-outline.svg',
    isEnable: false,
    navigate: `${NAVIGATE.accounts}/${ACCOUNT_ROUTING.mealDonations}`,
    buttonConfig: {
      show: true,
      title: 'Donate a Meal',
      navigate: `${NAVIGATE.accounts}/${ACCOUNT_ROUTING.mealDonations}`,
    },
  },
  {
    id: DASHBOARD_SETTINGS_CONFIG.enableOrder.name,
    title: 'Order',
    iconPath: '/assets/icon/order.svg',
    isEnable: false,
    navigate: NAVIGATE.ordering,
    buttonConfig: {
      show: true,
      title: 'Start an order',
      navigate: NAVIGATE.ordering,
    },
  },
  {
    id: DASHBOARD_SETTINGS_CONFIG.enableExplore.name,
    title: 'Explore',
    iconPath: '/assets/icon/map.svg',
    isEnable: false,
    navigate: NAVIGATE.accounts,
    buttonConfig: {
      show: true,
      title: 'Explore All',
      navigate: NAVIGATE.accounts,
    },
  },
  {
    id: DASHBOARD_SETTINGS_CONFIG.enableConversation.name,
    title: 'Conversations',
    iconPath: '/assets/icon/chat.svg',
    isEnable: false,
    navigate: NAVIGATE.secureMessage,
    buttonConfig: {
      show: true,
      title: 'Start a conversation',
      navigate: NAVIGATE.secureMessage,
    },
  },
  {
    id: DASHBOARD_SETTINGS_CONFIG.enableHousing.name,
    title: 'Housing',
    iconPath: '/assets/icon/building.svg',
    isEnable: false,
    navigate: NAVIGATE.housing,
    buttonConfig: {
      show: false,
    },
  },
];

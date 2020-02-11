import { NAVIGATE } from 'src/app/app.global';
import { TileWrapperConfig } from './models';
import { ALL_ACCOUNTS, LOCAL_ROUTING as ACCOUNT_ROUTING } from '@sections/accounts/accounts.config';

export enum DASHBOARD_NAVIGATE {
  scanCard = 'scan-card',
}

export const DASHBOARD_SETTINGS_CONFIG = {
  enableScanCardButton: {
    domain: 'get',
    category: 'feature',
    name: 'enable_get_my_card',
  },
  displayMediaType: {
    domain: 'get',
    category: 'feature',
    name: 'mobile_patron_cashless_display_media_type',
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

export const TILES_ID = {
  accounts: 'accounts',
  transactions: 'transactions',
  rewards: DASHBOARD_SETTINGS_CONFIG.enableRewards.name,
  mobileAccess: DASHBOARD_SETTINGS_CONFIG.enableMobileAccess.name,
  mealDonations: DASHBOARD_SETTINGS_CONFIG.enableMeals.name,
  order: DASHBOARD_SETTINGS_CONFIG.enableOrder.name,
  explore: DASHBOARD_SETTINGS_CONFIG.enableExplore.name,
  conversations: DASHBOARD_SETTINGS_CONFIG.enableConversation.name,
  housing: DASHBOARD_SETTINGS_CONFIG.enableHousing.name,
};

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
    id: TILES_ID.rewards,
    title: 'Rewards',
    iconPath: '/assets/icon/trophy.svg',
    isEnable: false,
    navigate: NAVIGATE.rewards,
    buttonConfig: {
      show: false,
    },
  },
  {
    id: TILES_ID.mobileAccess,
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
    id: TILES_ID.mealDonations,
    title: 'Meals',
    iconPath: '/assets/icon/meal-outline.svg',
    isEnable: false,
    navigate: `${NAVIGATE.accounts}/${ACCOUNT_ROUTING.mealDonations}`,
    buttonConfig: {
      show: true,
      title: 'Meal Donation',
      navigate: `${NAVIGATE.accounts}/${ACCOUNT_ROUTING.mealDonations}`,
    },
  },
  {
    id: TILES_ID.order,
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
    id: TILES_ID.explore,
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
    id: TILES_ID.conversations,
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
    id: TILES_ID.housing,
    title: 'Housing',
    iconPath: '/assets/icon/building.svg',
    isEnable: false,
    navigate: NAVIGATE.housing,
    buttonConfig: {
      show: false,
    },
  },
];

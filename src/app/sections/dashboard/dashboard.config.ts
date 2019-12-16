import { NAVIGATE } from 'src/app/app.global';
import { TileWrapperConfig } from './models';

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
  order = 'order',
  explore = 'explore',
  conversations = 'conversations'
}

export enum TILES_TITLE {
  accounts = 'Accounts',
  transactions = 'Transactions',
  rewards = 'Rewards',
  mobileAccess = 'Mobile Access',
  order = 'Order',
  explore = 'Explore',
  conversations = 'Conversations'
}

export const tilesConfig: TileWrapperConfig[] = [
  {
    id: TILES_ID.accounts,
    title: 'Accounts',
    iconPath: '/assets/icon/accounts.svg',
    isEnable: true,
    navigate: NAVIGATE.accounts,
    buttonConfig: {
      show: false,
      title: 'Add Funds',
      navigate: NAVIGATE.addFounds,
    },
  },
  {
    id: TILES_ID.transactions,
    title: 'Transactions',
    iconPath: '/assets/icon/transactions.svg',
    isEnable: true,
    navigate: NAVIGATE.accounts,
    buttonConfig: {
      show: true,
      title: 'All Transactions',
      navigate: NAVIGATE.accounts,
    },
  },
  {
    id: DASHBOARD_SETTINGS_CONFIG.enableRewards.name,
    title: 'Rewards',
    iconPath: '/assets/icon/trophy.svg',
    isEnable: true,
    navigate: NAVIGATE.rewards,
    buttonConfig: {
      show: false,
    },
  },
  {
    id: DASHBOARD_SETTINGS_CONFIG.enableMobileAccess.name,
    title: 'Mobile Access',
    iconPath: '/assets/icon/mobile-access-tile.svg',
    isEnable: true,
    navigate: NAVIGATE.mobileAccess,
    buttonConfig: {
      show: true,
      title: 'All Locations',
      navigate: NAVIGATE.mobileAccess,
    },
  },
  {
    id: DASHBOARD_SETTINGS_CONFIG.enableOrder.name,
    title: 'Order',
    iconPath: '/assets/icon/order.svg',
    isEnable: true,
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
    isEnable: true,
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
    isEnable: true,
    navigate: NAVIGATE.secureMessage,
    buttonConfig: {
      show: true,
      title: 'Start a conversation',
      navigate: NAVIGATE.secureMessage,
    },
  },
];

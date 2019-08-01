import * as Globals from '../../app.global';

export const SYSTEM_SETTINGS_CONFIG = {
  enableOnetimeDeposits: {
    domain: 'get',
    category: 'deposit',
    name: 'enable_onetime_deposits',
  },
  enableAutoDeposits: {
    domain: 'get',
    category: 'feature',
    name: 'enable_auto_deposits',
  },
  depositTenders: {
    domain: 'get',
    category: 'feature',
    name: 'deposit_tenders',
  },
  displayTenders: {
    domain: 'get',
    category: 'feature',
    name: 'display_tenders',
  },
  guestDeposit: {
    domain: 'get',
    category: 'deposit',
    name: 'enable_guest_deposits',
  },
};

export enum ACCOUNT_TYPES {
  meals = 1,
  charge = 2,
  decliningBalance = 3,
}

export enum LOCAL_ROUTING {
  requestFunds = 'request-funds',
  autoDeposit = 'auto-deposit',
  addFunds = 'add-funds',
  accountDetails = 'account-details',
  accountDetailsM = 'account-details-m',
}

export enum TRANSACTION_TYPE {
  debit = 1,
  deposit = 3,
}

export enum PAYMENT_SYSTEM_TYPE {
  OPCS = 1,
  CSGOLD = 2,
  MONETRA = 3,
  USAEPAY = 4,
}

export const ALL_ACCOUNTS = 'all_accounts';

export enum TIME_PERIOD {
  pastMonth = 'past_month',
  pastSixMonth = 'past_six_month',
}

export enum CONTENT_STRINGS {
  cancelBtn = 'button_cancel',
  closeBtn = 'button_close',
  retryBtn = 'button_retry',
  retryTitle = 'dialog_header_retry',
  
  
}

export const ContentStringsParamsAccounts = {
  category: Globals.ContentString.CATEGORIES.accounts,
  domain: Globals.ContentString.DOMAINS.patron,
};

export const ContentStringsParamsTransactions = {
  category: Globals.ContentString.CATEGORIES.transactions,
  domain: Globals.ContentString.DOMAINS.patron,
};

export const GenericContentStringsParams = {
  category: Globals.ContentString.CATEGORIES.core,
  domain: Globals.ContentString.DOMAINS.patron,
};

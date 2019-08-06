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
  billMeMapping: {
    domain: 'get',
    category: 'deposit',
    name: 'billme_mapping',
  },
  freeFromDepositEnabled: {
    domain: 'get',
    category: 'deposit',
    name: 'allow_freeform_onetime_amounts',
  },
  presetDepositAmountsBillMe: {
    domain: 'get',
    category: 'deposit',
    name: 'billme_amounts',
  },
  presetDepositAmountsCreditCard: {
    domain: 'get',
    category: 'deposit',
    name: 'onetime_amounts',
  },
  paymentTypes: {
    domain: 'get',
    category: 'deposit',
    name: 'payment_types',
  },
  minAmountbillme: {
    domain: 'get',
    category: 'deposit',
    name: 'billme_minimum',
  },
  minAmountCreditCard: {
    domain: 'get',
    category: 'deposit',
    name: 'onetime_minimum',
  },
  maxAmountbillme: {
    domain: 'get',
    category: 'deposit',
    name: '	billme_maximum',
  },
  maxAmountCreditCard: {
    domain: 'get',
    category: 'deposit',
    name: 'onetime_maximum',
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

export enum PAYMENT_TYPE {
  CREDIT,
  BILLME,
}

export const ALL_ACCOUNTS = 'all_accounts';

export enum TIME_PERIOD {
  pastMonth = 'past_month',
  pastSixMonth = 'past_six_month',
}

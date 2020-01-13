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
  billMeAmounts: {
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
    name: 'billme_maximum',
  },
  maxAmountCreditCard: {
    domain: 'get',
    category: 'deposit',
    name: 'onetime_maximum',
  },
  lowBalanceAutoDepositEnabled: {
    domain: 'get',
    category: 'feature',
    name: 'enable_low_balance_auto_deposit',
  },
  lowBalanceFreeFormEnabled: {
    domain: 'get',
    category: 'deposit',
    name: 'allow_freeform_low_balance_amounts',
  },
  autoDepositPaymentTypes: {
    domain: 'get',
    category: 'deposit',
    name: 'auto_deposit_payment_types',
  },
  lowBalanceAmounts: {
    domain: 'get',
    category: 'deposit',
    name: 'low_balance_amounts',
  },
  billMeFreeFormEnabled: {
    domain: 'get',
    category: 'deposit',
    name: 'allow_freeform_billme_amounts',
  },
  autoDepositTenders: {
    domain: 'get',
    category: 'feature',
    name: 'auto_deposit_tenders',
  },
  enableMealDonations: {
    domain: 'get',
    category: 'feature',
    name: 'meal_donations_enabled',
  },
  mealDonationsTenders: {
    domain: 'get',
    category: 'meal_donation',
    name: 'tenders',
  },
  mealDonationsAllowFreeform: {
    domain: 'get',
    category: 'meal_donation',
    name: 'allow_freeform',
  },
  mealDonationsFixedMealAmounts: {
    domain: 'get',
    category: 'meal_donation',
    name: 'fixed_meal_amounts',
  },
  mealDonationsFixedDollarAmounts: {
    domain: 'get',
    category: 'meal_donation',
    name: 'fixed_dollar_amounts',
  },
};

export enum ACCOUNT_TYPES {
  meals = 1, // Meals, Board
  charge = 2, // Charge, Credit
  decliningBalance = 3, // declining balance, points
}

export enum LOCAL_ROUTING {
  requestFunds = 'request-funds',
  autoDeposit = 'auto-deposit',
  addFunds = 'add-funds',
  accountDetails = 'account-details',
  accountDetailsM = 'account-details-m',
  addCreditCard = 'add-credit-card',
  mealDonations = 'meal-donations',
}

export enum PAYMENT_SYSTEM_TYPE {
  OPCS = 1,
  CSGOLD = 2,
  MONETRA = 3,
  USAEPAY = 4,
}

export enum PAYMENT_TYPE {
  CREDIT = 1,
  BILLME = 2,
}

export const ALL_ACCOUNTS = 'all_accounts';

export enum TIME_PERIOD {
  pastSixMonth = 'past_six_month',
  pastMonth = 'past_month',
}

export enum CONTENT_STRINGS {
  cancelBtn = 'button_cancel',
  closeBtn = 'button_close',
  retryBtn = 'button_retry',
  doneBtn = 'button_done',
  retryTitle = 'dialog_header_retry',
  addFundsBtn = 'button_add-funds',
  autoDepositBtn = 'button_auto-deposit',
  requestFundsBtn = 'button_request-funds',
  // mealDonationsBtn = 'button_meal-donations', 
  headerTitle = 'header_title',
  headerBackBtn = 'header_button_back',
  allAccountsLabel = 'label_all-accounts',
  accountsLabel = 'label_accounts',
  filterLabel = 'label_filter',
  mealSuffixLabel = 'meal-plan-suffix',
  mealSuffixPluralLabel = 'meal-plan-suffix-plural',
  filterAccountLabel = 'label_filter_account',
  filterDateLabel = 'label_filter_date-range',
  pastSixMonthsLabel = 'label_past-six-months',
  recentTransactionsLabel = 'label_recent-transactions',
  infiniteScrollLoader = 'loader_infinite-scroll',
  moreLabel = 'label_more',
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

export enum CREDITCARD_TYPE {
  'AmericanExpress',
  'Discover',
  'MasterCard',
  'Visa',
  'Dindes',
}

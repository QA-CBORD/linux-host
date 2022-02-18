import * as Globals from '../../app.global';
import { ServerErrorsInfo } from '@core/model/server_error/server-error.model';

export enum ACCOUNT_TYPES {
  meals = 1, // Meals, Board
  charge = 2, // Charge, Credit
  decliningBalance = 3, // declining balance, points
  applePay = 4 // Apple Pay
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
  mealDonationsBtn = 'dashboard_title',
  headerTitle = 'header_title',
  headerBackBtn = 'header_button_back',
  allAccountsLabel = 'label_all-accounts',
  accountsLabel = 'label_accounts',
  billMeDepositReviewInstructions = 'label_deposit-billme_review-instructions',
  creditDepositReviewInstructions = 'label_deposit-credit_review-instructions',
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

export const CREDITCARD_ICONS = {
  [CREDITCARD_TYPE.AmericanExpress]: "/assets/icon/amex.svg",
  [CREDITCARD_TYPE.Discover]: "/assets/icon/discover.svg",
  [CREDITCARD_TYPE.MasterCard]: "/assets/icon/master_card_dark.svg",
  [CREDITCARD_TYPE.Visa]: "/assets/icon/visa_dark.svg",
  [CREDITCARD_TYPE.Dindes]: "/assets/icon/unknown.svg"
}

export const ACCOUNTS_VALIDATION_ERRORS: ServerErrorsInfo = {
  6112: 'You have insufficient funds in the selected account',
};

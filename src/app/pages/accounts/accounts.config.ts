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
}

export enum PAYMENT_SYSTEM_TYPE {
  OPCS = 1,
  CSGOLD = 2,
  MONETRA = 3,
  USAEPAY = 4,
}

// cashless type witch are allow to show
//paymentSystemType (field of acc)
// public static final Integer OPCS = 1;
// public static final Integer CSGOLD = 2;
//
// // cashless type witch aren't allow to show
// public static final Integer MONETRA = 3;
// public static final Integer USAEPAY = 4;

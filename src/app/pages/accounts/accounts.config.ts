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

export const MENU_LIST_ITEMS = new Map<string, string>([
  [SYSTEM_SETTINGS_CONFIG.depositTenders.name, 'Request Funds'],
  [SYSTEM_SETTINGS_CONFIG.enableAutoDeposits.name, 'Auto Deposits'],
  [SYSTEM_SETTINGS_CONFIG.enableOnetimeDeposits.name, 'Add Funds'],
]);

export enum LOCAL_ROUTING {
  requestFunds = 'request-funds',
  autoDepostit = 'auto-deposit',
  addFunds = 'add-funds',
}

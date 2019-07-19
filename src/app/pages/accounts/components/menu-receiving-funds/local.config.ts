import { LOCAL_ROUTING, SYSTEM_SETTINGS_CONFIG } from '../../accounts.config';

export const MENU_LIST_ITEMS = new Map<string, string>([
  [SYSTEM_SETTINGS_CONFIG.guestDeposit.name, 'Request Funds'],
  [SYSTEM_SETTINGS_CONFIG.enableAutoDeposits.name, 'Auto Deposits'],
  [SYSTEM_SETTINGS_CONFIG.enableOnetimeDeposits.name, 'Add Funds'],
]);

export const MENU_LIST_ROUTES = new Map<string, string>([
  [SYSTEM_SETTINGS_CONFIG.guestDeposit.name, LOCAL_ROUTING.requestFunds],
  [SYSTEM_SETTINGS_CONFIG.enableAutoDeposits.name, LOCAL_ROUTING.autoDeposit],
  [SYSTEM_SETTINGS_CONFIG.enableOnetimeDeposits.name, LOCAL_ROUTING.addFunds],
]);

export const MENU_LIST_ICONS = new Map<string, string>([
  [SYSTEM_SETTINGS_CONFIG.guestDeposit.name, 'assets/icon/deposit.svg'],
  [SYSTEM_SETTINGS_CONFIG.enableAutoDeposits.name, 'assets/icon/deposit-automatic.svg'],
  [SYSTEM_SETTINGS_CONFIG.enableOnetimeDeposits.name, 'assets/icon/envelope-open-dollar.svg'],
]);

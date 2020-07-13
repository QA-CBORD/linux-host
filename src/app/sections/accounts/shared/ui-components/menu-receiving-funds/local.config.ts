import { LOCAL_ROUTING } from '../../../accounts.config';
import { Settings } from '../../../../../app.global';

export const MENU_LIST_ITEMS = new Map<string, string>([
  [Settings.Setting.ONETIME_DEPOSITS_ENABLED.split('.')[2], 'Add Funds'],
  [Settings.Setting.AUTO_DEPOSIT_ENABLED.split('.')[2], 'Auto Deposits'],
  [Settings.Setting.GUEST_DEPOSIT_ENABLED.split('.')[2], 'Request Funds'],
  [Settings.Setting.MEAL_DONATIONS_ENABLED.split('.')[2], 'Meal Donations'],
  [Settings.Setting.LOW_BALANCE_AUTO_DEPOSIT_ENABLED.split('.')[2], 'Auto Deposits'],
]);

export const MENU_LIST_ROUTES = new Map<string, string>([
  [Settings.Setting.GUEST_DEPOSIT_ENABLED.split('.')[2], LOCAL_ROUTING.requestFunds],
  [Settings.Setting.AUTO_DEPOSIT_ENABLED.split('.')[2], LOCAL_ROUTING.autoDeposit],
  [Settings.Setting.LOW_BALANCE_AUTO_DEPOSIT_ENABLED.split('.')[2], LOCAL_ROUTING.autoDeposit],
  [Settings.Setting.ONETIME_DEPOSITS_ENABLED.split('.')[2], LOCAL_ROUTING.addFunds],
  [Settings.Setting.MEAL_DONATIONS_ENABLED.split('.')[2], LOCAL_ROUTING.mealDonations],
]);

export const MENU_LIST_ICONS = new Map<string, string>([
  [Settings.Setting.GUEST_DEPOSIT_ENABLED.split('.')[2], 'assets/icon/envelope-open-dollar-filled.svg'],
  [Settings.Setting.AUTO_DEPOSIT_ENABLED.split('.')[2], 'assets/icon/calendar-alt-fill.svg'],
  [Settings.Setting.LOW_BALANCE_AUTO_DEPOSIT_ENABLED.split('.')[2], 'assets/icon/calendar-alt-fill.svg'],
  [Settings.Setting.ONETIME_DEPOSITS_ENABLED.split('.')[2], 'assets/icon/deposit-filled.svg'],
  [Settings.Setting.MEAL_DONATIONS_ENABLED.split('.')[2], 'assets/icon/meal-filled-white.svg'],
]);

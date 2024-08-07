import { GUEST_NAVIGATION, Settings } from 'src/app/app.global';
import { GuestDashboardSection } from './dashboard.item.model';
import { getSettingName } from '@core/utils/settings-helper';

const imageBaseUrl = 'assets/icon';

export const SECTIONS_ID = {
  accounts: getSettingName(Settings.Setting.GUEST_DEPOSIT_ENABLED),
  order: getSettingName(Settings.Setting.FOOD_ENABLED),
  explore: getSettingName(Settings.Setting.PLACES_ENABLED),
};

export const GuestDashboardSections: GuestDashboardSection[] = [
  {
    id: SECTIONS_ID.accounts,
    title: 'patron-ui.guest-dashboard.deposit',
    imageUrl: `${imageBaseUrl}/get_deposit.svg`,
    willNavigate: true,
    stackNavigation: true,
    url: GUEST_NAVIGATION.deposit,
  },
  {
    id: SECTIONS_ID.order,
    title: 'patron-ui.guest-dashboard.order',
    imageUrl: `${imageBaseUrl}/get_order.svg`,
    willNavigate: true,
    url: GUEST_NAVIGATION.ordering,
  },
  {
    id: SECTIONS_ID.explore,
    title: 'patron-ui.guest-dashboard.explore',
    imageUrl: `${imageBaseUrl}/get_explore.svg`,
    willNavigate: true,
    url: GUEST_NAVIGATION.explore,
  },
];

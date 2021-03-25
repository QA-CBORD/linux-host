import { GUEST_NAVIGATION } from 'src/app/app.global';
import { GuestDashboardSection } from './dashboard.item.model';
import { GuestSetting } from './guest-settings';

const imageBaseUrl = 'assets/icon';

export const GuestDashboardSections: { [key: string]: GuestDashboardSection } = {
  deposit: {
    title: 'Guest Deposit',
    imageUrl: `${imageBaseUrl}/get_deposit.svg`,
    willNavigate: true,
    url: GUEST_NAVIGATION.deposit,
    visibilityOn: (settings: GuestSetting) => settings.guestDeposit
  },
  order: {
    title: 'Start an order',
    imageUrl: `${imageBaseUrl}/get_order.svg`,
    willNavigate: true,
    url: GUEST_NAVIGATION.ordering,
    visibilityOn: (settings: GuestSetting) => settings.guestLoginNotRequired
  },
  explore: {
    title: 'Explore',
    imageUrl: `${imageBaseUrl}/get_explore.svg`,
    willNavigate: true,
    url: GUEST_NAVIGATION.explore,
    visibilityOn: (settings: GuestSetting) => true
  },
};

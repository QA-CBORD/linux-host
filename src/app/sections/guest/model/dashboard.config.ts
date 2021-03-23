import { GuestFacadeService } from '../services/guest.facade.service';
import { GuestDashboardSection } from './dashboard.item.model';

const imageBaseUrl = 'asset/icons';

export const GuestDashboardSections: { [key: string]: GuestDashboardSection } = {
  deposit: {
    title: 'Guest Deposit',
    imageUrl: `${imageBaseUrl}/guest_depot.png`,
    onclick: (service: GuestFacadeService) => {},
  },
  order: {
    title: 'Start an order',
    imageUrl: `${imageBaseUrl}/order.png`,
    onclick: function(service: GuestFacadeService) {},
  },
  explore: {
    title: 'Explore',
    imageUrl: `${imageBaseUrl}/explore.png`,
    onclick: (service: GuestFacadeService) => {},
  },
};

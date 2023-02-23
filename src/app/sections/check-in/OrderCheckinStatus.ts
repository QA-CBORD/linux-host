import { ORDERING_STATUS_BY_LABEL } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';

export enum CheckinStatuses {
  CHECKED_IN = 1,
  NOT_CHECKED_IN_REMINDER_SENT = 2,
  NOT_CHECKED_IN_NO_REMINDER_SENT = 3,
}

export const OrderCheckinStatus = {
  isNotCheckedIn: (status: number): boolean => {
    const isCaceled = ORDERING_STATUS_BY_LABEL.Canceled.includes(status);

    return (
      (status == CheckinStatuses.NOT_CHECKED_IN_REMINDER_SENT ||
        status == CheckinStatuses.NOT_CHECKED_IN_NO_REMINDER_SENT) &&
        !isCaceled
    );
  },
};

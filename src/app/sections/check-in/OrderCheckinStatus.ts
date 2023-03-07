import { ORDERING_STATUS_BY_LABEL } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';

export enum CheckinStatuses {
  CHECKED_IN = 1,
  NOT_CHECKED_IN_REMINDER_SENT = 2,
  NOT_CHECKED_IN_NO_REMINDER_SENT = 3,
}

export const OrderCheckinStatus = {
  isNotCheckedIn: (checkInStatus: number, status: number): boolean => {
    
    const isPending = ORDERING_STATUS_BY_LABEL.Pending.includes(status);
    const isCheckInPending = [
      CheckinStatuses.NOT_CHECKED_IN_REMINDER_SENT,
      CheckinStatuses.NOT_CHECKED_IN_NO_REMINDER_SENT,
    ].includes(checkInStatus);

    return isPending && isCheckInPending;
  },
};

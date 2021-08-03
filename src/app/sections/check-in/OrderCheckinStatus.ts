export enum CheckinStatuses {
  CHECKED_IN = 1,
  NOT_CHECKED_IN_REMINDER_SENT = 2,
  NOT_CHECKED_IN_NO_REMINDER_SENT = 3,
}

export const OrderCheckinStatus = {
  isCheckedIn: (status: number): boolean => {
    return (
      status == CheckinStatuses.NOT_CHECKED_IN_REMINDER_SENT ||
      status == CheckinStatuses.NOT_CHECKED_IN_NO_REMINDER_SENT
    );
  },
};

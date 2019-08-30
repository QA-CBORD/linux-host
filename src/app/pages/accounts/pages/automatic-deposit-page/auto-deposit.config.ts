import { WEEK } from "../../../../core/utils/date-helper";

export enum AUTO_DEPOSIT_PAYMENT_TYPES {
  automaticDepositOff = 0,
  timeBased = 1,
  lowBalance = 2,
}
export enum DEPOSIT_FREQUENCY {
  week = 'week',
  month = 'month',
}

export enum AUTO_DEPOST_SUCCESS_MESSAGE_TITLE {
  lowBalance = 'Low Balance Deposit Enabled!',
  weekly = 'Weekly Deposit Enabled!',
  monthly = 'Monthly Deposit Enabled!',
}

export const getLowBalanceSuccessBodyMessage = (amount: string, lowAmount: string, accName: string) => {
  return `We'll automatically add $${amount} every time your ${accName} account drops below $${lowAmount}.`;
};

export const getWeeklySuccessBodyMessage = (amount: string, day: number, accName: string) => {
  return `We'll automatically add $${amount} every week on ${WEEK[day]} to your ${accName} account.`;
};

export const getMonthlySuccessBodyMessage = (amount: string, day: number, accName: string) => {
  let dayAsString;
  switch (day) {
    case 1:
      dayAsString = '1st';
      break;
    case 2:
      dayAsString = '2nd';
      break;
      case 3:
      dayAsString = '3rd';
      break;
    default:
      dayAsString = `${day}th`;
  }
  return `We'll automatically add $${amount} every month on ${dayAsString} to your ${accName} account.`;
};

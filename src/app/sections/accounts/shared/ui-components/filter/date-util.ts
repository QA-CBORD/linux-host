import { TIME_PERIOD } from '../../../accounts.config';
import { ORDERS_PERIOD } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';

export const MONTH = [];
MONTH[0] = 'January';
MONTH[1] = 'February';
MONTH[2] = 'March';
MONTH[3] = 'April';
MONTH[4] = 'May';
MONTH[5] = 'June';
MONTH[6] = 'July';
MONTH[7] = 'August';
MONTH[8] = 'September';
MONTH[9] = 'October';
MONTH[10] = 'November';
MONTH[11] = 'December';

export interface DateUtilObject {
  readonly name: string;
  readonly year?: number;
  readonly month?: number;
}

export interface TimeRange {
  readonly startDate?: string | null;
  readonly endDate?: string | null;
}

const getNameMonth = (m: number): string => {
  return MONTH[m];
};

const createMonthObject = (date: Date): DateUtilObject => {
  return {
    name: getNameMonth(date.getMonth()),
    year: date.getFullYear(),
    month: date.getMonth(),
  };
};

export const getAmountOfMonthFromPeriod = (n: number, date?: Date): DateUtilObject[] => {
  const startPeriod = date ? date : new Date();
  const month = [];
  let currentMonth = createMonthObject(startPeriod);
  let prevMonth;

  for (let i = 0; i < n; i++) {
    prevMonth = currentMonth;
    const prevMonthDate =
      prevMonth.month === 0 ? new Date(currentMonth.year - 1, 11) : new Date(currentMonth.year, currentMonth.month - 1);
    currentMonth = createMonthObject(prevMonthDate);
    month.push(currentMonth);
  }

  return month;
};

export const getTimeRangeOfDate = (date: DateUtilObject): TimeRange => {
  let earliestDate;
  let latestDate;
  const month = 30;
  const halfYear = 180;

  if (date.name === TIME_PERIOD.pastMonth || date.name === TIME_PERIOD.pastSixMonth) {
    const daysBack = date.name === TIME_PERIOD.pastMonth ? month : halfYear;

    earliestDate = null;
    latestDate = new Date(new Date().setDate(new Date().getDate() - daysBack));
  } else {
    const nextMonth = new Date(date.year, date.month + 1).valueOf();

    latestDate = new Date(date.year, date.month);
    earliestDate = new Date(nextMonth - 1);
  }
  earliestDate = earliestDate ? earliestDate.toISOString() : null;
  latestDate = latestDate.toISOString();

  return { startDate: earliestDate, endDate: latestDate };
};

export const getTimeRangeByPeriod = (period: ORDERS_PERIOD): TimeRange => {
  const endDate = new Date(new Date().setDate(new Date().getDate())).toISOString();

  return {
    [ORDERS_PERIOD.LASTWEEK]: {
      startDate: new Date(new Date().setDate(new Date().getDate() - ORDERS_PERIOD.LASTWEEK - 1)).toISOString(),
      endDate
    },
    [ORDERS_PERIOD.LAST30DAYS]: {
      startDate: new Date(new Date().setDate(new Date().getDate() - ORDERS_PERIOD.LAST30DAYS - 1)).toISOString(),
      endDate
    },
    [ORDERS_PERIOD.LAST90DAYS]: {
      startDate:  new Date(new Date().setDate(new Date().getDate() - ORDERS_PERIOD.LAST90DAYS - 1)).toISOString(),
      endDate
    },
  }[period];
};

export const getRangeBetweenDates = (sourceDate: DateUtilObject, targetDate: DateUtilObject): TimeRange => {
  const { startDate: endDate } = getTimeRangeOfDate(sourceDate);
  const { startDate } = getTimeRangeOfDate(targetDate);
  return { startDate, endDate };
};

export const getUniquePeriodName = (date: DateUtilObject): string => {
  return date.name === TIME_PERIOD.pastSixMonth || date.name === TIME_PERIOD.pastMonth
    ? date.name
    : `${date.name} ${date.year}`;
};

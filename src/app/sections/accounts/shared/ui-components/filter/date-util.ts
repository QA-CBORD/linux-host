import { TIME_PERIOD } from '../../../accounts.config';

const month = [];
month[0] = 'January';
month[1] = 'February';
month[2] = 'March';
month[3] = 'April';
month[4] = 'May';
month[5] = 'June';
month[6] = 'July';
month[7] = 'August';
month[8] = 'September';
month[9] = 'October';
month[10] = 'November';
month[11] = 'December';

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
  return month[m];
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

    earliestDate = new Date(date.year, date.month);
    latestDate = new Date(nextMonth - 1);
  }
  earliestDate = earliestDate ? earliestDate.toISOString() : null;
  latestDate = latestDate.toISOString();

  return { startDate: earliestDate, endDate: latestDate };
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

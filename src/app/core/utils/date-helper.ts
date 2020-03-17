import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { MONTH } from '@sections/accounts/shared/ui-components/filter/date-util';

export const determineDate = (date?: string) => (date ? new Date(date) : new Date());

export const toISOString = () => new Date().toISOString();

export const toLocaleString = (date?: string) => determineDate(date).toLocaleString();

export const getTime = (date?: string) => determineDate(date).getTime();

export const getDateTimeInGMT = (dueTime, locale, timeZone) => {
  const localTimezone = new Date().toLocaleString(locale, { timeZone });
  const greenwichTimezone = new Date().toLocaleString(locale, { timeZone: 'Europe/London' });
  let timeZoneinGMT: any = (<any>new Date(greenwichTimezone) - <any>new Date(localTimezone)) / 1000 / 60 / 60;
  timeZoneinGMT = timeZoneinGMT * -1;
  const toString = JSON.stringify(timeZoneinGMT);
  timeZoneinGMT = `${toString[0]}${toString[1].length > 1 ? toString[1] : '0' + toString[1]}`;

  const usa = new Date(dueTime);
  const usaTime = usa.toLocaleString(locale, {
    hour12: false,
    hour: '2-digit',
    day: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    month: '2-digit',
  });
  const arrOfDatetime = usaTime.split(',');
  const splettedTime = arrOfDatetime[0].split('/');
  return `${splettedTime[2]}-${splettedTime[0]}-${splettedTime[1]}T${arrOfDatetime[1].trim()}.000${timeZoneinGMT}00`;
};

export const convertGMTintoLocalTime = (dueTime, locale, timeZone): Date => {
  const localTimeInString: string = new Date(dueTime).toLocaleString(locale, { timeZone });

  return new Date(localTimeInString);
};

export const isSameDay = (c, n): boolean => {
  const current = new Date(c);
  const next = new Date(n);

  return (
    current.getFullYear() === next.getFullYear() &&
    current.getDate() === next.getDate() &&
    current.getMonth() === next.getMonth()
  );
};
export const WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const formatDateByContentStrings = (date: Date,
                                    weekContentStrings: ContentStringInfo[],
                                    monthContentStrings: ContentStringInfo[]): string => {
  let formattedWeek = sortContentStringsBySourceArray(weekContentStrings, WEEK);
  let formattedMonth = sortContentStringsBySourceArray(monthContentStrings, MONTH);

  return `${formattedWeek[date.getDay()]}, ${formattedMonth[date.getMonth()]} ${date.getDate()}`;
};

export const sortContentStringsBySourceArray = (contentStrings: ContentStringInfo[], sourceArray: string[]): string[] => {
  let res = [];

  for (let i = 0; i < contentStrings.length; i++) {
    const index = sourceArray.findIndex((elem) => elem.toLowerCase() === contentStrings[i].name.toLowerCase());
    res[index] = contentStrings[i].value;
  }

  return res;
};

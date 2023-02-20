import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { MONTH } from '@sections/accounts/shared/ui-components/filter/date-util';

export const determineDate = (date?: string) => (date ? new Date(date) : new Date());

export const toISOString = () => new Date().toISOString();

export const toLocaleString = (date?: string) => determineDate(date).toLocaleString();

export const getTime = (date?: string) => determineDate(date).getTime();

export const getDateTimeInGMT = (dueTime, locale, timeZone) => {
  const localTimezone = new Date().toLocaleString(locale, { timeZone });
  const greenwichTimezone = new Date().toLocaleString(locale, { timeZone: 'GMT' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const splittedTime = arrOfDatetime[0].split('/');
  return `${splittedTime[2]}-${splittedTime[0]}-${splittedTime[1]}T${arrOfDatetime[1].trim()}.000${timeZoneinGMT}00`;
};

export const convertGMTintoLocalTime = (dueTime, locale, timeZone): string => {
  const idxOfTimezone = dueTime.indexOf('+');
  const updatedDateFormat = `${dueTime.slice(0, idxOfTimezone)}Z`;
  const localTimeInString: string = new Date(updatedDateFormat).toLocaleString(locale, {
    timeZone,
    hour12: false,
    hour: '2-digit',
    day: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    month: '2-digit',
  });

  const arrOfDatetime = localTimeInString.split(',');
  const splittedTime = arrOfDatetime[0].split('/');

  return `${splittedTime[2]}-${splittedTime[0]}-${splittedTime[1]}T${arrOfDatetime[1].trim()}.000`;
};

export const isSameDay = (c, n, index = 0): boolean => {
  const current = new Date(c);
  const next = new Date(n);

  return (
    current.getFullYear() === next.getFullYear() &&
    current.getDate() + index === next.getDate() &&
    current.getMonth() === next.getMonth()
  );
};
export const WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const formatDateByContentStrings = (
  date: Date,
  weekContentStrings: ContentStringInfo[],
  monthContentStrings: ContentStringInfo[]
): string => {
  const formattedWeek = sortContentStringsBySourceArray(weekContentStrings, WEEK);
  const formattedMonth = sortContentStringsBySourceArray(monthContentStrings, MONTH);

  return `${formattedWeek[date.getDay()]}, ${formattedMonth[date.getMonth()]} ${date.getDate()}`;
};

export const sortContentStringsBySourceArray = (
  contentStrings: ContentStringInfo[],
  sourceArray: string[]
): string[] => {
  const res = [];

  for (let i = 0; i < contentStrings.length; i++) {
    const index = sourceArray.findIndex(elem => elem.toLowerCase() === contentStrings[i].name.toLowerCase());
    res[index] = contentStrings[i].value;
  }

  return res;
};

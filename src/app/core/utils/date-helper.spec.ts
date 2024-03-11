import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import {
  convertGMTintoLocalTime,
  determineDate,
  formatDate,
  formatDateByContentStrings,
  getDateTimeInGMT,
  getTime,
  isSameDay,
  toISOString,
  toLocaleString,
} from './date-helper';

describe('DateHelper', () => {
  it('should return the correct date string from determineDate', () => {
    const date = new Date().toISOString();
    expect(determineDate(date).toISOString()).toBe(date);
  });
  it('should return the current date if no date is provided', () => {
    const date = new Date().toISOString();
    expect(determineDate().toISOString()).toBe(date);
  });
  it('should return the correct date string from toISOString', () => {
    const date = toISOString();
    expect(typeof date).toBe('string');
  });
  it('should return locale string from toLocaleString', () => {
    const dateString = new Date().toISOString();
    const date = toLocaleString(dateString);
    expect(date).toBe(new Date(dateString).toLocaleString());
  });

  it('should return the correct time from getTime', () => {
    const date = new Date().toISOString();
    expect(getTime(date)).toBe(new Date(date).getTime());
  });

  it('should return a string in the correct format', () => {
    const dueTime = new Date('2024-03-11T12:30:00');
    const locale = 'en-US';
    const timeZone = 'America/New_York';

    const result = getDateTimeInGMT(dueTime, locale, timeZone);

    expect(result).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}-?\d{4}/);
  });

  it('should return correct time in GMT format', () => {
    const dueTime = new Date('2024-03-11T12:30:00');
    const locale = 'en-US';
    const timeZone = 'America/New_York';

    const result = getDateTimeInGMT(dueTime, locale, timeZone);

    const [timePart, timeZonePart] = result.split('T')[1].split('.');
    expect(timePart).toEqual('12:30:00');
  });
  it('should return a string in the correct format', () => {
    const dueTime = '2024-03-11T12:30:00.000+0000';
    const locale = 'en-US';
    const timeZone = 'America/New_York';

    const result = convertGMTintoLocalTime(dueTime, locale, timeZone);

    expect(result).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}/);
  });

  it('should return correct local time according to provided timezone', () => {
    const dueTime = '2024-03-11T12:30:00.000+0000'; // GMT time
    const locale = 'en-US';
    const timeZone = 'America/New_York';

    const result = convertGMTintoLocalTime(dueTime, locale, timeZone);

    // Parse the result and check if it's correctly converted to local time
    const [timePart] = result.split('T')[1].split('.');
    const expectedTime = new Date(dueTime).toLocaleTimeString(locale, {
      timeZone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    expect(timePart).toEqual(expectedTime);
  });
  it('should return true if two dates are the same day', () => {
    const currentDate = new Date('2024-03-11T12:30:00');
    const nextDate = new Date('2024-03-11T23:45:00');

    expect(isSameDay(currentDate, nextDate)).toBe(true);
  });

  it('should return false if two dates are not the same day', () => {
    const currentDate = new Date('2024-03-11T12:30:00');
    const nextDate = new Date('2024-03-12T05:15:00');

    expect(isSameDay(currentDate, nextDate)).toBe(false);
  });

  it('should return true if index is provided and dates are the same day with index offset', () => {
    const currentDate = new Date('2024-03-11T12:30:00');
    const nextDate = new Date('2024-03-10T23:45:00');

    expect(isSameDay(currentDate, nextDate, -1)).toBe(true);
  });

  it('should return false if index is provided and dates are not the same day with index offset', () => {
    const currentDate = new Date('2024-03-11T12:30:00');
    const nextDate = new Date('2024-03-10T23:45:00');

    expect(isSameDay(currentDate, nextDate, 0)).toBe(false);
  });
  it('should return formatted date string', () => {
    const date = new Date('2024-03-11');
    const weekContentStrings = [
      { name: 'Sunday', value: 'Sun' },
      { name: 'Monday', value: 'Mon' },
      { name: 'Tuesday', value: 'Tue' },
      { name: 'Wednesday', value: 'Wed' },
      { name: 'Thursday', value: 'Thu' },
      { name: 'Friday', value: 'Fri' },
      { name: 'Saturday', value: 'Sat' },
    ];
    const monthContentStrings = [
      { name: 'January', value: 'Jan' },
      { name: 'February', value: 'Feb' },
      { name: 'March', value: 'Mar' },
      { name: 'April', value: 'Apr' },
      { name: 'May', value: 'May' },
      { name: 'June', value: 'Jun' },
      { name: 'July', value: 'Jul' },
      { name: 'August', value: 'Aug' },
      { name: 'September', value: 'Sep' },
      { name: 'October', value: 'Oct' },
      { name: 'November', value: 'Nov' },
      { name: 'December', value: 'Dec' },
    ];

    const result = formatDateByContentStrings(
      date,
      weekContentStrings as ContentStringInfo[],
      monthContentStrings as ContentStringInfo[]
    );

    expect(result).toBe('Sun, Mar 10');
  });

  it('should format date string by replacing timezone with colon', () => {
    const date = '2024-03-11T12:30:00+0530';
    const expectedFormattedDate = '2024-03-11T12:30:00+05:30';

    const result = formatDate(date);

    expect(result).toBe(expectedFormattedDate);
  });

  it('should return unchanged date string if timezone is already formatted', () => {
    const date = '2024-03-11T12:30:00+05:30';
    const result = formatDate(date);

    expect(result).toBe(date);
  });

  it('should return unchanged date string if no timezone is present', () => {
    const date = '2024-03-11T12:30:00';

    const result = formatDate(date);

    expect(result).toBe(date);
  });
});

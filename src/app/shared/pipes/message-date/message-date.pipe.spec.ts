import { MessageDatePipe } from './message-date.pipe';
import { DatePipe } from '@angular/common';
import { SecureMessageInfo } from '@core/model/secure-messaging/secure-messaging.model';
import { TimeToMilliSecods } from './dateTime.model';
import { checkIsYesterday } from '@core/utils/general-helpers';

describe('MessageDatePipe', () => {
  let pipe: MessageDatePipe;
  let datePipe: DatePipe;

  beforeEach(() => {
    datePipe = new DatePipe('en-US');
    pipe = new MessageDatePipe(datePipe);
  });

  it('should return an empty string if sent_date is not provided', () => {
    const message: SecureMessageInfo = {} as SecureMessageInfo;
    expect(pipe.transform(message)).toBe('');
  });

  it('should return date in MMM d, h:mm a format if message is older than six days', () => {
    const message: SecureMessageInfo = {
      sent_date: new Date(Date.now() - TimeToMilliSecods.SixDays - 1).toISOString(),
    } as SecureMessageInfo;
    const expectedDate = datePipe.transform(new Date(message.sent_date), 'MMM d, h:mm a');
    expect(pipe.transform(message)).toBe(expectedDate);
  });

  it('should return day of the week and time if message is between two and six days old', () => {
    const message: SecureMessageInfo = {
      sent_date: new Date(Date.now() - TimeToMilliSecods.TwoDays - 1).toISOString(),
    } as SecureMessageInfo;
    const expectedDate = datePipe.transform(new Date(message.sent_date), 'E, h:mm a');
    expect(pipe.transform(message)).toBe(expectedDate);
  });

  it('should return "Yesterday at xx:xx AM/PM" if message is between one and two days old', () => {
    const message: SecureMessageInfo = {
      sent_date: new Date(Date.now() - TimeToMilliSecods.OneDay - 1).toISOString(),
    } as SecureMessageInfo;
    const expectedDate = datePipe.transform(new Date(message.sent_date), "'Yesterday at ' h:mm a'");
    expect(pipe.transform(message)).toBe(expectedDate);
  });

  it('should return time in h:mm a format if message is between five minutes and one day old', () => {
    const message: SecureMessageInfo = {
      sent_date: new Date(Date.now() - TimeToMilliSecods.FiveMinutes - 1).toISOString(),
    } as SecureMessageInfo;
    const expectedDate = datePipe.transform(new Date(message.sent_date), 'h:mm a');
    expect(pipe.transform(message)).toBe(expectedDate);
  });

  it('should return "x minutes ago" if message is between one and five minutes old', () => {
    const message: SecureMessageInfo = {
      sent_date: new Date(Date.now() - TimeToMilliSecods.OneMinute - 1).toISOString(),
    } as SecureMessageInfo;
    const minutesAgo = Math.round((Date.now() - new Date(message.sent_date).getTime()) / TimeToMilliSecods.OneMinute);
    const expectedDate = minutesAgo.toString() + (minutesAgo === 1 ? ' minute ago' : ' minutes ago');
    expect(pipe.transform(message)).toBe(expectedDate);
  });

  it('should return "Now" if message is less than one minute old', () => {
    const message: SecureMessageInfo = {
      sent_date: new Date(Date.now() - TimeToMilliSecods.OneMinute + 1).toISOString(),
    } as SecureMessageInfo;
    expect(pipe.transform(message)).toBe('Now');
  });
});

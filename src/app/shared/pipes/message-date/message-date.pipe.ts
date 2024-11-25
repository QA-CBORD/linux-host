import { Pipe, PipeTransform } from '@angular/core';

import { DatePipe } from '@angular/common';
import { SecureMessageInfo } from '@core/model/secure-messaging/secure-messaging.model';
import { checkIsYesterday } from '@core/utils/general-helpers';
import { TimeToMilliSecods } from './dateTime.model';

@Pipe({
  name: 'messageDate',
})
export class MessageDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(message: SecureMessageInfo): string {
    if (!message?.sent_date) return '';

    const today: Date = new Date();
    const sentDate: Date = new Date(message.sent_date);

    /// > 1 year (Full timestamp)
    if (today.getFullYear() > sentDate.getFullYear()) {
      return this.datePipe.transform(sentDate, 'mediumDate');
    }

    const timeDiff = today.getTime() - sentDate.getTime();

    /// > 5 days (<monthAbbv> <date>, xx:xx AM/PM)
    if (timeDiff > TimeToMilliSecods.SixDays) {
      return this.datePipe.transform(sentDate, 'MMM d, h:mm a');
    }

    /// > 2 days (<dayAbbv> xx:xx AM/PM)
    if (timeDiff >= TimeToMilliSecods.TwoDays) {
      return this.datePipe.transform(sentDate, 'E, h:mm a');
    }

    /// > 1 day (Yesterday at xx:xx AM/PM)
    if (timeDiff >= TimeToMilliSecods.OneDay || checkIsYesterday(sentDate)) {
      return this.datePipe.transform(sentDate, "'Yesterday at ' h:mm a'");
    }

    /// > 5 minutes (xx:xx AM/PM)
    if (timeDiff > TimeToMilliSecods.FiveMinutes) {
      return this.datePipe.transform(sentDate, 'h:mm a');
    }

    /// > 1 minute (x minutes ago)
    if (timeDiff > TimeToMilliSecods.OneMinute) {
      const minutesAgo = Math.round(timeDiff / TimeToMilliSecods.OneMinute);
      return minutesAgo.toString() + (minutesAgo === 1 ? ' minute ago' : ' minutes ago');
    }

    /// < 1 minute (Now)
    return 'Now';
  }
}

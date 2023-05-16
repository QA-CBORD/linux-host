import { Pipe, PipeTransform } from '@angular/core';

import { DatePipe } from '@angular/common';
import { SecureMessageInfo } from '@core/model/secure-messaging/secure-messaging.model';
import { checkIsYesterday } from '@core/utils/general-helpers';
const OneMinute = 60000;
const FiveMinutes = 300000;
const OneDay = 86400000;
const TwoDays = 172800000;
const SixDays = 518400000;

@Pipe({
  name: 'messageDate',
})
export class MessageDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(message: SecureMessageInfo): string {
    if (!message?.sent_date) return '';

    const today: Date = new Date();
    const sentDate: Date = new Date(message.sent_date);
    const timeDiff = today.getTime() - sentDate.getTime();

    /// > 6 days (<monthAbbv> <date>, xx:xx AM/PM)
    if (timeDiff > SixDays) {
      return this.datePipe.transform(sentDate, 'MM/dd/yy');
    }

    /// > 2 days (<dayAbbv> xx:xx AM/PM)
    if (timeDiff >= TwoDays) {
      return this.datePipe.transform(sentDate, 'EEEE');
    }

    /// > 1 day (Yesterday at xx:xx AM/PM)
    if (timeDiff >= OneDay || checkIsYesterday(sentDate)) {
      return this.datePipe.transform(sentDate, "'Yesterday'");
    }

    /// > 5 minutes (xx:xx AM/PM)
    if (timeDiff > FiveMinutes) {
      return this.datePipe.transform(sentDate, 'h:mm a');
    }

    /// > 1 minute (x minutes ago)
    if (timeDiff > OneMinute) {
      const minutesAgo = Math.round(timeDiff / OneMinute);
      return minutesAgo.toString() + (minutesAgo === 1 ? ' minute ago' : ' minutes ago');
    }

    /// < 1 minute (Now)
    return 'Now';
  }
}

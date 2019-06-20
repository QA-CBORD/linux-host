import { Pipe, PipeTransform } from '@angular/core';
import { SecureMessageInfo } from '../models';
import { determineDate } from '../../../core/utils/date-helper';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'messageDate',
})
export class MessageDatePipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe,
  ) {

  }

  transform({ sent_date }: SecureMessageInfo, args?: any): any {
    const today: Date = determineDate();
    const sentDate: Date = determineDate(sent_date);

    /// > 1 year (Full timestamp)
    if (today.getFullYear() > sentDate.getFullYear()) {
      return this.datePipe.transform(sentDate, 'mediumDate');
    }

    /// > 5 days (<monthAbbv> <date>, xx:xx AM/PM)
    if (today.getDate() - sentDate.getDate() > 5) {
      return this.datePipe.transform(sentDate, 'MMM d, h:mm a');
    }

    /// > 2 days (<dayAbbv> xx:xx AM/PM)
    if (today.getDate() - sentDate.getDate() >= 2) {
      return this.datePipe.transform(sentDate, 'E, h:mm a');
    }

    /// > 1 day (Yesterday at xx:xx AM/PM)
    if (today.getDate() - sentDate.getDate() >= 1) {
      // tslint:disable-next-line:quotemark
      return this.datePipe.transform(sentDate, '\'Yesterday at \' h:mm a\'');
    }

    /// > 5 minutes (xx:xx AM/PM)
    if (today.getTime() - sentDate.getTime() > 300000) {
      return this.datePipe.transform(sentDate, 'h:mm a');
    }

    /// > 1 minute (x minutes ago)
    if (today.getTime() - sentDate.getTime() > 60000) {
      const minutesAgo = Math.round((today.getTime() - sentDate.getTime()) / 60000);
      return minutesAgo.toString() + (minutesAgo === 1 ? ' minute ago' : ' minutes ago');
    }

    /// < 1 minute (Now)
    return 'Now';
  }
}

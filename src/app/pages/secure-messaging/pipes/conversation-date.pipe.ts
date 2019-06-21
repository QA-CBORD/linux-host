import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SecureMessageConversation } from '../models';

@Pipe({
  name: 'conversationDate',
  pure: false,
})
export class ConversationDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform({ messages }: SecureMessageConversation): any {
    const today: Date = new Date();
    const sentDate: Date = new Date(messages[messages.length - 1].sent_date);

    /// > 1 year (Full timestamp)
    if (today.getFullYear() > sentDate.getFullYear()) {
      return this.datePipe.transform(sentDate, 'y');
    }

    /// > 5 days (<monthAbbv> <date>, xx:xx AM/PM)
    if (today.getTime() - sentDate.getTime() > 432000000) {
      return this.datePipe.transform(sentDate, 'MMM d');
    }

    /// > 2 days (<dayAbbv> xx:xx AM/PM)
    if (today.getTime() - sentDate.getTime() >= 172800000) {
      return this.datePipe.transform(sentDate, 'E');
    }

    /// > 30 minutes (xx:xx AM/PM)
    if (today.getTime() - sentDate.getTime() > 1800000) {
      return this.datePipe.transform(sentDate, 'h:mm a');
    }

    /// > 1 minute (x minutes ago)
    if (today.getTime() - sentDate.getTime() > 60000) {
      const minutesAgo = Math.round((today.getTime() - sentDate.getTime()) / 60000);
      return minutesAgo.toString() + ' min';
    }

    /// < 1 minute (Now)
    return 'Now';
  }
}

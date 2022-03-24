import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SecureMessageConversation } from '@core/model/secure-messaging/secure-messaging.model';
import { messageSentDateToString } from '@core/utils/conversations-helper';

@Pipe({
  name: 'conversationDate',
  pure: false,
})
export class ConversationDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform({ messages }: SecureMessageConversation): string {
    return messageSentDateToString(new Date(messages[messages.length - 1].sent_date), this.datePipe);
  }
}

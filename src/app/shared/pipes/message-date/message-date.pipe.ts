import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SecureMessageInfo } from '@core/model/secure-messaging/secure-messaging.model';
import { messageSentDateToString } from '@core/utils/conversations-helper';

@Pipe({
  name: 'messageDate',
})
export class MessageDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform({ sent_date }: SecureMessageInfo): string {
    return messageSentDateToString(new Date(sent_date), this.datePipe);
  }
}

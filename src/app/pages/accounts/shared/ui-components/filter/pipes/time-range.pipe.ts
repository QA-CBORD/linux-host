import { TransactionService } from './../../../../services/transaction.service';
import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { DateUtilObject } from '../date-util';
import { CONTENT_STRINGS, TIME_PERIOD } from 'src/app/pages/accounts/accounts.config';

@Pipe({
  name: 'timeRange',
})
export class TimeRangePipe implements PipeTransform {
  private static contentString: { [key: string]: string };

  constructor(private readonly transactionsService: TransactionService) {
  }

  transform(value: DateUtilObject): string {
    this.setContentStrings();
    return this.localGetUniquePeriodName(value);
  }

  private localGetUniquePeriodName(date: DateUtilObject): string {
    return date.name === TIME_PERIOD.pastSixMonth || date.name === TIME_PERIOD.pastMonth
      ? TimeRangePipe.contentString[CONTENT_STRINGS.pastSixMonthsLabel]
      : `${date.name} ${date.year}`;
  }

  setContentStrings() {
    if(TimeRangePipe.contentString) return;
    const transactionStringNames: string[] = [
      CONTENT_STRINGS.allAccountsLabel,
      CONTENT_STRINGS.pastSixMonthsLabel,
      CONTENT_STRINGS.filterLabel,
    ];

    TimeRangePipe.contentString = this.transactionsService.getContentStrings(transactionStringNames);
  }
}

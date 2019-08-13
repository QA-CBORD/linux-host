import { TransactionService } from './../../../../services/transaction.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DateUtilObject, getUniquePeriodName } from '../date-util';
import { CONTENT_STRINGS, TIME_PERIOD } from 'src/app/pages/accounts/accounts.config';

@Pipe({
  name: 'timeRange',
})
export class TimeRangePipe implements PipeTransform {
  contentString: { [key: string]: string };

constructor(private readonly transactionsService: TransactionService){
  this.setContentStrings();
}

  transform(value: DateUtilObject): string {
    return this.localGetUniquePeriodName(value);
  }

  private localGetUniquePeriodName(date: DateUtilObject): string {
    console.log(date.name);
    
    return date.name === TIME_PERIOD.pastSixMonth || date.name === TIME_PERIOD.pastMonth
      ? this.contentString[CONTENT_STRINGS.pastSixMonthsLabel]
      : `${date.name} ${date.year}`;
  };

  get csNames() {
    return CONTENT_STRINGS;
  }

  setContentStrings() {
    const transactionStringNames: string[] = [
      CONTENT_STRINGS.allAccountsLabel,
      CONTENT_STRINGS.pastSixMonthsLabel,
      CONTENT_STRINGS.filterLabel,
    ];

    this.contentString = this.transactionsService.getContentStrings(transactionStringNames);
  }

}

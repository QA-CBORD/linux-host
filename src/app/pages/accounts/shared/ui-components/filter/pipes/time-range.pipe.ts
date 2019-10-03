import { Pipe, PipeTransform } from '@angular/core';
import { DateUtilObject } from '../date-util';
import { CONTENT_STRINGS, TIME_PERIOD } from 'src/app/pages/accounts/accounts.config';

@Pipe({
  name: 'timeRange',
})
export class TimeRangePipe implements PipeTransform {
  constructor() {}

  transform(value: DateUtilObject, contentString: any): string {
    return this.localGetUniquePeriodName(value, contentString);
  }

  private localGetUniquePeriodName(date: DateUtilObject, contentString: any): string {
    return date.name === TIME_PERIOD.pastSixMonth || date.name === TIME_PERIOD.pastMonth
      ? contentString[CONTENT_STRINGS.pastSixMonthsLabel]
      : `${date.name} ${date.year}`;
  }
}

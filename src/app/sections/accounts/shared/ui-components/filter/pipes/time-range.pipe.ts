import { Pipe, PipeTransform } from '@angular/core';
import { DateUtilObject } from '../date-util';
import { CONTENT_STRINGS, TIME_PERIOD } from '@sections/accounts/accounts.config';

@Pipe({
  name: 'timeRange',
  standalone: true,
})
export class TimeRangePipe implements PipeTransform {

  transform(value: DateUtilObject, contentString: { [key: string]: string }): string {
    return this.localGetUniquePeriodName(value, contentString);
  }

  private localGetUniquePeriodName(date: DateUtilObject, contentString: { [key: string]: string }): string {
    return date.name === TIME_PERIOD.pastSixMonth || date.name === TIME_PERIOD.pastMonth
      ? contentString[CONTENT_STRINGS.pastSixMonthsLabel]
      : `${date.name} ${date.year}`;
  }
}

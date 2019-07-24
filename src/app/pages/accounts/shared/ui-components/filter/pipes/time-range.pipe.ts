import { Pipe, PipeTransform } from '@angular/core';
import { DateUtilObject, getUniquePeriod } from '../date-util';
import { TIME_PERIOD } from '../../../../accounts.config';

@Pipe({
  name: 'timeRange',
})
export class TimeRangePipe implements PipeTransform {
  transform(value: DateUtilObject): string {
    switch (value.name) {
      case TIME_PERIOD.pastMonth:
        return 'Past 30 days';
      case TIME_PERIOD.pastSixMonth:
        return 'Past 6 months';
      default:
        return getUniquePeriod(value);
    }
  }
}

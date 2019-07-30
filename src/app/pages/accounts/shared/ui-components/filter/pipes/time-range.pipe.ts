import { Pipe, PipeTransform } from '@angular/core';
import { DateUtilObject, getUniquePeriodName } from '../date-util';
import { TIME_PERIOD } from '../../../../accounts.config';

@Pipe({
  name: 'timeRange',
})
export class TimeRangePipe implements PipeTransform {
  transform(value: DateUtilObject): string {
    if (value.name === TIME_PERIOD.pastSixMonth || value.name === TIME_PERIOD.pastMonth) {
      return 'Past 6 months';
    } else {
      return getUniquePeriodName(value);
    }
  }
}

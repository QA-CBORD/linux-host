import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeBlock',
})
export class TimeBlockPipe implements PipeTransform {
  transform(value: Date): string {
    if (value) {
      let expiryDate = +new Date(value)
      let now = +new Date()
      let seconds = (expiryDate - now) / 1000;
      const intervals = {
        month: 2592000,
        week: 604800,
        yesterday: 172800,
        today: 86400,
      };
      const allInterval = { month: 'Past month', week: 'Past week', yesterday: 'Yesterday', today: 'Today' };
      
      let toReturn = 'no';
      console.log("seconds: ", seconds)
      if (seconds < intervals.today) {
        toReturn = allInterval.today;
      } else if (seconds < intervals.yesterday) {
        toReturn = allInterval.yesterday;
      }

      return toReturn;
    }
    return null;
  }
}

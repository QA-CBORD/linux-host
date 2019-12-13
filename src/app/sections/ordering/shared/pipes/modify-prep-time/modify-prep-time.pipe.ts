import { Pipe, PipeTransform } from '@angular/core';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'modifyPrepTime',
})
export class ModifyPrepTimePipe implements PipeTransform {
  constructor(private readonly datePipe: DatePipe) { }
  transform(value: any, args?: any): any {
    const minute = 60000;
    const time = new Date(value.dueTime);
    const timeInMiliseconds = time.getTime();
    let finalTime = timeInMiliseconds;

    if (args) {
      if (value.isASAP) {
        switch (value.orderType) {
          case ORDER_TYPE.PICKUP:
            finalTime = timeInMiliseconds + args.pickupPrepTime * minute;
            break;
          case ORDER_TYPE.DELIVERY:
            finalTime = timeInMiliseconds + args.deliveryPrepTime * minute;
            break;
        }
      }
      return this.datePipe.transform(new Date(finalTime), 'EE, MMM d, h:mm a');
    }
    return '';
  }
}

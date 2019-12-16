import { Pipe, PipeTransform } from '@angular/core';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { DatePipe } from '@angular/common';
import { MerchantOrderTypesInfo } from '@sections/ordering';

@Pipe({
  name: 'modifyPrepTime',
})
export class ModifyPrepTimePipe implements PipeTransform {
  constructor(private readonly datePipe: DatePipe) {}
  transform(value: any, orderTypes?: MerchantOrderTypesInfo): string {
    const { dueTime, orderType, isASAP } = value;

    const minute = 60000;
    const time = new Date(dueTime);
    const timeInMiliseconds = time.getTime();
    let finalTime = timeInMiliseconds;

    if (orderTypes) {
      const { pickupPrepTime, deliveryPrepTime } = orderTypes;
      if (isASAP) {
        switch (orderType) {
          case ORDER_TYPE.PICKUP:
            finalTime = timeInMiliseconds + pickupPrepTime * minute;
            break;
          case ORDER_TYPE.DELIVERY:
            finalTime = timeInMiliseconds + deliveryPrepTime * minute;
            break;
        }
      }
      return this.datePipe.transform(new Date(finalTime), 'EE, MMM d, h:mm a');
    }
    return '';
  }
}

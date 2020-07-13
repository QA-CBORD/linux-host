import { Pipe, PipeTransform } from '@angular/core';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { DatePipe } from '@angular/common';
import { MerchantOrderTypesInfo } from '@sections/ordering';

@Pipe({
  name: 'modifyPrepTime',
})
export class ModifyPrepTimePipe implements PipeTransform {

  constructor(private readonly datePipe: DatePipe) {
  }

  transform(
    { dueTime, orderType, isASAP }: any = {},
    { pickupPrepTime, deliveryPrepTime }: MerchantOrderTypesInfo,
    isShowTime: boolean = true): string {

    if (isASAP && !isShowTime) return 'ASAP';
    const minute = 60000;
    const time = new Date(dueTime);
    const timeInMilliseconds = time.getTime();
    let finalTime = timeInMilliseconds;

    if (isASAP) {
      switch (orderType) {
        case ORDER_TYPE.PICKUP:
          finalTime = timeInMilliseconds + pickupPrepTime * minute;
          break;
        case ORDER_TYPE.DELIVERY:
          finalTime = timeInMilliseconds + deliveryPrepTime * minute;
          break;
      }
    }

    return this.datePipe.transform(new Date(finalTime), 'EE, MMM d, h:mm a');
  }
}

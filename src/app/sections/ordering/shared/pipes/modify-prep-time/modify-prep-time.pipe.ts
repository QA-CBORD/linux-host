import { Pipe, PipeTransform } from '@angular/core';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { DatePipe } from '@angular/common';
import { MerchantOrderTypesInfo } from '@sections/ordering'; 
import { CartService } from '@sections/ordering/services';

@Pipe({
  name: 'modifyPrepTime',
})
export class ModifyPrepTimePipe implements PipeTransform {

  constructor(private cartService: CartService) {
  }

  transform(
    { dueTime, orderType, isASAP }: any = {},
    { pickupPrepTime, deliveryPrepTime, merchantTimeZone }: MerchantOrderTypesInfo,
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

    return this.cartService.extractTimeZonedString(new Date(finalTime), merchantTimeZone);
  }
}

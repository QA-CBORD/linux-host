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
    { dueTime, isASAP }: any = {},
    orderTypes: MerchantOrderTypesInfo,
    isShowTime: boolean = true,
    showFullDate: boolean = true
    ): string {

    if (isASAP && !isShowTime) return 'ASAP';
    
    return this.cartService.extractTimeZonedString(dueTime, orderTypes.merchantTimeZone, showFullDate);
  }
}

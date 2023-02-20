import { Pipe, PipeTransform } from '@angular/core';
import { MerchantOrderTypesInfo } from '@sections/ordering'; 
import { CartService } from '@sections/ordering/services';

@Pipe({
  name: 'modifyPrepTime',
})
export class ModifyPrepTimePipe implements PipeTransform {

  constructor(private cartService: CartService) {
  }

  transform(
    { dueTime, isASAP }: { dueTime: string | Date; isASAP?: boolean } = { dueTime: null },
    orderTypes: MerchantOrderTypesInfo,
    isShowTime = true,
    showFullDate = true
    ): string {

    if (isASAP && !isShowTime) return 'ASAP';

    return this.cartService.extractTimeZonedString(dueTime.toString(), orderTypes.merchantTimeZone, showFullDate);
  }
}

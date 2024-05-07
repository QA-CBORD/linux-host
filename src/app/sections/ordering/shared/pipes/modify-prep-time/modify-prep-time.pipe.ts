import { Pipe, PipeTransform } from '@angular/core';
import { MerchantOrderTypesInfo } from '@sections/ordering';
import { CartService } from '@sections/ordering/services';

@Pipe({
  name: 'modifyPrepTime',
})
export class ModifyPrepTimePipe implements PipeTransform {
  constructor(private cartService: CartService) {}

  transform(
    timeData: { dueTime: string | Date; isASAP?: boolean },
    orderTypes: MerchantOrderTypesInfo,
    isShowTime = true,
    showFullDate = true
  ): string {
    if (!timeData) return '';
    const { dueTime, isASAP } = timeData;
    if (isASAP && !isShowTime) return 'ASAP';
    if (!dueTime) return '';
    return this.cartService.extractTimeZonedString(dueTime.toString(), orderTypes.merchantTimeZone, showFullDate);
  }
}

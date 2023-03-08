import { Pipe, PipeTransform } from '@angular/core';
import { MerchantInfo } from '@sections/ordering';

@Pipe({
  name: 'orderType'
})
export class OrderTypePipe implements PipeTransform {

  transform({ orderTypes }: MerchantInfo): string {
    const pickup = 'Pickup';
    const delivery = 'Delivery';

    if (!orderTypes || (!orderTypes.delivery && !orderTypes.pickup)) {
      return '';
    }

    if (orderTypes.delivery && orderTypes.pickup) {
      return `${pickup} & ${delivery}`;
    }

    return orderTypes.delivery ? delivery : pickup;
  }

}

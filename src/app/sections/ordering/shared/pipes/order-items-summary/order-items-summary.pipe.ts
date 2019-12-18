import { Pipe, PipeTransform } from '@angular/core';
import { OrderItem } from '../../models';

@Pipe({
  name: 'orderItemsSummary',
})
export class OrderItemsSummaryPipe implements PipeTransform {
  transform(value: OrderItem[], args?: any): string {
    if (typeof value === 'undefined' || value.length === 0) {
      return '';
    }

    const itemsSummary: string[] = [];

    value.forEach((orderItem, index) => {
      let quantity = orderItem.quantity > 1 ? ' x' + orderItem.quantity : '';
      let end = value.length - 1 === index ? '' : ',';
      itemsSummary.push(`${orderItem.name}${quantity}${end}`);
    });

    return itemsSummary.toString();
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { OrderItem } from '../../models';

@Pipe({
  name: 'orderItemsSummary',
})
export class OrderItemsSummaryPipe implements PipeTransform {
  transform(value: OrderItem[]): string {
    if (typeof value === 'undefined' || value.length === 0) {
      return '';
    }

    const itemsSummary: string[] = [];

    value.forEach((orderItem, index) => {
      const quantity = orderItem.quantity > 1 ? ' x' + orderItem.quantity : '';
      const end = value.length - 1 === index ? '' : ',';
      itemsSummary.push(`${orderItem.name}${quantity}${end}`);
    });

    return itemsSummary.toString();
  }
}

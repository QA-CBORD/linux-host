import { Pipe, PipeTransform } from '@angular/core';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';

@Pipe({
  name: 'typeMessage',
})
export class TypeMessagePipe implements PipeTransform {
  transform(type: ORDER_TYPE, text: 'dueTime' | 'address' | 'time', isWalkoutOrder = false): string {
    if (isWalkoutOrder) {
      const labelMap = { dueTime: 'exit time', time: 'exit time', address: 'address' };
      return `Smart Shopping ${labelMap[text]}`;
    }

    const delivery = 'delivery';
    const pickUp = 'pickup';

    return `${Number(type) === ORDER_TYPE.PICKUP ? pickUp : delivery} ${text}`;
  }
}

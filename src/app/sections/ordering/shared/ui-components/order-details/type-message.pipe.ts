import { Pipe, PipeTransform } from '@angular/core';
import { ORDER_TYPE } from "@sections/ordering/ordering.config";

@Pipe({
  name: 'typeMessage'
})
export class TypeMessagePipe implements PipeTransform {

  transform(type: ORDER_TYPE, text: string): string {
    const delivery = 'delivery';
    const pickUp = 'pickup';

    return `${type === ORDER_TYPE.PICKUP ? pickUp : delivery} ${text}`;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { CREDITCARD_TYPE } from '../../../accounts.config';

@Pipe({
  name: 'creditCardType',
})
export class CreditCardTypePipe implements PipeTransform {
  transform(value: string): string {
    return CREDITCARD_TYPE[parseInt(value) - 1];
  }
}

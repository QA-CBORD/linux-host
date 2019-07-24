import { Pipe, PipeTransform } from '@angular/core';
import { ACCOUNT_TYPES } from '../../accounts.config';

@Pipe({
  name: 'transactionUnits',
})
export class TransactionUnitsPipe implements PipeTransform {
  transform(value: number, type: number): string {
    if (value === null) {
      return 'no info';
    }
    return type === ACCOUNT_TYPES.decliningBalance || ACCOUNT_TYPES.charge
      ? `$${value}`
      : type === ACCOUNT_TYPES.meals
      ? `${value} Meals`
      : value.toString();
  }
}

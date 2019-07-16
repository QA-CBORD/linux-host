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

    switch (type) {
      case ACCOUNT_TYPES.meals:
        return `${value} Meals`;
      case ACCOUNT_TYPES.charge:
        return `$${value}`;
      case ACCOUNT_TYPES.decliningBalance:
        return `${value} Points`;
      default:
        return value.toString();
    }
  }
}

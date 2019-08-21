import { Pipe, PipeTransform } from '@angular/core';
import { ACCOUNT_TYPES } from '../../accounts.config';

@Pipe({
  name: 'transactionUnits',
})
export class TransactionUnitsPipe implements PipeTransform {
  transform(value: number | string, type: number): string {
    if (value === null) {
      return 'no info';
    }

    if (typeof value === 'string') {
      value = Number(value);
    }

    return type === ACCOUNT_TYPES.decliningBalance || type === ACCOUNT_TYPES.charge
      ? `$${this.formatInputData(value)}`
      : type === ACCOUNT_TYPES.meals
      ? `${value} Meals`
      : value.toString();
  }

  private formatInputData(value): string {
    const withDecimal = value.toFixed(2);
    const firstPartIndex = withDecimal.indexOf('.');
    const first = withDecimal.slice(0, firstPartIndex);
    const finalFirst = parseFloat(first).toLocaleString('en-US');

    return finalFirst + withDecimal.slice(firstPartIndex);
  }
}

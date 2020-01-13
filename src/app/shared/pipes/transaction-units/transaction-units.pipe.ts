import { Pipe, PipeTransform } from '@angular/core';

import { AccountsService } from '@sections/accounts/services/accounts.service';
import { ACCOUNT_TYPES, CONTENT_STRINGS } from '@sections/accounts/accounts.config';

@Pipe({
  name: 'transactionUnits',
})
export class TransactionUnitsPipe implements PipeTransform {
  constructor(private readonly accountsService: AccountsService) {}

  transform(value: number | string, type: ACCOUNT_TYPES = ACCOUNT_TYPES.charge): string {
    if (value === null) {
      return 'no info';
    }

    if (typeof value === 'string') {
      value = Number(value);
    }

    return type === ACCOUNT_TYPES.decliningBalance || type === ACCOUNT_TYPES.charge
      ? `$${this.formatInputData(value)}`
      : type === ACCOUNT_TYPES.meals
      ? `${value} ` +
        (value === 1
          ? this.getContentStringValueByName(CONTENT_STRINGS.mealSuffixLabel)
          : this.getContentStringValueByName(CONTENT_STRINGS.mealSuffixPluralLabel))
      : value.toString();
  }

  private formatInputData(value): string {
    const withDecimal = value.toFixed(2);
    const firstPartIndex = withDecimal.indexOf('.');
    const first = withDecimal.slice(0, firstPartIndex);
    const finalFirst = parseFloat(first).toLocaleString('en-US');

    return finalFirst + withDecimal.slice(firstPartIndex);
  }
  private getContentStringValueByName(name: string): string {
    return this.accountsService.getContentValueByName(name);
  }
}

import { CONTENT_STRINGS } from '../../accounts.config';
import { Pipe, PipeTransform } from '@angular/core';
import { ACCOUNT_TYPES } from '../../accounts.config';
import { AccountsService } from '../../services/accounts.service';

@Pipe({
  name: 'transactionUnits',
})
export class TransactionUnitsPipe implements PipeTransform {
  constructor(private readonly accountsService: AccountsService) {}

  transform(value: number, type: number): string {
    if (value === null) {
      return 'no info';
    }
    return type === ACCOUNT_TYPES.decliningBalance || type === ACCOUNT_TYPES.charge
      ? `$${value.toFixed(2)}`
      : type === ACCOUNT_TYPES.meals
      ? `${value} ` +
        (value === 1
          ? this.getContentStringValueByName(CONTENT_STRINGS.mealSuffixLabel)
          : this.getContentStringValueByName(CONTENT_STRINGS.mealSuffixPluralLabel))
      : value.toString();
  }

  private getContentStringValueByName(name: string): string {
    return this.accountsService.getContentValueByName(name);
  }
}

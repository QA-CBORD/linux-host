import { Pipe, PipeTransform } from '@angular/core';
import { UserAccount } from '@core/model/account/account.model';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { PAYMENT_SYSTEM_TYPE } from '@sections/ordering/ordering.config';
import { CreditCardTypePipe } from '@sections/accounts/shared/pipes/credit-card-type/credit-card-type.pipe';

@Pipe({
  name: 'accountTypeResolver',
})
export class AccountTypeResolverPipe implements PipeTransform {
  constructor(
    private readonly priceUnitsResolverPipe: PriceUnitsResolverPipe,
    private readonly creditCardTypePipe: CreditCardTypePipe
  ) {}

  transform(acc: UserAccount, mealBased: boolean): string {
    if (acc.id === 'rollup') {
      return `${acc.accountDisplayName}`;
    }
    if (
      acc.paymentSystemType === PAYMENT_SYSTEM_TYPE.MONETRA ||
      acc.paymentSystemType === PAYMENT_SYSTEM_TYPE.USAEPAY
    ) {
      return `${this.creditCardTypePipe.transform(acc.accountTender)} ending in ${acc.lastFour}`;
    }
    return `${acc.accountDisplayName} (${this.priceUnitsResolverPipe.transform(acc.balance, mealBased)})`;
  }
}

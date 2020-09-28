import { Pipe, PipeTransform } from '@angular/core';
import { UserAccount } from '@core/model/account/account.model';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { AccountDisplayPipe } from '@sections/accounts/shared/pipes/account-display/account-display.pipe';

@Pipe({
  name: 'accountTypeResolver',
})
export class AccountTypeResolverPipe implements PipeTransform {
  constructor(
    private readonly priceUnitsResolverPipe: PriceUnitsResolverPipe,
    private readonly accountDisplayPipe: AccountDisplayPipe
  ) {}

  transform(acc: UserAccount, mealBased: boolean): string {
    if (!acc) return '';
    let result = this.accountDisplayPipe.transform(acc);
    if (!result) {
      result = `${acc.accountDisplayName} (${this.priceUnitsResolverPipe.transform(acc.balance, mealBased)})`;
    }
    return result;
  }
}

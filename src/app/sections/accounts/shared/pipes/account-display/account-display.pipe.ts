import { Pipe, PipeTransform } from '@angular/core';
import { CreditCardTypePipe } from '../credit-card-type';
import { UserAccount } from '@core/model/account/account.model';
import { isAppleAccount, isCreditCardAccount } from '@core/utils/general-helpers';
import { PaymentType } from 'src/app/app.global';

@Pipe({
  name: 'accountDisplay',
})
export class AccountDisplayPipe implements PipeTransform {
  constructor(private readonly creditCardTypePipe: CreditCardTypePipe) {}

  transform(acc: number | UserAccount | Partial<UserAccount> | PaymentType): string {
    if (!acc) return '';

    if (acc === PaymentType.BILLME) return 'Bill me';

    const account = acc as UserAccount;
    if (isAppleAccount(account)) {
      return `${account.accountDisplayName}`;
    }
    if (isCreditCardAccount(account)) {
      return `${this.creditCardTypePipe.transform(account.accountTender)} ending in ${account.lastFour}`;
    }
  }
}

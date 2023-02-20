import { Pipe, PipeTransform } from '@angular/core';
import { UserAccount } from '@core/model/account/account.model';
import { TransactionUnitsPipe } from '@shared/pipes/transaction-units/transaction-units.pipe';

@Pipe({
  name: 'destinationAccountDisplay',
})
export class DestinationAccountDisplayPipe implements PipeTransform {
  constructor(private readonly transactionUnitsPipe: TransactionUnitsPipe) {}
  transform(account: UserAccount, hideBalance?: boolean): string {
    if (!account) return '';
    
    if (hideBalance) {
      return `${account.accountDisplayName}`;
    }

    return `${account.accountDisplayName} (${this.transactionUnitsPipe.transform(
      account.balance,
      account.accountType
    )})`;
  }
}

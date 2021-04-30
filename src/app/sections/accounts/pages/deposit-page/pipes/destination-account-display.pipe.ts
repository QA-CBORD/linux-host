import { Pipe, PipeTransform } from '@angular/core';
import { TransactionUnitsPipe } from '@shared/pipes/transaction-units/transaction-units.pipe';

@Pipe({
  name: 'destinationAccountDisplay',
})
export class DestinationAccountDisplayPipe implements PipeTransform {
  constructor(private readonly transactionUnitsPipe: TransactionUnitsPipe) {}
  transform(account: any, hideBalance?: boolean): any {
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

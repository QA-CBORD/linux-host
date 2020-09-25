import { Pipe, PipeTransform } from '@angular/core';
import { TransactionUnitsPipe } from '@shared/pipes/transaction-units/transaction-units.pipe';

@Pipe({
  name: 'destinationAccountDisplay',
})
export class DestinationAccountDisplayPipe implements PipeTransform {
  constructor(private readonly transactionUnitsPipe: TransactionUnitsPipe) {}
  transform(account: any): any {
    if (!account) return '';

    return `${account.accountDisplayName} (${this.transactionUnitsPipe.transform(
      account.balance,
      account.accountType
    )})`;
  }
}

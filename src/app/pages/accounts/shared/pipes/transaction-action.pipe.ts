import { Pipe, PipeTransform } from '@angular/core';
import { TRANSACTION_TYPE } from '../../accounts.config';

@Pipe({
  name: 'transactionAction',
})
export class TransactionActionPipe implements PipeTransform {
  transform(type: number): string {
    return type === TRANSACTION_TYPE.debit ? '-' : type === TRANSACTION_TYPE.deposit ? '+' : null;
  }
}

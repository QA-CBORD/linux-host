import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionAction',
})
export class TransactionActionPipe implements PipeTransform {
  transform(type: number): string {
    return (type === TRANSACTION_TYPE.debit || type === TRANSACTION_TYPE.co_delete) ? '-' : type === TRANSACTION_TYPE.deposit ? '+' : null;
  }
}

export enum TRANSACTION_TYPE {
  debit = 1,
  deposit = 3,
  co_delete = 4
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TransactionHistory } from '../../../models/transaction-history.model';

@Component({
  selector: 'st-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent implements OnInit {
  @Input() transactions: TransactionHistory[];

  constructor() {}

  ngOnInit() {}

  virtualHeaderFn(transaction, i, transactions) {
    console.log(transactions);
    if (i % 2 === 0) {
      return transaction.actualDate;
    }
    return null;
  }
}

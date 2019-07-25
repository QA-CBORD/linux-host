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
  @Input() dividers: boolean;

  constructor() {}

  ngOnInit() {}

  trackTransactionsById(index: number, { transactionId }: TransactionHistory): string {
    return transactionId;
  }
}

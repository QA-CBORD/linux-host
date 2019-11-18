import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'st-transactions-tile',
  templateUrl: './transactions-tile.component.html',
  styleUrls: ['./transactions-tile.component.scss'],
})
export class TransactionsTileComponent implements OnInit {
  transactions = [];
  transactionsSubscriptions: Subscription;

  constructor(private readonly transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionsSubscriptions = this.transactionService
      .getRecentTransactions(null, null, 3)
      .pipe(take(1))
      .subscribe(r => {
        this.transactions = r;
      });
  }

  ngOnDestroy() {
    this.transactionsSubscriptions.unsubscribe();
  }
}

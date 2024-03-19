import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { take, finalize } from 'rxjs/operators';
import { TransactionHistory } from '@core/model/transactions/transaction-history.model';

@Component({
  selector: 'st-transactions-tile',
  templateUrl: './transactions-tile.component.html',
  styleUrls: ['./transactions-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsTileComponent implements OnInit {
  transactions: TransactionHistory[] = [];
  transactionsAmount = 3;
  skeletonArray: number[] = new Array(this.transactionsAmount);
  isLoading = true;

  constructor(private readonly transactionService: TransactionService,
              private readonly cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getRecentTransactions();
  }

  getRecentTransactions() {
    this.transactionService.getRecentTransactions(null, null, this.transactionsAmount)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
          this.cdRef.detectChanges();
        })
      )
      .subscribe((data) => {
        this.transactions = data;
      });
  }
}

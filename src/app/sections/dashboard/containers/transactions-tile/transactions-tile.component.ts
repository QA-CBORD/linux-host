import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { TransactionHistory } from '@sections/dashboard/models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'st-transactions-tile',
  templateUrl: './transactions-tile.component.html',
  styleUrls: ['./transactions-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsTileComponent implements OnInit {
  transactions: TransactionHistory[] = [];
  transactionsAmount: number = 3;
  skeletonArray: any[] = new Array(this.transactionsAmount);

  constructor(private readonly transactionService: TransactionService,
              private readonly cdRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.transactionService.getRecentTransactions(null, null, this.transactionsAmount)
      .pipe(
        take(1),
      )
      .subscribe((data) => {
        this.transactions = data;
        this.cdRef.detectChanges();
      });
  }
}

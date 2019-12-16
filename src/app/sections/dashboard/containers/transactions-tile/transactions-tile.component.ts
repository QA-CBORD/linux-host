import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { Observable } from 'rxjs';
import { TransactionHistory } from '@sections/dashboard/models';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'st-transactions-tile',
  templateUrl: './transactions-tile.component.html',
  styleUrls: ['./transactions-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsTileComponent implements OnInit {
  transactions$: Observable<TransactionHistory[]>;
  transactionsAmount: number = 3;
  skeletonArray: any[] = new Array(this.transactionsAmount);
  isLoadingData: boolean = true;

  constructor(private readonly transactionService: TransactionService) { }

  ngOnInit() {
    this.transactions$ = this.transactionService.getRecentTransactions(null, null, this.transactionsAmount)
      .pipe(tap(() => {
        this.isLoadingData = false
      }));
  }

}

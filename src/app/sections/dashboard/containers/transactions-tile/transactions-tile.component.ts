import { Component, OnInit } from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'st-transactions-tile',
  templateUrl: './transactions-tile.component.html',
  styleUrls: ['./transactions-tile.component.scss'],
})
export class TransactionsTileComponent implements OnInit {
  transactions$: Observable<any[]>;
  
  constructor(private readonly transactionService: TransactionService) { }

  ngOnInit() {
    this.transactions$ = this.transactionService
      .getRecentTransactions(null, null, 3)
      .pipe(take(1));
  }

}

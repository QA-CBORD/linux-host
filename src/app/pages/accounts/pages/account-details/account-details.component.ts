import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionHistory } from '../../models/transaction-history.model';
import { AccountsService } from '../../services/accounts.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'st-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  transactions$: Observable<TransactionHistory[]>;
  currentAccountId: string;

  constructor(private readonly accountsService: AccountsService,
              private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.currentAccountId = this.activatedRoute.snapshot.params.id;
    this.transactions$ = this.accountsService.transactions$;
    this.accountsService.getRecentTransactions(this.currentAccountId).pipe(take(1)).subscribe();
  }

  getMore() {
    this.accountsService.getNextTransactionsByAccountId(this.currentAccountId)
      .pipe(take(1)).subscribe(data => data);
  }
}

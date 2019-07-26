import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TransactionHistory } from '../../models/transaction-history.model';
import { AccountsService } from '../../services/accounts.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'st-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  transactions$: Observable<TransactionHistory[]>;
  private readonly sourceSubscription: Subscription = new Subscription();
  currentAccountId: string;

  constructor(private readonly accountsService: AccountsService, private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const subscription = this.activatedRoute.params
      .pipe(switchMap(params => this.accountsService.getRecentTransactions(params['id'])))
      .subscribe();

    this.sourceSubscription.add(subscription);
    this.transactions$ = this.accountsService.transactions$;
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  getMore() {
    this.accountsService
      .getNextTransactionsByAccountId(this.currentAccountId)
      .pipe(take(1))
      .subscribe(data => data);
  }
}

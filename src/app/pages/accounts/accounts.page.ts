import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccountsService } from './services/accounts.service';
import { UserAccount } from '../../core/model/account/account.model';
import { Observable } from 'rxjs';
import { TransactionHistory } from './models/transaction-history.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'st-accounts.page',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsPage implements OnInit {
  accounts$: Observable<UserAccount[]>;
  transactions$: Observable<TransactionHistory[]>;

  constructor(private readonly accountsService: AccountsService) {}

  ngOnInit() {
    this.accounts$ = this.accountsService.accounts$;
    this.transactions$ = this.accountsService.transactions$.pipe(map(arr => arr.slice(0, 4)));
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AccountsService } from './services/accounts.service';
import { UserAccount } from '../../core/model/account/account.model';
import { TransactionHistory } from './models/transaction-history.model';
import { SYSTEM_SETTINGS_CONFIG } from './accounts.config';

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
    this.accounts$ = this.getAccounts();
    this.transactions$ = this.accountsService.transactions$.pipe(map(arr => arr.slice(0, 4)));
  }

  private getAccounts(): Observable<UserAccount[]> {
    return this.accountsService.settings$.pipe(
      map(settings => {
        const depositSetting = this.accountsService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.displayTenders.name
        );
        return this.accountsService.transformStringToArray(depositSetting.value);
      }),
      switchMap((tendersId: Array<string>) =>
        this.accountsService.accounts$.pipe(map(accounts => this.filterAccountsByTenders(tendersId, accounts)))
      )
    );
  }

  private filterAccountsByTenders(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(({ accountTender: tId }) => tendersId.includes(tId));
  }
}

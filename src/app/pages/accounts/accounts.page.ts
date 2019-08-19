import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AccountsService } from './services/accounts.service';
import { UserAccount } from '../../core/model/account/account.model';
import { TransactionHistory } from './models/transaction-history.model';
import { ALL_ACCOUNTS, LOCAL_ROUTING, SYSTEM_SETTINGS_CONFIG, CONTENT_STRINGS } from './accounts.config';
import { NAVIGATE } from '../../app.global';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'st-accounts.page',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsPage implements OnInit {
  accounts$: Observable<UserAccount[]>;
  transactions$: Observable<TransactionHistory[]>;
  accountInfo: { name: string; balance: number; accountType: number };
  contentString: { [key: string]: string };
  

  constructor(
    private readonly accountsService: AccountsService,
    private readonly platform: Platform,
    private readonly router: Router,
    private readonly transactionsService: TransactionService
  ) {
  }

  ngOnInit() {
    this.setContentStrings();
    this.accounts$ = this.getAccounts();
    this.transactions$ = this.transactionsService.transactions$.pipe(map(arr => arr.slice(0, 4)));

    this.defineInitRoute();
  }

  defineInitRoute() {
    if (!this.defineResolution()) {
      return;
    }

    this.goToAllAccounts();
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

  goToAllAccounts() {
    const nextPage = this.defineResolution() ? LOCAL_ROUTING.accountDetails : LOCAL_ROUTING.accountDetailsM;

    this.router.navigate([`${NAVIGATE.accounts}/${nextPage}/${ALL_ACCOUNTS}`], { skipLocationChange: true });
  }

  onAccountInfo(event) {
    this.accountInfo = event;
  }

  private filterAccountsByTenders(tendersId: Array<string>, accounts: Array<UserAccount>): Array<UserAccount> {
    return accounts.filter(({ accountTender: tId }) => tendersId.includes(tId));
  }

  private defineResolution() {
    const tabletResolution: number = 767;

    return this.platform.width() > tabletResolution;
  }

  get csNames(){
    return CONTENT_STRINGS;
  }

  setContentStrings() {
    const accountStringNames: string[] = [
      CONTENT_STRINGS.headerTitle,
      CONTENT_STRINGS.headerBackBtn,
      CONTENT_STRINGS.addFundsBtn,
      CONTENT_STRINGS.accountsLabel,
    ];

    const transactionStringNames: string[] = [
      CONTENT_STRINGS.recentTransactionsLabel,
      CONTENT_STRINGS.allAccountsLabel
    ];
    
    this.contentString = {...this.accountsService.getContentStrings(accountStringNames), ...this.transactionsService.getContentStrings(transactionStringNames)};
       
  }
}

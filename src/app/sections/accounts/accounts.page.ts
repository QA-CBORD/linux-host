import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountsService } from './services/accounts.service';
import { UserAccount } from '@core/model/account/account.model';
import { TransactionHistory } from './models/transaction-history.model';
import { ALL_ACCOUNTS, LOCAL_ROUTING, CONTENT_STRINGS } from './accounts.config';
import { PATRON_NAVIGATION } from '../../app.global';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { TransactionService } from './services/transaction.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

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
    private readonly transactionsService: TransactionService,
    private readonly globalNav: GlobalNavService
  ) {}

  ngOnInit() {
    this.setContentStrings();
    this.accounts$ = this.accountsService.getAccountsFilteredByDisplayTenders();
    this.transactions$ = this.transactionsService.transactions$.pipe(map(arr => arr.slice(0, 4)));

    this.defineInitRoute();
  }

  ionViewWillEnter() {
    this.globalNav.showNavBar();
  }

  defineInitRoute() {
    if (!this.defineResolution()) {
      return;
    }

    this.goToAllAccounts();
  }

  goToAllAccounts() {
    const nextPage = this.defineResolution() ? LOCAL_ROUTING.accountDetails : LOCAL_ROUTING.accountDetailsM;

    this.router.navigate([`${PATRON_NAVIGATION.accounts}/${nextPage}/${ALL_ACCOUNTS}`]);
  }

  onAccountInfo(event) {
    this.accountInfo = event;
  }

  private defineResolution() {
    const tabletResolution: number = 767;

    return this.platform.width() > tabletResolution;
  }

  get csNames() {
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
      CONTENT_STRINGS.allAccountsLabel,
    ];

    this.contentString = {
      ...this.accountsService.getContentStrings(accountStringNames),
      ...this.transactionsService.getContentStrings(transactionStringNames),
    };
  }
}

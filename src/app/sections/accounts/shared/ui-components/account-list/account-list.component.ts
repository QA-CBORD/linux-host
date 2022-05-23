import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { TransactionHistory } from '@sections/accounts/models/transaction-history.model';
import { UserAccount } from '@core/model/account/account.model';
import { ALL_ACCOUNTS, LOCAL_ROUTING, CONTENT_STRINGS } from '@sections/accounts/accounts.config';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { TransactionService } from '@sections/accounts/services/transaction.service';
import { PATRON_NAVIGATION } from 'src/app/app.global';

@Component({
  selector: 'st-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListComponent implements OnInit {
  transactions: Observable<TransactionHistory[]>;
  accountsShowed: UserAccount[] = [];
  accountsHidden: UserAccount[] = [];
  tabletResolution = false;
  allAccounts: string = ALL_ACCOUNTS;
  activeAccount: number | string = ALL_ACCOUNTS;
  private readonly amountToShow: number = 7;
  contentString: { [key: string]: string };

  @Output() onAccountInfoEmit = new EventEmitter<{ name: string; balance: number; accountType: number }>();

  constructor(
    private readonly platform: Platform,
    private readonly router: Router,
    private readonly accountsService: AccountService,
    private readonly transactionsService: TransactionService
  ) {}

  @Input()
  set accounts(value: UserAccount[]) {
    if (value.length <= this.amountToShow || this.tabletResolution) {
      this.accountsShowed = value;
      return;
    }
    this.accountsShowed = value.slice(0, this.amountToShow);
    this.accountsHidden = value.slice(this.amountToShow);
  }

  ngOnInit() {
    this.setContentStrings();
    this.defineResolution();
  }

  showHiddenAccounts() {
    this.accountsShowed = this.accountsShowed.concat(this.accountsHidden);
    this.accountsHidden = [];
  }

  onAccountClicked(accountId: string, name?: string, balance?: number, accountType?: number) {
    const nextPage = this.tabletResolution ? LOCAL_ROUTING.accountDetails : LOCAL_ROUTING.accountDetailsM;
    if (this.tabletResolution) {
      this.activeAccount = accountId;
    }

    if (name) {
      this.onAccountInfoEmit.emit({ name, balance, accountType });
    }
    this.router.navigate([`${PATRON_NAVIGATION.accounts}/${nextPage}/${accountId}`]);
  }

  trackByAccountId(i: number, { id }: UserAccount): string {
    return id;
  }

  private defineResolution() {
    const tabletResolution = 767;

    this.tabletResolution = this.platform.width() > tabletResolution;
  }

  get csNames() {
    return CONTENT_STRINGS;
  }

  private setContentStrings() {
    const accountStringNames: string[] = [
      CONTENT_STRINGS.allAccountsLabel,
      CONTENT_STRINGS.headerBackBtn,
      CONTENT_STRINGS.accountsLabel,
      CONTENT_STRINGS.moreLabel,
    ];

    const transactionStringNames: string[] = [CONTENT_STRINGS.allAccountsLabel];
    this.contentString = {
      ...this.accountsService.getContentStrings(accountStringNames),
      ...this.transactionsService.getContentStrings(transactionStringNames),
    };
  }
}

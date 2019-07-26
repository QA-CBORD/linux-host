import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { UserAccount } from '../../../../../core/model/account/account.model';
import { TransactionHistory } from '../../../models/transaction-history.model';
import { Platform } from '@ionic/angular';
import { ALL_ACCOUNTS, LOCAL_ROUTING } from '../../../accounts.config';
import { NAVIGATE } from '../../../../../app.global';
import { Router } from '@angular/router';

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
  private readonly amountToShow: number = 7;
  tabletResolution: boolean = false;
  allAccounts: string = ALL_ACCOUNTS;
  activeAccount: number | string = ALL_ACCOUNTS;

  @Output() onAccountInfoEmit = new EventEmitter<{ name: string; balance: number }>();

  constructor(private readonly platform: Platform, private readonly router: Router) {}

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
    this.defineResolution();
  }

  showHiddenAccounts() {
    this.accountsShowed = this.accountsShowed.concat(this.accountsHidden);
    this.accountsHidden = [];
  }

  onAccountClicked(accountId: string, name?: string, balance?: number) {
    const nextPage = this.tabletResolution ? LOCAL_ROUTING.accountDetails : LOCAL_ROUTING.accountDetailsM;
    if (this.tabletResolution) {
      this.activeAccount = accountId;
    }

    if (name) {
      this.onAccountInfoEmit.emit({ name, balance });
    }
    this.router.navigate([`${NAVIGATE.accounts}/${nextPage}/${accountId}`], { skipLocationChange: true });
  }

  private defineResolution() {
    const tabletResolution: number = 767;

    this.tabletResolution = this.platform.width() > tabletResolution;
  }
}

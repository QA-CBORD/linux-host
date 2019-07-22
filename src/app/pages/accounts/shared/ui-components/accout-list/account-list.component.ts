import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserAccount } from '../../../../../core/model/account/account.model';
import { TransactionHistory } from '../../../models/transaction-history.model';
import { Platform } from '@ionic/angular';

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

  constructor(private readonly platform: Platform) {}

  @Input()
  set accounts(value: UserAccount[]) {
    if (value.length <= this.amountToShow) {
      this.accountsShowed = value;
    } else {
      this.accountsShowed = value.slice(0, this.amountToShow);
      this.accountsHidden = value.slice(this.amountToShow);
    }
  }

  ngOnInit() {
    this.defineResolution();
  }

  showHiddenAccounts() {
    this.accountsShowed = this.accountsShowed.concat(this.accountsHidden);
    this.accountsHidden = [];
  }

  private defineResolution() {
    const tabletResolution: number = 767;

    this.tabletResolution = this.platform.width() > tabletResolution;
  }
}

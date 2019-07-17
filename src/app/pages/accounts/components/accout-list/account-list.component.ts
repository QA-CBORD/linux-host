import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { UserAccount } from '../../../../core/model/account/account.model';
import { TransactionHistory } from '../../models/transaction-history.model';

@Component({
  selector: 'st-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListComponent {
  transactions: Observable<TransactionHistory[]>;
  private accountsShowed: UserAccount[] = [];
  private accountsHidden: UserAccount[] = [];
  private readonly amountToShow: number = 7;

  constructor() {}

  @Input()
  set accounts(value: UserAccount[]) {
    if (value.length <= this.amountToShow) {
      this.accountsShowed = value;
    } else {
      this.accountsShowed = value.slice(0, this.amountToShow);
      this.accountsHidden = value.slice(this.amountToShow);
    }
  }

  showHiddenAccounts() {
    this.accountsShowed = this.accountsShowed.concat(this.accountsHidden);
    this.accountsHidden = [];
  }
}

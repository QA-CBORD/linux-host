import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserAccount } from '../../../../core/model/account/account.model';
import { AccountsService } from '../../services/accounts.service';
import { Observable } from 'rxjs';
import { TransactionHistory } from '../../models/transaction-history.model';

@Component({
  selector: 'st-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListComponent implements OnInit {
  @Input() accounts: UserAccount[];
  transactions: Observable<TransactionHistory[]>;

  constructor(private readonly accountsService: AccountsService) {}

  ngOnInit() {
    this.transactions = this.accountsService.transactions$;
  }
}

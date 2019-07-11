import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserAccount } from '../../../../core/model/account/account.model';
import { AccountsApiService } from '../../services/accounts.api.service';
import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';

@Component({
  selector: 'st-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListComponent implements OnInit {
  @Input() accounts: UserAccount[];

  constructor(
    private readonly accountsService: AccountsApiService,
    private readonly commerceApiService: CommerceApiService
  ) {}

  ngOnInit() {}

  getFullHistory() {
    this.commerceApiService.getTransactionsHistory().subscribe(data => console.log(data));
  }
}

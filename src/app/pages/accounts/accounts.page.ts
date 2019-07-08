import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccountsService } from './services/accounts.service';
import { UserAccount } from '../../core/model/account/account.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'st-accounts.page',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsPage implements OnInit {
  accounts$: Observable<UserAccount[]>;

  constructor(private readonly accountsService: AccountsService) {}

  ngOnInit() {
    this.accounts$ = this.accountsService.accounts$;
  }
}

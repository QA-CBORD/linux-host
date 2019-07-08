import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserAccount } from '../../../../core/model/account/account.model';

@Component({
  selector: 'st-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListComponent implements OnInit {
  @Input() accounts: UserAccount[];

  constructor() {}

  ngOnInit() {}
}

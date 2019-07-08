import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserAccount } from '../../../../../core/model/account/account.model';

@Component({
  selector: 'st-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
  @Input() account: UserAccount;

  constructor() {}

  ngOnInit() {}
}

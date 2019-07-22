import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserAccount } from '../../../../../../core/model/account/account.model';
import { Router } from '@angular/router';
import { NAVIGATE } from '../../../../../../app.global';
import { LOCAL_ROUTING } from '../../../../accounts.config';

@Component({
  selector: 'st-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit, OnDestroy {
  @Input() tabletResolution: boolean;
  @Input() account: UserAccount;
  @Input() lastItem: boolean;

  constructor(private readonly router: Router) {}

  ngOnInit() {
  }

  ngOnDestroy() {}

  goToDetailsPage() {
    const nextPage = this.tabletResolution ? LOCAL_ROUTING.accountDetails : LOCAL_ROUTING.accountDetailsM;
    // { skipLocationChange: true }
    this.router.navigate([`${NAVIGATE.accounts}/${nextPage}/${this.account.id}`]);
  }
}

import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
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
  tabletResolution: boolean = false;

  @Input() account: UserAccount;
  @Input() lastItem: boolean;

  constructor(
    private readonly router: Router,
    private readonly platform: Platform,
  ) {
  }

  ngOnInit() {
    console.log(this.account);
    this.defineResolution();
  }

  ngOnDestroy() {
  }

  goToDetailsPage() {
    const nextPage = this.tabletResolution ? LOCAL_ROUTING.accountDetails : LOCAL_ROUTING.accountDetailsM;
    // { skipLocationChange: true }
    this.router.navigate([`${NAVIGATE.accounts}/${nextPage}/${this.account.id}`]);
  }

  private defineResolution() {
    const tabletResolution: number = 767;

    this.tabletResolution = this.platform.width() > tabletResolution;
  }
}

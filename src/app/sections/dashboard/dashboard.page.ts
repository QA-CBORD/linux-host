import { Component, OnInit } from '@angular/core';

import { TileWrapperConfig } from './models/tile-wrapper-config.model';
import { NAVIGATE } from 'src/app/app.global';
import { AccountsService } from './services/accounts.service';
import { TransactionService } from './services/transaction.service';
import { SecureMessagingService, AccessCardService, MobileAccessService, RewardsService } from './services';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  accountsTileConfig: TileWrapperConfig = {
    title: 'Accounts',
    iconName: 'star',
    navigate: NAVIGATE.accounts,
    buttonConfig: {
      show: true,
      title: 'Add Funds',
      navigate: NAVIGATE.accounts,
    },
  };

  accountsTileConfig1: TileWrapperConfig = {
    title: 'Transactions',
    iconName: 'happy',
    navigate: NAVIGATE.accounts,
    buttonConfig: {
      show: true,
      title: 'All Transactions',
      navigate: NAVIGATE.accounts,
    },
  };

  constructor(
    private readonly accessCardService: AccessCardService,
    private readonly accountService: AccountsService,
    private readonly transactionService: TransactionService,
    private readonly secureMessagingService: SecureMessagingService,
    private readonly mobileAccessService: MobileAccessService,
    private readonly rewardsService: RewardsService
  ) {}

  ngOnInit() {
    this.testServices();
  }

  private testServices() {
    this.accessCardService.getInstitutionName().subscribe(r => console.log('getInstitutionName:', r));
    this.accessCardService.getInstitutionImage().subscribe(r => console.log('getInstitutionImage:', r));
    this.accessCardService.getUserName().subscribe(r => console.log('getUserName:', r));
    this.accessCardService.getUserPhoto().subscribe(r => console.log('getUserPhoto:', r));
    this.accessCardService.isGETMyCardEnabled().subscribe(r => console.log('isGETMyCardEnabled:', r));
    this.accessCardService.isMobileAccessEnabled().subscribe(r => console.log('isMobileAccessEnabled:', r));
    this.accountService.getUserAccounts().subscribe(response => console.log('getUserAccounts: ', response));
    this.transactionService
      .getRecentTransactions(null, null, 10)
      .subscribe(response => console.log('getRecentTransactions:', response));
    this.secureMessagingService.getInitialData().subscribe(([r0, r1]) => {
      console.log('SecureMessaging Groups and Messages:', r0, r1);
    });
    this.mobileAccessService.getLocations().subscribe(r => console.log('getMobileAccessLocations: ', r));
    this.rewardsService
      .getUserRewardTrackInfo()
      .pipe(
        tap(r => console.log('getUserRewardTrackInfo', r)),
        switchMap(ti => this.rewardsService.getUserOptInStatus())
      )
      .subscribe(r => console.log('getUserOptInStatus', r));
  }
}

import { Component, OnInit } from '@angular/core';

import { TileWrapperConfig } from './models/tile-wrapper-config.model';
import { NAVIGATE } from 'src/app/app.global';
import { TransactionService } from './services/transaction.service';
import { SecureMessagingService, MobileAccessService, RewardsService } from './services';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  //Need to change Navigate for Conversation, Explore, Order, Transaction tiles

  tilesConfig: TileWrapperConfig[] = [
    {
      id: 'accounts',
      title: 'Accounts',
      iconPath: '/assets/icon/accounts.svg',
      navigate: NAVIGATE.accounts,
      buttonConfig: {
        show: true,
        title: 'Add Funds',
        navigate: NAVIGATE.accounts,
      },
    },
    {
      id: 'transactions',
      title: 'Transactions',
      iconPath: '/assets/icon/transactions.svg',
      navigate: NAVIGATE.accounts,
      buttonConfig: {
        show: true,
        title: 'All Transactions',
        navigate: NAVIGATE.accounts,
      },
    },
    {
      id: 'rewards',
      title: 'Rewards',
      iconPath: '/assets/icon/trophy.svg',
      navigate: NAVIGATE.rewards,
      buttonConfig: {
        show: false,
        title: '',
        navigate: NAVIGATE.rewards,
      },
    },
    {
      id: 'mobileAccess',
      title: 'Mobile Access',
      iconPath: '/assets/icon/mobile-access-tile.svg',
      navigate: NAVIGATE.mobileAccess,
      buttonConfig: {
        show: true,
        title: 'All Locations',
        navigate: NAVIGATE.mobileAccess,
      },
    },
    {
      id: 'order',
      title: 'Order',
      iconPath: '/assets/icon/order.svg',
      navigate: NAVIGATE.accounts,
      buttonConfig: {
        show: true,
        title: 'Start an order',
        navigate: NAVIGATE.accounts,
      },
    },
    {
      id: 'explore',
      title: 'Explore',
      iconPath: '/assets/icon/map.svg',
      navigate: NAVIGATE.accounts,
      buttonConfig: {
        show: true,
        title: 'Explore All',
        navigate: NAVIGATE.accounts,
      },
    },
    {
      id: 'conversations',
      title: 'Conversations',
      iconPath: '/assets/icon/chat.svg',
      navigate: NAVIGATE.accounts,
      buttonConfig: {
        show: true,
        title: 'Start a conversation',
        navigate: NAVIGATE.accounts,
      },
    },
  ];

  constructor(
    private readonly transactionService: TransactionService,
    private readonly secureMessagingService: SecureMessagingService,
    private readonly mobileAccessService: MobileAccessService,
    private readonly rewardsService: RewardsService
  ) {}

  ngOnInit() {
    this.testServices();
  }

  private testServices() {
    
    // this.accessCardService.getInstitutionName().subscribe(r => console.log('getInstitutionName:', r));
    // this.accessCardService.getInstitutionImage().subscribe(r => console.log('getInstitutionImage:', r));
    // this.accessCardService.getUserName().subscribe(r => console.log('getUserName:', r));
    // this.accessCardService.getUserPhoto().subscribe(r => console.log('getUserPhoto:', r));
    // this.accessCardService.isGETMyCardEnabled().subscribe(r => console.log('isGETMyCardEnabled:', r));
    // this.accessCardService.isMobileAccessEnabled().subscribe(r => console.log('isMobileAccessEnabled:', r));
    // this.accountService.getUserAccounts().subscribe(response => console.log('getUserAccounts: ', response));
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

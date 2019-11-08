import { Component, OnInit } from '@angular/core';

import { TileWrapperConfig } from './models/tile-wrapper-config.model';
import { NAVIGATE } from 'src/app/app.global';
import { AccountsService } from './services/accounts.service';
import { TransactionService } from './services/transaction.service';
import { SecureMessagingService } from './services';

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
    private readonly accountService: AccountsService,
    private readonly transactionService: TransactionService,
    private readonly secureMessagingService: SecureMessagingService
  ) {}

  ngOnInit() {
    this.testServices();
  }

  private testServices() {
    this.accountService.getUserAccounts().subscribe(response => console.log(response));
    this.transactionService.getRecentTransactions(null, null, 10).subscribe(response => console.log(response));
    this.secureMessagingService.getInitialData().subscribe(
      ([r0, r1]) => {
        console.log(r0);
        console.log(r1);
      },
      error => console.log(error)
    );
  }
}

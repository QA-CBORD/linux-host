import { Component, OnInit } from '@angular/core';

import { TileWrapperConfig } from './models/tile-wrapper-config.model';
import { NAVIGATE } from 'src/app/app.global';

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
        navigate: NAVIGATE.accounts
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
        navigate: NAVIGATE.accounts
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
        navigate: NAVIGATE.accounts
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
        navigate: NAVIGATE.mobileAccess
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
        navigate: NAVIGATE.accounts
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
        navigate: NAVIGATE.rewards
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
        navigate: NAVIGATE.accounts
      },
    },
  ];

  
  constructor() {}

  ngOnInit() {}
}

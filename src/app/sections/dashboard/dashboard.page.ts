import { Component, OnInit } from '@angular/core';

import { TileWrapperConfig } from './models/tile-wrapper-config.model';
import { NAVIGATE } from 'src/app/app.global';

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
      navigate: NAVIGATE.accounts
    },
  };

  accountsTileConfig1: TileWrapperConfig = {
    title: 'Transactions',
    iconName: 'happy',
    navigate: NAVIGATE.accounts,
    buttonConfig: {
      show: true,
      title: 'All Transactions',
      navigate: NAVIGATE.accounts
    },
  };

  constructor() {}

  ngOnInit() {}
}

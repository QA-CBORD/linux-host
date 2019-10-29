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
    title: 'Top Title',
    iconName: 'star',
    navigate: NAVIGATE.accounts,
    buttonConfig: {
      show: true,
      title: 'Button Title',
      navigate: NAVIGATE.accounts
    },
  };

  constructor() {}

  ngOnInit() {}
}

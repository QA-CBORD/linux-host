import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { EditHomePageModalComponent } from './components/edit-home-page-modal';
import { TileWrapperConfig } from './models/tile-wrapper-config.model';
import { NAVIGATE } from 'src/app/app.global';
import { RewardsService } from './containers/rewards-tile/services/rewards.service';
import { DashboardService } from './services';
import { take } from 'rxjs/operators';

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  //Need to change Navigate for Conversation, Explore, Order, Transaction tiles
  getRewardEnable$;

  tilesConfig: TileWrapperConfig[] = [
    {
      id: 'accounts',
      title: 'Accounts',
      iconPath: '/assets/icon/accounts.svg',
      isEnable: true,
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
      isEnable: this.getRewardEnable$,
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
      isEnable: true,
      navigate: NAVIGATE.rewards,
      buttonConfig: {
        show: false,
      },
    },
    {
      id: 'mobileAccess',
      title: 'Mobile Access',
      iconPath: '/assets/icon/mobile-access-tile.svg',
      isEnable: this.getRewardEnable$,
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
      isEnable: this.getRewardEnable$,
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
      isEnable: this.getRewardEnable$,
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
      isEnable: this.getRewardEnable$,
      navigate: NAVIGATE.accounts,
      buttonConfig: {
        show: true,
        title: 'Start a conversation',
        navigate: NAVIGATE.accounts,
      },
    },
  ];

  

  constructor(private readonly modalController: ModalController, private readonly dashboardService: DashboardService) {}

  ngOnInit() {
    let settings = [];

    this.dashboardService.retrieveSettingsList().subscribe(
      v => {
        // this.tilesConfig[0].isEnable = Boolean(Number(v.map['get~feature~enable_rewards'].value));

      const value = Boolean(Number(v.map['get~feature~enable_rewards'].value));

      this.setEnable('rewards', this.tilesConfig, this.tilesConfig[0].isEnable, value);
      this.setEnable('accounts', this.tilesConfig, this.tilesConfig[0].isEnable, value);


      }
    )
      // console.log(settings['get~feature~enable_rewards']);
      
  this.dashboardService.retrieveSettingsList().pipe(take(1)).subscribe(
    v => {
      // console.log(v);
    },
    error => {
     error.log(error);
      
    }
  )
  }

  setEnable(prop, obj, isEnable, enable) {
    for (prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          obj[isEnable] = enable;
      }
  }
  }

  async presentEditHomePageModal() {
    const modal = await this.modalController.create({
      component: EditHomePageModalComponent,
    });
    return await modal.present();
  }

  

}

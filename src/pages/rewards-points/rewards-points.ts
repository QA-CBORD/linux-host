import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

import { RewardsDataManager } from '../../providers/rewards-data-manager/rewards-data-manager';
import { MessageResponse } from '../../models/service/message-response.interface';
import { RewardService } from '../../providers/reward-service/reward-service';
import { UserRewardTrackInfoInfoList, UserRewardTrackInfo, UserTrackLevelInfo, ClaimableRewardInfo, RedeemableRewardInfo } from '../../models/rewards/rewards.interface'
import { RewardDetailsPage } from '../reward-details/reward-details';

@IonicPage()
@Component({
  selector: 'page-rewards-points',
  templateUrl: 'rewards-points.html',
})
export class RewardsPointsPage {
  userRewardTrackInfo: UserRewardTrackInfo;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public rewardService: RewardService, 
    public alertCtrl: AlertController, public rewardsDataManager: RewardsDataManager, public popoverCtrl: PopoverController, 
    private translate: TranslateService) {
      events.subscribe(RewardsDataManager.DATA_USERREWARDTRACKINFO_UPDATED, (userRewardTrackInfo) => {
        if (userRewardTrackInfo) {
          this.userRewardTrackInfo = userRewardTrackInfo;
        }
      });        
  }

  ionViewDidLoad() {
    this.rewardsDataManager.getUserRewardsData();
  }

  rewardClicked(reward: RedeemableRewardInfo) {
    let popover = this.popoverCtrl.create(RewardDetailsPage, reward);
    popover.present();
  }
}

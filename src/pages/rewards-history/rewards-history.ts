import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { RewardsDataManager } from '../../providers/rewards-data-manager/rewards-data-manager';
import { MessageResponse } from '../../models/service/message-response.interface';
import { RewardService } from '../../providers/reward-service/reward-service';
import { UserRewardTrackInfoInfoList, UserRewardTrackInfo, UserTrackLevelInfo, ClaimableRewardInfo, RedeemableRewardInfo, UserFulfillmentActivityInfo } from '../../models/rewards/rewards.interface'

@IonicPage()
@Component({
  selector: 'page-rewards-history',
  templateUrl: 'rewards-history.html',
})
export class RewardsHistoryPage {
  userRewardTrackInfo: UserRewardTrackInfo;
  userFulfillmentActivityInfo: UserFulfillmentActivityInfo[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public rewardService: RewardService, 
    public alertCtrl: AlertController, public rewardsDataManager: RewardsDataManager) {

      events.subscribe(RewardsDataManager.DATA_USERREWARDTRACKINFO_UPDATED, (userRewardTrackInfo) => {
        if (userRewardTrackInfo) {
          this.userRewardTrackInfo = userRewardTrackInfo;
        }
      });      
      events.subscribe(RewardsDataManager.DATA_USERFULFILLMENTACTIVITYINFO_UPDATED, (userFulfillmentActivityInfo) => {
        if (userFulfillmentActivityInfo) {
          this.userFulfillmentActivityInfo = userFulfillmentActivityInfo;
        }
      });      
    
  }

  ionViewDidLoad() {
    this.rewardsDataManager.getUserRewardsData();
  }

  showRewardDetails(reward: RedeemableRewardInfo) {
    
  }
}


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { RewardsProvider } from '../../providers/reward-provider/reward-provider';
import { MessageResponse } from '../../models/service/message-response.interface';
import { RewardService } from '../../services/reward-service/reward-service';
import { UserRewardTrackInfoInfoList, UserRewardTrackInfo, UserTrackLevelInfo, ClaimableRewardInfo } from '../../models/rewards/rewards.interface'

@IonicPage()
@Component({
  selector: 'page-reward-details-modal',
  templateUrl: 'reward-details-modal.html',
})

export class RewardDetailsModalPage {
  qrCode = null;
  userRewardTrackInfo: UserRewardTrackInfo = null;
  reward: ClaimableRewardInfo = null;
  bIsRedeemed: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events, 
    public rewardService: RewardService, 
    public alertCtrl: AlertController, 
    public rewardsDataManager: RewardsProvider) {

    this.reward = this.navParams.data.rewardInfo;
    
    this.bIsRedeemed = this.navParams.data.bIsRedeemed;

    // events.subscribe(RewardsProvider.DATA_USERREWARDTRACKINFO_UPDATED, (userRewardTrackInfo) => {
    //   if (userRewardTrackInfo) {
    //     this.userRewardTrackInfo = userRewardTrackInfo;
    //   }
    // });

    // Do an initial pull of userRewardTrackInfo from cache if available.
    // rewardsDataManager.getUserRewardsData(false);
  }

  ionViewDidLoad() {
  }

  createQRCode() {
  }

  closeDetails() {
    this.navCtrl.pop();
  }

  levelRewardClicked() {
    // only claim a reward if none have been claimed for this level already
    if (!this.userRewardTrackInfo.trackLevels[this.reward.claimLevel-1].redeemed) {
      // this.rewardService.claimReward(this.reward.id).subscribe(
      //   ((data: MessageResponse<boolean>) => this.ClaimRewardResponse(data.response)),
      //   ((error) => this.showError(error))
      // )    
    }
  }

  ClaimRewardResponse(result: any) {
    // Close the claim dialog 
    this.closeDetails();

    // Inform user of success or failure
    let message = "Your reward has been claimed.";
    if (result != true) {
      message = "There has been an error and your reward was not claimed.";
    }
    let alert = this.alertCtrl.create({
      title: 'Claim Reward',
      subTitle: message,
      buttons: ['OK']
    });
    // Show alert with results
    alert.present();

    // update UI to show the results
    // this.rewardsDataManager.getUserRewardsData(true);
  }

  showError(message: any) {
    console.error(message);
  }

}

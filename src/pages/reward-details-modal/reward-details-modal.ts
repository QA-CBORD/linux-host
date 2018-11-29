import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { RewardService } from '../../services/reward-service/reward-service';



@IonicPage()
@Component({
  selector: 'page-reward-details-modal',
  templateUrl: 'reward-details-modal.html',
})

export class RewardDetailsModalPage {

  reward: any = null;
  bIsClaimable: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public rewardService: RewardService,
    public alertCtrl: AlertController) {

    this.reward = this.navParams.data.rewardInfo;

    this.bIsClaimable = this.navParams.data.bIsClaimable;

  }



  rewardClaimedClick() {
    // only claim a reward if none have been claimed for this level already
    this.rewardService.claimReward(this.reward.id).subscribe(
      ((response: boolean) => this.claimRewardResponse(response)),
      ((error) => this.showError(error))
    )

  }

    /**
   * Handle the error response from HTTP calls
   * 
   * @param error     Error returned from call
   */
  protected showError(error: Response | any) {
    return Observable.throw(error);
  }

  claimRewardResponse(result: boolean) {
    // Close the claim dialog 
    this.viewCtrl.dismiss({ 'bRefresh': 'result' });

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
  }

  closeModalClicked(){
    this.viewCtrl.dismiss({ 'bRefresh': 'false' });
  }

}

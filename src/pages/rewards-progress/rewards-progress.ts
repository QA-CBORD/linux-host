import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Chart } from 'chart.js';

import { RewardsDataManager } from '../../providers/rewards-data-manager/rewards-data-manager';
import { MessageResponse } from '../../models/service/message-response.interface';
import { RewardService } from '../../providers/reward-service/reward-service';
import { UserRewardTrackInfoInfoList, UserRewardTrackInfo, UserTrackLevelInfo, ClaimableRewardInfo } from '../../models/rewards/rewards.interface'
import { RewardDetailsPage } from '../reward-details/reward-details';
import { GETService } from '../../providers/get-service/get-service';
import { AccordionListOptionModel } from '../../shared/accordion-list/models/accordionlist-option-model';
import { AccordionListSettings } from '../../shared/accordion-list/models/accordionlist-settings';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';



@IonicPage({
})
@Component({
  selector: 'page-rewards-progress',
  templateUrl: 'rewards-progress.html',
})
export class RewardsProgressPage {

  // Options to show in the SideMenuComponent
  public options: Array<AccordionListOptionModel>;
  public pointsOptions: Array<AccordionListOptionModel>;

  // Settings for the SideMenuComponent
  public accordionListSettings: AccordionListSettings = {
    accordionMode: true,
    showSelectedOption: true,
    selectedOptionClass: 'active-side-menu-option',
    itemHeight: {
      md: 64,
      ios: 64,
      wp: 64
    },
    subOptionIndentation: {
      md: '56px',
      ios: '64px',
      wp: '56px'
    }
  };

  @ViewChild('progressChartCanvas') progressChartCanvas;
  rewardType;
  progressChart: Chart;
  xpGained: number = 0;
  xpForLevel: number = 0;
  atMaxLevel: boolean = false;
  nextLevel: number = 0;
  currentProgressPercentage: number = 0;
  userRewardTrackInfo: UserRewardTrackInfo;
  detailsActiveList: Map<string, UserTrackLevelInfo> = new Map();
  levelClaimedList: Map<string, number> = new Map();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public rewardService: RewardService,
    public alertCtrl: AlertController,
    public rewardsDataManager: RewardsDataManager,
    public popoverCtrl: PopoverController
  ) {
    events.subscribe(RewardsDataManager.DATA_USERREWARDTRACKINFO_UPDATED, (userRewardTrackInfo) => {
      if (userRewardTrackInfo) {
        this.userRewardTrackInfo = userRewardTrackInfo;
        this.calculatePercentageToNextLevel();
        this.createProgressChart();
        this.populateLevelList();
        this.populatePointsList();
        this.rewardType = 'experience';
      } else {
        // there is no data for some reason
      }
    });
  }

  public selectOption(option: AccordionListOptionModel): void {

  }

  openHistory() {
    console.log("Open History Click");

  }

  ionViewCanEnter() {
    // Validate that the user is loggedin, if not redirect
  }

  ionViewDidLoad() {
    if (GETService.getSessionId() != null) {
      this.rewardsDataManager.getUserRewardsData();
    }

  }

  toggleLevelDetails(trackLevel: UserTrackLevelInfo) {
    if (trackLevel != null) {
      if (this.detailsActiveList.get(String(trackLevel.level))) {
        this.detailsActiveList.delete(String(trackLevel.level));
      } else {
        this.detailsActiveList.set(String(trackLevel.level), trackLevel);
      }
    }
  }

  showLevelDetails(trackLevel: UserTrackLevelInfo) {
    if (trackLevel == null) {
      return false;
    } else {
      if (this.detailsActiveList.get(String(trackLevel.level))) {
        return true;
      } else {
        return false;
      }
    }
  }

  levelRewardClicked(userClaimableReward: ClaimableRewardInfo) {
    let popover = this.popoverCtrl.create(RewardDetailsPage, userClaimableReward);
    popover.present();
  }

  createProgressChart() {
    console.log(`createPChard - xpGained: ${this.xpGained}, xpForLevel: ${this.xpForLevel}, xpGained: ${this.xpGained}`);

    this.progressChart = new Chart(this.progressChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          backgroundColor: ['#61dd7a', '#c4c4c4'],
          data: [this.xpGained, this.xpForLevel - this.xpGained]
          // data: [50, 0 - 25]
        }]
      },
      options: {
        legend: { display: false },
        rotation: .875 * Math.PI,
        circumference: 1.25 * Math.PI,
        cutoutPercentage: 80,
        animation: {
          animateScale: false,
          animateRotate: true
        },
        events: []
      }
    });
  }

  showError(message: any) {
    console.error("Show Error:");
    console.error(message);
  }

  calculatePercentageToNextLevel() {
    if (this.userRewardTrackInfo) {
      // check to see if the user is already at max level
      if (this.userRewardTrackInfo.userLevel == this.userRewardTrackInfo.trackLevels[this.userRewardTrackInfo.trackLevels.length - 1].level) {
        // at max level
        this.atMaxLevel = true;
        this.currentProgressPercentage = 100;
        this.xpForLevel = 10;
        this.xpGained = 10;
        this.nextLevel = this.userRewardTrackInfo.userLevel;
      } else {
        // get the required xp of the current level
        let curLevelXP = 0;
        if (this.userRewardTrackInfo.trackLevels.length >= this.userRewardTrackInfo.userLevel - 1) {
          curLevelXP = this.userRewardTrackInfo.trackLevels[this.userRewardTrackInfo.userLevel - 1].requiredPoints;
        }
        // Total XP required for the next level
        let levelRequiredXP = 0;
        levelRequiredXP = this.userRewardTrackInfo.trackLevels[this.userRewardTrackInfo.userLevel].requiredPoints - curLevelXP;
        this.nextLevel = this.userRewardTrackInfo.trackLevels[this.userRewardTrackInfo.userLevel].level;
        this.xpForLevel = levelRequiredXP;
        this.atMaxLevel = false;


        // user progress in next level
        let userProgressXP = this.userRewardTrackInfo.userExperiencePoints - curLevelXP;
        this.xpGained = userProgressXP;

        if (levelRequiredXP != 0) { // let's not divid by zero
          this.currentProgressPercentage = Math.round((userProgressXP / levelRequiredXP) * 100);
        } else {
          this.currentProgressPercentage = 0;
        }
      }

    }

  }

  private populateLevelList() {
    if (!this.userRewardTrackInfo) {
      return;
    }
    this.options = new Array<AccordionListOptionModel>();

    let index = 0;

    while (index < this.userRewardTrackInfo.trackLevels.length) {
      let iIndex = 0;
      let newSubOptions = new Array<AccordionListOptionModel>();
      while (iIndex < this.userRewardTrackInfo.trackLevels[index].userClaimableRewards.length) {
        newSubOptions.push({
          displayName: this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].name,
          displayDescription: this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].shortDescription,
          component: this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].id,
          badge: this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].claimStatus == 3 ? ArrayObservable.of('CLAIMED') : null
        });
        iIndex++;
      }
      this.options.push({
        displayName: `Level ${this.userRewardTrackInfo.trackLevels[index].level} (${this.userRewardTrackInfo.trackLevels[index].requiredPoints} XP): ${this.userRewardTrackInfo.trackLevels[index].name}`,
        subItems: newSubOptions
      });
      index++;
    }



  }

  private populatePointsList() {
    if (!this.userRewardTrackInfo) {
      return;
    }

    this.pointsOptions = new Array<AccordionListOptionModel>();

    let index = 0;

    while (index < this.userRewardTrackInfo.redeemableRewards.length) {
      // let iIndex = 0;
      // let newSubOptions = new Array<AccordionListOptionModel>();
      // while (iIndex < this.userRewardTrackInfo.redeemableRewards.length) {        
      // newSubOptions.push({
      //   displayName: this.userRewardTrackInfo.redeemableRewards[index].description,
      //   component: this.userRewardTrackInfo.redeemableRewards[index].id,
      //   badge: null
      // });
      // iIndex++;
      // }
      this.pointsOptions.push({
        displayName: `${this.userRewardTrackInfo.redeemableRewards[index].name}      ${this.userRewardTrackInfo.redeemableRewards[index].pointCost} Points`,
        subItems: [{
          displayName: this.userRewardTrackInfo.redeemableRewards[index].description,
          component: this.userRewardTrackInfo.redeemableRewards[index].id,
          badge: null
        }]
      });
      index++;
    }



  }

}

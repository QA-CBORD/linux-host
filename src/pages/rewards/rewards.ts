import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform, PopoverController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { TranslateService } from "@ngx-translate/core";

import { ArrayObservable } from 'rxjs/observable/ArrayObservable';

import * as Globals from '../../app/app.global';

import { GETService } from '../../providers/get-service/get-service';
import { RewardsDataManager } from '../../providers/reward-data-manager/reward-data-manager';
import { RewardService } from '../../providers/reward-service/reward-service';
import { UserRewardTrackInfo, UserTrackLevelInfo, ClaimableRewardInfo } from '../../models/rewards/rewards.interface'
import { RewardDetailsPage } from '../reward-details/reward-details';
import { AccordionListOptionModel } from '../../shared/accordion-list/models/accordionlist-option-model';
import { AccordionListSettings } from '../../shared/accordion-list/models/accordionlist-settings';
import { ExceptionManager } from '../../providers/exception-manager/exception-manager';



@IonicPage({
})
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {

  // Options to show in the SideMenuComponent
  public options: Array<AccordionListOptionModel>;
  public pointsOptions: Array<AccordionListOptionModel>;

  // Settings for the SideMenuComponent
  public accordionListSettings: AccordionListSettings = {
    accordionMode: true,
    showSelectedOption: true,
    selectedOptionClass: 'active-side-menu-option',
    headerHeight: {
      md: 64,
      ios: 64,
      wp: 64
    },
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

  bShowLevels: boolean = false;
  bShowPoints: boolean = false;

  detailsActiveList: Map<string, UserTrackLevelInfo> = new Map();
  levelClaimedList: Map<string, number> = new Map();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public rewardService: RewardService,
    public alertCtrl: AlertController,
    public rewardsDataManager: RewardsDataManager,
    private popoverCtrl: PopoverController,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private platform: Platform
  ) {
    events.subscribe(RewardsDataManager.DATA_USERREWARDTRACKINFO_UPDATED, (userRewardTrackInfo) => {
      if (userRewardTrackInfo) {
        this.userRewardTrackInfo = userRewardTrackInfo;

        if (this.userRewardTrackInfo.userOptInStatus == 0) {
          // show opt in with option to exit
          ExceptionManager.showException(this.events, {
            displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
            messageInfo: {
              title: "Rewards Opt-In",
              message: "Would you like to use GET Rewards?",
              positiveButtonTitle: "YES",
              positiveButtonHandler: () => {
                // MAKE OPT_IN Call
                this.rewardsDataManager.getUserRewardsData();
              },
              negativeButtonTitle: "CLOSE",
              negativeButtonHandler: () => {
                this.platform.exitApp();
              }
            }
          });
          return;
          // on opt in accepted, call rewardsDataManager.getUserRewardData() to update the data app wide (event)
        }

        console.log(userRewardTrackInfo);



        this.handleRewardTrackInfo();

      } else {
        // there is no data for some reason
      }
    });
  }

  ionViewDidLoad() {
    if (GETService.getSessionId() != null) {
      this.rewardsDataManager.getUserRewardsData();
    }
  }


  private handleRewardTrackInfo() {

    // check data for erroneous configurations

    this.bShowLevels = (this.userRewardTrackInfo.hasLevels && this.userRewardTrackInfo.trackLevels.length > 0);
    this.bShowPoints = (this.userRewardTrackInfo.hasRedeemableRewards && this.userRewardTrackInfo.redeemableRewards.length > 0);

    // 0 = normal
    // 1 = null data
    // 2 = levels only, no levels
    // 3 = levels and points, no levels or points
    // 4 = points only, no points
    let dataStatus = 0;



    switch (dataStatus) {
      case 0: // normal
        // do nothing
        break;
      case 1: // null data
        this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
        ExceptionManager.showException(this.events, {
          displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
          messageInfo: {
            title: "That's odd...",
            message: "There was a problem with your Rewards information and we're having trouble reading it.",
            positiveButtonTitle: "RETRY",
            positiveButtonHandler: () => {
              this.rewardsDataManager.getUserRewardsData();
            },
            negativeButtonTitle: "CLOSE",
            negativeButtonHandler: () => {
              this.platform.exitApp();
            }
          }
        });
        return;
      case 2: // levels only, no levels
      case 3: // level and points, no levels or points
      case 4: // points only, no points
        this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
        ExceptionManager.showException(this.events, {
          displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
          messageInfo: {
            title: "That's odd...",
            message: "It appears that Rewards has been misconfigured by your Institution.",
            positiveButtonTitle: "CLOSE",
            positiveButtonHandler: () => {
              this.platform.exitApp();
            }
          }
        });
        return;
    }

    this.calculatePercentageToNextLevel();
    this.createProgressChart();
    this.populateLevelList();
    this.populatePointsList();


    // set activated tab
    if (this.bShowLevels) {
      this.rewardType = 'experience';
    } else if (this.bShowPoints) {
      this.rewardType = 'points';
    } else {
      this.rewardType = 'history';
    }

    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });

  }

  //#region UI SETUP

  createProgressChart() {

    if (!this.bShowLevels) {
      return;
    }

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
          animateRotate: false
        },
        events: []
      }
    });
  }

  calculatePercentageToNextLevel() {

    if (!this.bShowLevels) {
      return;
    }

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

  private populateLevelList() {

    if (!this.bShowLevels) {
      return;
    }

    this.options = new Array<AccordionListOptionModel>();

    let index = 0;

    while (index < this.userRewardTrackInfo.trackLevels.length) {
      console.log("Add Level Item");
      let iIndex = 0;
      let newSubOptions = new Array<AccordionListOptionModel>();
      while (iIndex < this.userRewardTrackInfo.trackLevels[index].userClaimableRewards.length) {
        newSubOptions.push({
          displayName: this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].name,
          displayDescription: this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].shortDescription,
          component: this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].id,
          badge: this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].claimStatus == 3 ? ArrayObservable.of('CLAIMED') : null,
          custom: {
            levelIndex: index,
            itemIndex: iIndex
          }
        });
        iIndex++;
      }
      this.options.push({
        displayName: `Level ${this.userRewardTrackInfo.trackLevels[index].level}`,
        displayDescription: `${this.userRewardTrackInfo.trackLevels[index].name}`,
        subItems: newSubOptions,
        badge: this.userRewardTrackInfo.trackLevels[index].redeemed ? ArrayObservable.of('CLAIMED') : null
      });
      index++;
    }



  }

  private populatePointsList() {

    if (!this.bShowPoints) {
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
      console.log("Add Points Item");
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

  //#endregion

  //#region OPTION SELECTION

  public selectOption(option: AccordionListOptionModel): void {
    console.log(`Option Selected: ${option.displayName}`);
    if (option.custom) {
      let currentLevelInfo: UserTrackLevelInfo = this.userRewardTrackInfo.trackLevels[option.custom.levelIndex];
      let currentOption: ClaimableRewardInfo = currentLevelInfo.userClaimableRewards[option.custom.itemIndex];
      this.openItemInfo(currentOption, currentLevelInfo.redeemed);
    }
  }

  openItemInfo(claimableItem: ClaimableRewardInfo, redeemed: boolean) {
    // let rdModal = this.modalCtrl.create(RewardDetailsPage, {rewardInfo: claimableItem, bIsRedeemed: redeemed});
    // rdModal.present();
    let rdPopover = this.popoverCtrl.create(RewardDetailsPage, { rewardInfo: claimableItem, bIsRedeemed: redeemed });
    rdPopover.present();//{animate: false});

  }

  //#endregion

  openHistory() {
    console.log("Open History Click");

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

}

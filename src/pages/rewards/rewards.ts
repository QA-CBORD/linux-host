import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform, PopoverController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { TranslateService } from "@ngx-translate/core";
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';

import { RewardService } from '../../services/reward-service/reward-service';

import { RewardsProvider } from '../../providers/reward-provider/reward-provider'
import { ExceptionProvider } from '../../providers/exception-provider/exception-provider';

import { AccordionListOptionModel } from '../../shared/accordion-list/models/accordionlist-option-model';
import { AccordionListSettings } from '../../shared/accordion-list/models/accordionlist-settings';
import { MUserRewardTrackInfo, MUserTrackLevelInfo, MClaimableRewardInfo, MUserFulfillmentActivityInfo, MRedeemableRewardInfo } from '../../models/rewards/rewards.interface'
import { RewardDetailsModalPage } from '../reward-details-modal/reward-details-modal';

import * as Globals from '../../app/app.global';



@IonicPage({
  name: 'rewards'
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

  @ViewChild('chartCanvas') progressChartCanvas;
  progressChart: any;

  rewardType; 
  xpGained: number = 0;
  xpForLevel: number = 0;
  nextLevel: number = 0;
  currentProgressPercentage: number = 0;

  labelPointSpread: any;
  labelCurrentLevel: any;
  labelNextLevel: any;

  userRewardTrackInfo: MUserRewardTrackInfo;
  userPointsItemsList: Array<MRedeemableRewardInfo>;
  userHistoryItemList: Array<MUserFulfillmentActivityInfo>;

  bShowLevels: boolean = false;
  bShowPoints: boolean = false;

  detailsActiveList: Map<string, MUserTrackLevelInfo> = new Map();
  levelClaimedList: Map<string, number> = new Map();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public rewardService: RewardService,
    public alertCtrl: AlertController,
    public rewardsProvider: RewardsProvider,
    private popoverCtrl: PopoverController,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private platform: Platform,
  ) {

  }

  ionViewDidLoad() {
  }

  ngAfterViewInit() {
    this.getRewardTrackInfo();    
  }

  private getRewardTrackInfo() {
    this.rewardsProvider.getUserRewardsData().subscribe(
      trackInfoArray => {
        /// check if response is valid and contains a reward track
        if (trackInfoArray && trackInfoArray.length > 0) {
          this.userRewardTrackInfo = trackInfoArray[0];
          if (trackInfoArray[0].userOptInStatus == 0) {
            // show opt in with option to exit
            ExceptionProvider.showException(this.events, {
              displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
              messageInfo: {
                title: "Rewards Opt-In",
                message: "Would you like to use GET Rewards?",
                positiveButtonTitle: "YES",
                positiveButtonHandler: () => {
                  // MAKE OPT_IN Call
                  this.rewardsProvider.optInUser(this.userRewardTrackInfo.trackID);
                },
                negativeButtonTitle: "CLOSE",
                negativeButtonHandler: () => {
                  this.platform.exitApp();
                }
              }
            });
          } else {
            this.getRewardHistory(trackInfoArray[0])
            this.handleRewardTrackInfo();
          }
        } else {
          // there is no data for some reason
        }
      },
      error => {
        ExceptionProvider.showException(this.events, {
          displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
          messageInfo: {
            title: "Reward Information",
            message: "Something went wrong while retrieving your Rewards information",
            positiveButtonTitle: "RETRY",
            positiveButtonHandler: () => {
              // MAKE OPT_IN Call
              this.getRewardTrackInfo();
            },
            negativeButtonTitle: "CLOSE",
            negativeButtonHandler: () => {
              this.platform.exitApp();
            }
          }
        });
      }
    )
  }

  private getRewardHistory(userRewardTI: MUserRewardTrackInfo) {
    this.rewardsProvider.getUserRewardHistory(userRewardTI.trackID, userRewardTI.trackStartDate, userRewardTI.trackEndDate).subscribe(
      response => {
        this.userHistoryItemList = response;
      },
      error => {
        ExceptionProvider.showException(this.events, {
          displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
          messageInfo: {
            title: "Reward History",
            message: "Something went wrong while retrieving your Rewards History",
            positiveButtonTitle: "RETRY",
            positiveButtonHandler: () => {
              // MAKE OPT_IN Call
              this.getRewardHistory(this.userRewardTrackInfo);
            },
            negativeButtonTitle: "CLOSE",
            negativeButtonHandler: () => {
              this.platform.exitApp();
            }
          }
        });
      }
    );
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
        ExceptionProvider.showException(this.events, {
          displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
          messageInfo: {
            title: "That's odd...",
            message: "There was a problem with your Rewards information and we're having trouble reading it.",
            positiveButtonTitle: "RETRY",
            positiveButtonHandler: () => {
              this.rewardsProvider.getUserRewardsData();
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
        ExceptionProvider.showException(this.events, {
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
    setTimeout(() => {
      this.createProgressChart();
    }, 250);
    
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
    if (this.userRewardTrackInfo.userLevel >= this.userRewardTrackInfo.trackLevels.length) {
      // at max level
      this.currentProgressPercentage = 100;
      this.nextLevel = this.userRewardTrackInfo.userLevel;

      this.xpGained = 10;
      this.xpForLevel = 10;

      this.labelCurrentLevel = this.nextLevel - 1;
      this.labelNextLevel = this.nextLevel;
      this.labelPointSpread = 'Max Level';
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

      this.labelCurrentLevel = this.nextLevel - 1;
      this.labelNextLevel = this.nextLevel;
      this.labelPointSpread = curLevelXP + ' / ' + this.xpForLevel;

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
      let iIndex = 0;
      let newSubOptions = new Array<AccordionListOptionModel>();

      let bIsLevelItemClaimedForHeader: boolean = false;


      /// if there are no rewards availabel for this level, just create a subitem to show that
      if (this.userRewardTrackInfo.trackLevels[index].userClaimableRewards.length <= 0) {
        newSubOptions.push({
          displayName: "There are no rewards available at this time",
          component: null,
          badge: null
        });
      }

      while (iIndex < this.userRewardTrackInfo.trackLevels[index].userClaimableRewards.length) {
        if (!bIsLevelItemClaimedForHeader) {
          bIsLevelItemClaimedForHeader = this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].claimStatus == 3 || this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].claimStatus == 2;
        }
        newSubOptions.push({
          displayName: this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].name,
          displayDescription: this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].shortDescription,
          component: this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].id,
          badge: this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].claimStatus == 3  || this.userRewardTrackInfo.trackLevels[index].userClaimableRewards[iIndex].claimStatus == 2 ? ArrayObservable.of('CLAIMED') : null,
          badgeColor: 'secondary',
          custom: {
            levelIndex: index,
            itemIndex: iIndex
          }
        });
        iIndex++;
      }

      let badgeText: string = null;
      let badgeColor: string = null;

      if (bIsLevelItemClaimedForHeader) {
        badgeText = "CLAIMED";
        badgeColor = 'secondary'
      } else if (index < this.userRewardTrackInfo.userLevel) {
        badgeText = "UNLOCKED";
        badgeColor = 'primary'
      } else {
        badgeText = "LOCKED";
        badgeColor = 'dark'
      }

      this.options.push({
        displayName: `Level ${this.userRewardTrackInfo.trackLevels[index].level}`,
        displayDescription: `${this.userRewardTrackInfo.trackLevels[index].name}`,
        subItems: newSubOptions,
        badge: ArrayObservable.of(badgeText),
        badgeColor: badgeColor
      });
      index++;
    }



  }

  private populatePointsList() {

    if (!this.bShowPoints) {
      return;
    }
    this.userPointsItemsList = this.userRewardTrackInfo.redeemableRewards;


    this.pointsOptions = new Array<AccordionListOptionModel>();

    let index = 0;

    while (index < this.userRewardTrackInfo.redeemableRewards.length) {
      let iIndex = 0;
      let newSubOptions = new Array<AccordionListOptionModel>();
      while (iIndex < this.userRewardTrackInfo.redeemableRewards.length) {
        newSubOptions.push({
          displayName: this.userRewardTrackInfo.redeemableRewards[index].description,
          component: this.userRewardTrackInfo.redeemableRewards[index].id,
          badge: null
        });
        iIndex++;
      }
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

  public selectLevelOption(option: AccordionListOptionModel): void {
    console.log(`Option Selected: ${option.displayName}`);
    if (option.custom) {
      let currentLevelInfo: MUserTrackLevelInfo = this.userRewardTrackInfo.trackLevels[option.custom.levelIndex];
      let currentOption: MClaimableRewardInfo = currentLevelInfo.userClaimableRewards[option.custom.itemIndex];
      this.openItemDetailPopover(currentOption, !currentLevelInfo.redeemed);
    }
  }



  public pointsItemSelected(claimableItem: MRedeemableRewardInfo) {
    this.openItemDetailPopover(claimableItem, claimableItem.pointCost <= this.userRewardTrackInfo.userCurrentPoints);
  }

  public hitoryItemSelected(item: MUserFulfillmentActivityInfo) {
    this.openItemDetailPopover(item, false);
  }

  openItemDetailPopover(claimableItem: any, isClaimable: boolean) {

    let rdPopover = this.popoverCtrl.create(RewardDetailsModalPage, { rewardInfo: claimableItem, bIsClaimable: isClaimable });
    rdPopover.onDidDismiss((data) => {
      // Call the method to do whatever in your home.ts
         console.log('Modal closed');
         if(data.bRefresh == "true"){
           this.getRewardTrackInfo();
         }
  });
    rdPopover.present();//{animate: false});

  }

  //#endregion

  toggleLevelDetails(trackLevel: MUserTrackLevelInfo) {
    if (trackLevel != null) {
      if (this.detailsActiveList.get(String(trackLevel.level))) {
        this.detailsActiveList.delete(String(trackLevel.level));
      } else {
        this.detailsActiveList.set(String(trackLevel.level), trackLevel);
      }
    }
  }

  showLevelDetails(trackLevel: MUserTrackLevelInfo) {
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

import { MyApp } from './../../app/app.component';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Tab, Events, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import * as Globals from '../../app/app.global';

import { GETService } from './../../providers/get-service/get-service';
import { AuthService } from './../../providers/auth-service/auth-service';

import { RewardsProgressPage } from '../rewards-progress/rewards-progress';
import { RewardsPointsPage } from '../rewards-points/rewards-points';
import { RewardsHistoryPage } from '../rewards-history/rewards-history';
import { SessionService } from '../../providers/session-service/session-service';
import { RewardsDataManager } from '../../providers/reward-data-manager/reward-data-manager';
import { MessageResponse } from '../../models/service/message-response.interface';
import { UserRewardTrackInfoInfoList, UserRewardTrackInfo, UserTrackLevelInfo, UserFulfillmentActivityInfo } from '../../models/rewards/rewards.interface'
import { MenuOptionModel } from '../../shared/side-menu-content/models/menu-option-model';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { ExceptionManager } from '../../providers/exception-manager/exception-manager';

@IonicPage({
  name: 'home',
  segment: 'home/:sessionToken'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  sessionToken: string = null;
  userRewardTrackInfo: UserRewardTrackInfo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public rewardsDataManager: RewardsDataManager,
    public sessionService: SessionService,
    private authService: AuthService,
    private platform: Platform
  ) {
    // commented for debugging... uncomment for final build
    this.sessionToken = navParams.get('sessionToken');

    events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: "Getting Datas..." });

    // hide the split pane here becuase we don't need the navigation menu
    events.publish(Globals.Events.SIDEPANE_ENABLE, false);

    this.onFirstLoad();

    events.subscribe(RewardsDataManager.DATA_USERREWARDTRACKINFO_UPDATED, (userRewardTrackInfo: UserRewardTrackInfo) => {
      this.userRewardTrackInfo = userRewardTrackInfo;
      console.log("Reward Data Response");

      this.onRewardsData();
    });
  }

  private onFirstLoad() {
    // use session Sharing key passed in URL to get new session
    if (this.sessionToken != null) {
      this.sessionService.getSession(this.sessionToken).subscribe(
        ((data: string) => {
          GETService.setSessionId(data);
          this.getSessionResponse(data)
        }),
        ((error) => {

        })
      );
    } else {
      // added else statement for debugging... remove for final build
      // used to get session id from hardcoded login for testing
      console.log("Debug, getting session");
      this.authService.authenticateUser(null).subscribe(
        sessionId => {
          GETService.setSessionId(sessionId);
          this.getSessionResponse(sessionId);
        },
        error => {
          // use proper method to parse the message and determine proper message
          ExceptionManager.showException(this.events, {
            displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
            messageInfo: {
              title: "No Session",
              message: error,
              positiveButtonTitle: "RETRY",
              positiveButtonHandler: () => {
                this.onFirstLoad();
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


  }

  private getSessionResponse(session: any) {
    // on new session, retrieve data
    if (session) {
      // this.
      this.rewardsDataManager.getUserRewardsData();
    }
  }


  // perform UI filling and logic based on reward data
  private onRewardsData() {

    // 0 = normal
    // 1 = null data
    // 2 = levels only, no levels
    // 3 = levels and points, no levels or points
    // 4 = points only, no points
    let dataStatus = 0;

console.log(this.userRewardTrackInfo);

    if (this.userRewardTrackInfo == null) {
      dataStatus = 1;
    } else if (this.userRewardTrackInfo.hasLevels && this.userRewardTrackInfo.trackLevels.length <= 0) {
      dataStatus = 2;
      if (this.userRewardTrackInfo.hasRedeemableRewards && this.userRewardTrackInfo.redeemableRewards.length >= 0) {
        dataStatus = 3;
      }
    } else if (this.userRewardTrackInfo.hasRedeemableRewards && this.userRewardTrackInfo.redeemableRewards.length >= 0) {
      dataStatus = 4;
    }

    if (this.userRewardTrackInfo.userOptInStatus == 0) {
      // show opt in with option to exit
      ExceptionManager.showException(this.events, {
        displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
        messageInfo: {
          title: "Rewards Opt-In",
          message: "Would you like to use GET Rewards?",
          positiveButtonTitle: "YES",
          positiveButtonHandler: () => {
            // this.rewardsDataManager.
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

    // unsubscribe from event because we have the data and no longer need it in the Home tabs page
    this.events.unsubscribe(RewardsDataManager.DATA_USERREWARDTRACKINFO_UPDATED);

    if (this.userRewardTrackInfo.userOptInStatus == 0) {
      // show opt in with option to exit
      // on opt in accepted, call rewardsDataManager.getUserRewardData() to update the data app wide (event)
    }

    console.log("Update rewards data");

    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });

    this.navCtrl.push("RewardsProgressPage");

  }

  openHistory() {
    console.log("Open History button click");

  }

}

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
import { RewardsDataManager } from '../../providers/rewards-data-manager/rewards-data-manager';
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
        ((data: MessageResponse<string>) => {
          GETService.setSessionId(data.response);
          this.getSessionResponse(data.response)
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
          })
        }
      )
    }


  }

  private getSessionResponse(session: any) {
    // on new session, retrieve data
    if (session) {
      this.rewardsDataManager.getUserRewardsData();
    }
  }


  // perform UI filling and logic based on reward data
  private onRewardsData() {
    if (this.userRewardTrackInfo == null) {
      // show error and exit
    }

    // unsubscribe from event because we have the data and no longer need it in the Home tabs page
    this.events.unsubscribe(RewardsDataManager.DATA_USERREWARDTRACKINFO_UPDATED);

    if (this.userRewardTrackInfo.userOptInStatus == 0) {
      // show opt in with option to exit
      // on opt in accepted, call rewardsDataManager.getUserRewardData() to update the data app wide (event)
    }

    console.log("Update rewards data");

    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });

    // this.events.publish(MyApp.ERROR_TWOBUTTON_SHOW,
    //   {
    //     title: "Test Title",
    //     message: "Test Message",
    //     leftButtonTitle: "Left Button",
    //     leftButtonHandler: () => console.log("Left Button Pressed"),
    //     rightButtonTitle: "Right Button",
    //     rightButtonHandler: () => console.log("Right Button Pressed")
    //   }
    // );

    this.navCtrl.push("RewardsProgressPage");

  }

  openHistory() {
    console.log("Open History button click");

  }

}

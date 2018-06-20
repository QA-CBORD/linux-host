import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';

import * as Globals from '../../app/app.global';

import { GETService } from './../../providers/get-service/get-service';
import { AuthService } from './../../providers/auth-service/auth-service';

import { SessionService } from '../../providers/session-service/session-service';
import { RewardsDataManager } from '../../providers/reward-data-manager/reward-data-manager';
import { UserRewardTrackInfo } from '../../models/rewards/rewards.interface'
import { ExceptionManager } from '../../providers/exception-manager/exception-manager';

@IonicPage({
  name: 'home',
  segment: 'home/:sessionToken/:destinationPage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  sessionToken: string = null;
  destinationPage: string = null;
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

    // hide the split pane here becuase we don't need the navigation menu
    events.publish(Globals.Events.SIDEPANE_ENABLE, false);

    // commented for debugging... uncomment for final build
    this.sessionToken = navParams.get('sessionToken');
    this.destinationPage = navParams.get('destinationPage');

    events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: "Loading content" });

    

    this.determinNewSession();
  }

  private determinNewSession() {
    // use session Sharing key passed in URL to get new session
    if (this.sessionToken != null) {
      this.sessionService.getSession(this.sessionToken).subscribe(
        ((data: string) => {
          GETService.setSessionId(data);
          this.handleSessionResponse(data)
        }),
        ((error) => {
          // error getting session with session sharing functionality
          // use proper method to parse the message and determine proper message
          ExceptionManager.showException(this.events, {
            displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
            messageInfo: {
              title: "No Session",
              message: error,
              positiveButtonTitle: "RETRY",
              positiveButtonHandler: () => {
                this.determinNewSession();
              },
              negativeButtonTitle: "CLOSE",
              negativeButtonHandler: () => {
                this.platform.exitApp();
              }
            }
          });
        })
      );
    } else {
      // added else statement for debugging... remove for final build
      // used to get session id from hardcoded login for testing
      console.log("Debug, getting session");
      this.authService.authenticateUser(null).subscribe(
        sessionId => {
          GETService.setSessionId(sessionId);
          this.handleSessionResponse(sessionId);
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
                this.determinNewSession();
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

  private handleSessionResponse(session: any) {
    // on new session, retrieve data
    if (session) {

    // debug
      if(this.destinationPage == null){
        this.destinationPage = 'openmydoor';
      }

      switch(this.destinationPage){
        case 'rewards':
          this.navCtrl.push("RewardsPage");
        break;
        case 'openmydoor':
        this.navCtrl.push("OpenMyDoorPage");
        break;
      }
    } else {
      // handle no session error
      // show no session error or redirect back natively or something
      // use proper method to parse the message and determine proper message
      ExceptionManager.showException(this.events, {
        displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
        messageInfo: {
          title: "No Session",
          message: "Handling session response and the session data is null",
          positiveButtonTitle: "RETRY",
          positiveButtonHandler: () => {
            this.determinNewSession();
          },
          negativeButtonTitle: "CLOSE",
          negativeButtonHandler: () => {
            this.platform.exitApp();
          }
        }
      });
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

    let debugString = 
    "Levels = " + this.userRewardTrackInfo.hasLevels + "\n" +
    "Levels Size = " + this.userRewardTrackInfo.trackLevels.length + "\n" +
    "Points = " + this.userRewardTrackInfo.hasRedeemableRewards + "\n" +
    "Points Size = " + this.userRewardTrackInfo.redeemableRewards.length + "\n";

    console.log(debugString);

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

    // unsubscribe from event because we have the data and no longer need it in the Home tabs page
    this.events.unsubscribe(RewardsDataManager.DATA_USERREWARDTRACKINFO_UPDATED);

    console.log("Update rewards data");

    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });

    this.navCtrl.push("RewardsProgressPage");

  }

  openHistory() {
    console.log("Open History button click");

  }

}

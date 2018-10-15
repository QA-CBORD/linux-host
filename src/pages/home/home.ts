import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';

import * as Globals from '../../app/app.global';

import { GETService } from './../../services/get-service/get-service';
import { AuthService } from './../../services/auth-service/auth-service';
import { SessionService } from '../../services/session-service/session-service';

import { MobileAccessProvider } from '../../providers/mobile-access-provider/mobile-access-provider';
import { ExceptionProvider } from '../../providers/exception-provider/exception-provider';

import { Environment } from '../../app/environment';
import { UserRewardTrackInfo } from '../../models/rewards/rewards.interface'
import { GeoCoordinates } from './../../models/geolocation/geocoordinates.interface';


@IonicPage({
  name: 'home',
  segment: 'home/:sessionToken/:currentEnvironment/:destinationPage/:latitude/:longitude/:accuracy'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  sessionToken: string = null;
  destinationPage: string = null;
  geoData: GeoCoordinates = null;

  userRewardTrackInfo: UserRewardTrackInfo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public mobileAccessProvider: MobileAccessProvider,
    public sessionService: SessionService,
    private authService: AuthService,
    private platform: Platform
  ) {

    this.platform.ready().then(() => {

      /// use page url to determine current environment
      Environment.setEnvironmentViaURL(platform.doc().baseURI);

      /// hide the split pane here becuase we don't need the navigation menu
      events.publish(Globals.Events.SIDEPANE_ENABLE, false);

      /// get required params from the URL
      this.destinationPage = navParams.get('destinationPage');

      /// get optional location params from the URL
      try {
        this.geoData.coords.latitude = parseFloat(navParams.get('latitude'));
        this.geoData.coords.longitude = parseFloat(navParams.get('longitude'));
        this.geoData.coords.accuracy = parseFloat(navParams.get('accuracy'));
      } catch (error) {
        /// will only fail when no geolocation data from native device or url        
      }

      events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: "Loading content" });

      this.handleSessionToken(navParams.get('sessionToken'));
    })
      .catch(() => {
        /// do nothing, won't happen
      });

  }

  /**
   *  Handle the 'Session Sharing' session token provided from the native applications to acquire a new session id
   * @param sessionToken 
   */
  private handleSessionToken(sessionToken: any) {
    if (sessionToken) {
      /// acquire the new session id with the session token
      this.authService.authenticateSessionToken(sessionToken).subscribe(
        newSessionId => {
          GETService.setSessionId(newSessionId);
          this.handlePageNavigation();
        },
        error => {
          ExceptionProvider.showException(this.events, {
            displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
            messageInfo: {
              title: "No Session",
              message: "Unable to verify your session.",
              positiveButtonTitle: "RETRY",
              positiveButtonHandler: () => {
                this.handleSessionToken(sessionToken);
              },
              negativeButtonTitle: "CLOSE",
              negativeButtonHandler: () => {
                this.platform.exitApp();
              }
            }
          });
        }
      );
    } else {
      /// no session sharing token sent via URL
      /// show no session error or redirect back natively or something
      /// use proper method to parse the message and determine proper message
      ExceptionProvider.showException(this.events, {
        displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
        messageInfo: {
          title: "No Session",
          message: "Handling session response and the session data is null",
          positiveButtonTitle: "CLOSE",
          positiveButtonHandler: () => {
            this.platform.exitApp();
          }
        }
      });
    }
  }

  /**
   *  Navigate user to the destination page after session id has been retrieved
   */
  private handlePageNavigation() {

    /// default to "Mobile Access" page if no destination page value exists
    /// this should never happen
    /// should be handled better
    if (this.destinationPage == null) {
      this.destinationPage = 'openmydoor';
    }

    switch (this.destinationPage) {
      case 'rewards':
        this.navCtrl.push("RewardsPage");
        break;
      case 'openmydoor':
        this.navCtrl.push("OpenMyDoorPage", this.geoData);
        break;
    }
  }

}

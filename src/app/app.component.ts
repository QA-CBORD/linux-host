import { Component, OnDestroy } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Events, LoadingController, Platform } from '@ionic/angular';

import { Router } from '@angular/router';
import * as Globals from './app.global';
import { ExceptionPayload } from './core/model/exception/exception.model';
import { DataCache } from './core/utils/data-cache';
import { from, of, fromEvent, Subscription } from 'rxjs';
import { switchMap, tap, take, map } from 'rxjs/operators';
import { Logger } from './core/utils/logger';
import { Environment } from './environment';
import { ExceptionProvider } from './core/provider/exception-provider/exception.provider';
import { NAVIGATE } from './app.global';
import { TestProvider } from './core/provider/test-provider/test.provider';
import { AuthService } from './core/service/auth-service/auth.service';
import { UserService } from './core/service/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnDestroy {
  private readonly EVENT_APP_PAUSE = 'event.apppause';
  private readonly EVENT_APP_RESUME = 'event.appresume';
  private sessionToken: string = null;
  private readonly sourceSubscription: Subscription = new Subscription();

  private loader;
  private destinationPage: NAVIGATE;

  constructor(
    private readonly platform: Platform,
    private readonly router: Router,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly events: Events,
    private readonly loadCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private readonly testProvider: TestProvider,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    this.initializeApp();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  initializeApp() {
    const subscription = from(this.platform.ready())
      .pipe(
        tap(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
          this.setupAppStateEvent();
          this.subscribeToEvents();
        }),
        switchMap(() => {
          if (location.hash.length) {
            return of(location.hash);
          } else {
            return fromEvent(window, 'message').pipe(
              take(1),
              map((event: any) => {
                const iframeUrl = event.data;
                const isString = typeof iframeUrl === 'string';

                return !isString ? '' : iframeUrl.split('#')[1];
              })
            );
          }
        })
      )
      .subscribe((hash: string) => {
        Logger.setLoggingEnabled(Environment.isDevelopmentEnvironment(location.href));
        Environment.setEnvironmentViaURL(location.href);
        this.parseHashParameters(hash);
        /// get parameters from url
        this.getHashParameters();
        /// now perform normal page logic
        this.handleSessionToken();

        // this.testGetSession();
      });
    this.sourceSubscription.add(subscription);
  }

  private testGetSession() {
    this.testProvider.getTestUser().subscribe(
      success => {
        this.destinationPage = NAVIGATE.mobileAccess;
        this.getUserInfo();
      },
      error => {
        ExceptionProvider.showException(this.events, {
          displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
          messageInfo: {
            title: 'Error getting test user',
            message: error,
            positiveButtonTitle: 'RETRY',
            positiveButtonHandler: () => {
              this.testGetSession();
            },
            negativeButtonTitle: 'CLOSE',
            negativeButtonHandler: () => {
              // TODO: this.platform.exitApp();
            },
          },
        });
      }
    );
  }

  private getHashParameters() {
    /// get required params from the URL
    this.sessionToken = DataCache.getUrlSession();
    this.destinationPage = DataCache.getDestinationPage();
  }

  /**
   * Get hash parameters from url
   */
  private parseHashParameters(urlString: string) {
    const hashParameters: string[] = urlString.split('/');
    const destinationPage = hashParameters[3];
    const existsInNavigate = Object.values(NAVIGATE).some(route => route === destinationPage);

    if (existsInNavigate) {
      DataCache.setWebInitiValues(hashParameters[2] || null, destinationPage as NAVIGATE);
    }
    this.router.navigate([''], { skipLocationChange: true });
  }

  private handleSessionToken() {
    if (this.sessionToken) {
      /// acquire the new session id with the session token
      this.authService
        .authenticateSessionToken(this.sessionToken)
        .pipe(take(1))
        .subscribe(
          newSessionId => {
            if (newSessionId.length <= 0) {
              ExceptionProvider.showException(this.events, {
                displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
                messageInfo: {
                  title: Globals.Exception.Strings.TITLE,
                  message: 'We were unable to verify your credentials',
                  positiveButtonTitle: 'RETRY',
                  positiveButtonHandler: () => {
                    this.handleSessionToken();
                  },
                  negativeButtonTitle: 'CLOSE',
                  negativeButtonHandler: () => {
                    // TODO: this.platform.exitApp();
                  },
                },
              });
              return;
            }
            /// set session id for services base and get the user info for caching
            DataCache.setSessionId(newSessionId);
            this.getUserInfo();
          },
          error => {
            ExceptionProvider.showException(this.events, {
              displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
              messageInfo: {
                title: Globals.Exception.Strings.TITLE,
                message: 'We were unable to verify your credentials',
                positiveButtonTitle: 'RETRY',
                positiveButtonHandler: () => {
                  this.handleSessionToken();
                },
                negativeButtonTitle: 'CLOSE',
                negativeButtonHandler: () => {
                  // TODO: this.platform.exitApp();
                },
              },
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
          title: Globals.Exception.Strings.TITLE,
          message: 'Handling session response and the session data is null',
          positiveButtonTitle: 'CLOSE',
          positiveButtonHandler: () => {
            // TODO: this.platform.exitApp();
          },
        },
      });
    }
  }

  private getUserInfo() {
    this.userService
      .getUser()
      .pipe(take(1))
      .subscribe(
        data => {
          DataCache.setUserInfo(data);
          DataCache.setInstitutionId(data.institutionId);
          this.handlePageNavigation();
        },
        error => {
          ExceptionProvider.showException(this.events, {
            displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
            messageInfo: {
              title: Globals.Exception.Strings.TITLE,
              message: 'Unable to verify your user information',
              positiveButtonTitle: 'RETRY',
              positiveButtonHandler: () => {
                this.handleSessionToken();
              },
              negativeButtonTitle: 'CLOSE',
              negativeButtonHandler: () => {
                // TODO: this.platform.exitApp();
              },
            },
          });
        }
      );
  }

  private handlePageNavigation() {
    this.router.navigate([this.destinationPage], { skipLocationChange: true });
  }

  // Ionic gloabal configurate stuff
  private setupAppStateEvent() {
    this.platform.pause.subscribe(() => {
      this.events.publish(this.EVENT_APP_PAUSE, null);
    });
    this.platform.resume.subscribe(() => {
      this.events.publish(this.EVENT_APP_RESUME, null);
    });
  }

  private subscribeToEvents() {
    this.events.subscribe(Globals.Events.LOADER_SHOW, loaderInfo => this.showLoader(loaderInfo));

    this.events.subscribe(Globals.Events.EXCEPTION_SHOW, exceptionPayload => this.presentException(exceptionPayload));
  }

  //XXX - EXEPTIONS HANDLERS

  presentException(exceptionPayload: ExceptionPayload) {
    switch (exceptionPayload.displayOptions) {
      case Globals.Exception.DisplayOptions.ONE_BUTTON:
        this.presentOneButtonAlert(exceptionPayload.messageInfo);
        break;
      case Globals.Exception.DisplayOptions.TWO_BUTTON:
        this.presentTwoButtonAlert(exceptionPayload.messageInfo);
        break;
      case Globals.Exception.DisplayOptions.THREE_BUTTON:
        this.presentThreeButtonAlert(exceptionPayload.messageInfo);
        break;
    }
  }

  async presentOneButtonAlert(alertOneButtonInfo) {
    const alert = await this.alertCtrl.create({
      header: alertOneButtonInfo.title,
      message: alertOneButtonInfo.message,
      backdropDismiss: false,
      buttons: [
        {
          text: alertOneButtonInfo.positiveButtonTitle,
          handler: alertOneButtonInfo.positiveButtonHandler,
        },
      ],
    });
    alert.present();
  }

  async presentTwoButtonAlert(alertTwoButtonInfo) {
    const alert = await this.alertCtrl.create({
      header: alertTwoButtonInfo.title,
      message: alertTwoButtonInfo.message,
      backdropDismiss: false,
      buttons: [
        {
          text: alertTwoButtonInfo.negativeButtonTitle,
          role: 'cancel',
          handler: alertTwoButtonInfo.negativeButtonHandler,
        },
        {
          text: alertTwoButtonInfo.positiveButtonTitle,
          handler: alertTwoButtonInfo.positiveButtonHandler,
        },
      ],
    });
    alert.present();
  }

  async presentThreeButtonAlert(alertThreeButtonInfo) {
    const alert = await this.alertCtrl.create({
      header: alertThreeButtonInfo.title,
      message: alertThreeButtonInfo.message,
      backdropDismiss: false,
      buttons: [
        {
          text: alertThreeButtonInfo.negativeButtonTitle,
          role: 'cancel',
          handler: alertThreeButtonInfo.negativeButtonHandler,
        },
        {
          text: alertThreeButtonInfo.indifferentButtonTitle,
          handler: alertThreeButtonInfo.indifferentButtonHandler,
        },
        {
          text: alertThreeButtonInfo.positiveButtonTitle,
          handler: alertThreeButtonInfo.positiveButtonHandler,
        },
      ],
    });
    alert.present();
  }

  // XXX - remove after rewrite all the places where it was used to. Current version of this functionality LoadingService
  private async showLoader(loaderInfo: any) {
    if (loaderInfo.bShow) {
      if (!this.loader) {
        this.loader = await this.loadCtrl.create({
          message: loaderInfo.message,
        });
        this.loader.present();
      }
    } else {
      if (this.loader) {
        this.loader.dismiss();
        this.loader = null;
      }
    }
  }
}

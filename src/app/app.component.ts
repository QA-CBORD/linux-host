import { Component, OnDestroy } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Events, LoadingController, Platform, PopoverController } from '@ionic/angular';

import { Router } from '@angular/router';
import * as Globals from './app.global';
import { DataCache } from './core/utils/data-cache';
import { from, of, fromEvent, Subscription } from 'rxjs';
import { switchMap, tap, take, map } from 'rxjs/operators';
import { Environment } from './environment';
import { NAVIGATE } from './app.global';
import { TestProvider } from './core/provider/test-provider/test.provider';
import { AuthService } from './core/service/auth-service/auth.service';
import { UserService } from './core/service/user-service/user.service';
import { BUTTON_TYPE } from './core/utils/buttons.config';
import { StGlobalPopoverComponent } from './shared/ui-components/st-global-popover';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnDestroy {
  private readonly EVENT_APP_PAUSE = 'event.apppause';
  private readonly EVENT_APP_RESUME = 'event.appresume';
  private readonly sourceSubscription: Subscription = new Subscription();
  private sessionToken: string = null;
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
    private readonly userService: UserService,
    private readonly popoverCtrl: PopoverController
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
        Environment.setEnvironmentViaURL(location.href);
        this.parseHashParameters(hash);

        /// now perform normal page logic
        // this.handleSessionToken();

        this.testGetSession();
      });
    this.sourceSubscription.add(subscription);
  }

  private testGetSession() {
    const subscription = this.testProvider.getTestUser().subscribe(
      () => {
        this.destinationPage = NAVIGATE.accounts;
        this.getUserInfo();
      },
      error => {
        this.modalHandler(
          { ...error, title: 'Error getting test user', isRetryBtnExist: true },
          this.testGetSession.bind(this)
        );
      }
    );

    this.sourceSubscription.add(subscription);
  }

  /**
   * Get hash parameters from url
   */
  private parseHashParameters(urlString: string) {
    const hashParameters: string[] = urlString.split('/');
    const destinationPage = hashParameters[3] as NAVIGATE;
    const existsInNavigate = Object.values(NAVIGATE).some(route => route === destinationPage);

    if (existsInNavigate) {
      DataCache.setWebInitiValues(hashParameters[2] || null, destinationPage);
      this.sessionToken = hashParameters[2];
      this.destinationPage = destinationPage;
    }

    this.cleanUrlAfterGetInfo();
  }

  private cleanUrlAfterGetInfo() {
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
              const error = {
                title: Globals.Exception.Strings.TITLE,
                message: 'We were unable to verify your credentials',
                isRetryBtnExist: true,
              };
              this.modalHandler(error, this.handleSessionToken.bind(this));
              return;
            }
            /// set session id for services base and get the user info for caching
            DataCache.setSessionId(newSessionId);
            this.getUserInfo();
          },
          () => {
            const exceptionObj = {
              title: Globals.Exception.Strings.TITLE,
              message: 'We were unable to verify your credentials',
              isRetryBtnExist: true,
            };
            this.modalHandler(exceptionObj, this.handleSessionToken.bind(this));
          }
        );
    } else {
      /// no session sharing token sent via URL
      /// show no session error or redirect back natively or something
      /// use proper method to parse the message and determine proper message
      const exceptionObj = {
        title: Globals.Exception.Strings.TITLE,
        message: 'Handling session response and the session data is null',
        isRetryBtnExist: false,
      };
      this.modalHandler(exceptionObj, this.handleSessionToken.bind(this));
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
        () => {
          const exceptionObj = {
            title: Globals.Exception.Strings.TITLE,
            message: 'Unable to verify your user information',
            isRetryBtnExist: true,
          };
          this.modalHandler(exceptionObj, this.handleSessionToken.bind(this));
        }
      );
  }

  private handlePageNavigation() {
    this.router.navigate([this.destinationPage], { skipLocationChange: true });
  }

  // Ionic gloabal configurate stuff
  private setupAppStateEvent() {
    const pauseSubscription = this.platform.pause.subscribe(() => this.events.publish(this.EVENT_APP_PAUSE, null));
    const resumeSubscription = this.platform.resume.subscribe(() => this.events.publish(this.EVENT_APP_RESUME, null));

    this.sourceSubscription.add(pauseSubscription);
    this.sourceSubscription.add(resumeSubscription);
  }

  private subscribeToEvents() {
    const loaderSubscription = this.events.subscribe(Globals.Events.LOADER_SHOW, loaderInfo =>
      this.showLoader(loaderInfo)
    );

    this.sourceSubscription.add(loaderSubscription);
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

  private async modalHandler(res, cb) {
    const popover = await this.popoverCtrl.create({
      component: StGlobalPopoverComponent,
      componentProps: {
        data: res,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.CLOSE) {
        //TODO: this.platform.exitApp();
      }

      if (role === BUTTON_TYPE.RETRY) {
        cb();
      }
    });

    return await popover.present();
  }
}

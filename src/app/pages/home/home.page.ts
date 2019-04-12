import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Events, Platform } from '@ionic/angular';

import { DataCache } from '../../core/utils/data-cache';
import { Logger } from '../../core/utils/logger';
import { Environment } from '../../environment';

import { AuthService } from '../../core/service/auth-service/auth.service';
import { UserService } from '../../core/service/user-service/user.service';

import { ExceptionProvider } from '../../core/provider/exception-provider/exception.provider';

import * as Globals from '../../app.global';
import { TestProvider } from '../../core/provider/test-provider/test.provider';

export enum EDestination {
  NONE = 'none',
  MOBILE_ACCESS = 'openmydoor',
  SECURE_MESSAGING = 'securemessaging',
  REWARDS = 'rewards',
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sessionToken: string = null;
  destinationPage: EDestination = EDestination.NONE;

  constructor(
    private platform: Platform,
    private router: Router,
    private events: Events,
    private authService: AuthService,
    private userService: UserService,
    private testProvider: TestProvider
  ) {
    this.platform.ready().then(() => {
      /// Set logger enabled based on env
      Logger.setLoggingEnabled(Environment.isDevelopmentEnvironment(location.href));
      /// use page url to determine current environment
      Environment.setEnvironmentViaURL(location.href);

      /// get parameters from url
      // this.getHashParameters();
      /// now perform normal page logic
      // this.handleSessionToken();

      this.testGetSession();
    });
  }

  private testGetSession() {
    this.testProvider.getTestUser().subscribe(
      success => {
        this.destinationPage = EDestination.MOBILE_ACCESS;
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

  /**
   * Get hash parameters from url
   */
  private getHashParameters() {
    /// get required params from the URL
    this.sessionToken = DataCache.getUrlSession() || null;
    this.destinationPage = DataCache.getDestinationPage() || null;
  }

  /**
   *  Handle the 'Session Sharing' session token provided from the native applications to acquire a new session id
   *
   */
  private handleSessionToken() {
    if (this.sessionToken) {
      /// acquire the new session id with the session token
      this.authService.authenticateSessionToken(this.sessionToken).subscribe(
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
    this.userService.getUser().subscribe(
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

  /**
   *  Navigate user to the destination page after session id has been retrieved
   */
  private handlePageNavigation() {
    switch (this.destinationPage) {
      case EDestination.REWARDS:
        this.router.navigate(['rewards']);
        break;
      case EDestination.MOBILE_ACCESS:
        this.router.navigate(['mobile-access'], {
          replaceUrl: true,
          skipLocationChange: true,
        });
        break;
      case EDestination.SECURE_MESSAGING:
        this.router.navigate(['secure-message'], {
          replaceUrl: true,
          skipLocationChange: true,
        });
        break;
    }
  }
}

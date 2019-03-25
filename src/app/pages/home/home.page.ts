import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { Router } from '@angular/router';

import { Logger } from '../../utils/logger';
import { Environment } from '../../environment';
import { DataCache } from '../../utils/data-cache';

import { AuthService } from '.././../services/auth-service/auth.service';
import { UserService } from '../../services/user-service/user.service';

import { ExceptionProvider } from '../../provider/exception-provider/exception.provider';

import * as Globals from '../../app.global';
import { TestProvider } from 'src/app/provider/test-provider/test.provider';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  sessionToken: string = null;
  destinationPage: string = null;

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
      ((success) => {
        this.destinationPage = 'securemessaging';
        this.getUserInfo();
      }),
      ((error) => {
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
            }
          }
        });
      })
    );
  }

  /**
   * Get hash parameters from url
   */
  private getHashParameters() {

    const hashParameters: string[] = location.hash.split('/');

    /// get required params from the URL
    this.sessionToken = hashParameters[2] || null;
    this.destinationPage = hashParameters[3] || null;
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
          title: Globals.Exception.Strings.TITLE,
          message: 'Handling session response and the session data is null',
          positiveButtonTitle: 'CLOSE',
          positiveButtonHandler: () => {
            // TODO: this.platform.exitApp();
          }
        }
      });
    }
  }

  private getUserInfo() {
    this.userService.getUser().subscribe(
      (data) => {
        DataCache.setUserInfo(data);
        this.handlePageNavigation();
      },
      (error) => {
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
            }
          }
        });
      }
    );
  }

  /**
   *  Navigate user to the destination page after session id has been retrieved
   */
  private handlePageNavigation() {

    /// default to "Mobile Access" page if no destination page value exists
    /// this should never happen
    /// should be handled better
    if (this.destinationPage == null) {
      this.destinationPage = 'securemessaging';
    }


    switch (this.destinationPage) {
      case 'rewards':
      this.router.navigate(['rewards']);
        break;
      case 'openmydoor':
        this.router.navigate(['mobile-access']);
        break;
      case 'securemessaging':
      this.router.navigate(['secure-message']);
        break;

    }
  }

}

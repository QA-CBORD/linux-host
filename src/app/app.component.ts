import {AfterViewInit, Component} from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Events, LoadingController, Platform } from '@ionic/angular';

import { Router } from '@angular/router';
import * as Globals from './app.global';
import { ExceptionPayload } from './core/model/exception/exception.model';
import { DataCache } from './core/utils/data-cache';
import { EDestination } from './pages/home/home.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements AfterViewInit{
  private readonly EVENT_APP_PAUSE = 'event.apppause';
  private readonly EVENT_APP_RESUME = 'event.appresume';

  private loader;

  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events: Events,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.setupAppStateEvent();
      this.subscribeToEvents();
      this.getHashParameters();
      this.router.navigate(['home'], { skipLocationChange: true });
    });
  }

  ngAfterViewInit() {
    function receiveMessage(event) {
      event.source.postMessage("hi there yourself!  the secret response ",
          '*');
    }

    window.addEventListener("message", receiveMessage, false);
  }

  /**
   * Get hash parameters from url
   */
  private getHashParameters() {
    const hashParameters: string[] = location.hash.split('/');
    const destinationPageString = hashParameters[3];
    let destinationPage = EDestination.NONE;

    if (destinationPageString === EDestination.MOBILE_ACCESS) {
      destinationPage = EDestination.MOBILE_ACCESS;
    } else if (destinationPageString === EDestination.REWARDS) {
      destinationPage = EDestination.REWARDS;
    } else if (destinationPageString === EDestination.SECURE_MESSAGING) {
      destinationPage = EDestination.SECURE_MESSAGING;
    }

    console.log('app init');
    console.log(localStorage.getItem('ion_nav'));
    // if (sessionStorage.getItem('ion_nav')) {
    //   console.log(JSON.parse(sessionStorage.getItem('ion_nav')));
    // }
    /// get required params from the URL
    DataCache.setWebInitiValues(hashParameters[2] || null, destinationPage);
  }

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

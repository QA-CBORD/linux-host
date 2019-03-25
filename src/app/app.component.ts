import { Component } from '@angular/core';

import { Platform, Events, LoadingController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import * as Globals from './app.global';
import { ExceptionPayload } from './models/exception/exception-interface';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public static readonly EVENT_APP_PAUSE = 'event.apppause';
  public static readonly EVENT_APP_RESUME = 'event.appresume';

  private loader;

  constructor(
    private platform: Platform,
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
    });
  }

  private setupAppStateEvent() {
    this.platform.pause.subscribe(() => {
      this.events.publish(AppComponent.EVENT_APP_PAUSE, null);
    });
    this.platform.resume.subscribe(() => {
      this.events.publish(AppComponent.EVENT_APP_RESUME, null);
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

  public async presentOneButtonAlert(alertOneButtonInfo) {

    const alert = await this.alertCtrl.create({
      header: alertOneButtonInfo.title,
      message: alertOneButtonInfo.message,
      backdropDismiss: false,
      buttons: [
        {
          text: alertOneButtonInfo.positiveButtonTitle,
          handler: alertOneButtonInfo.positiveButtonHandler
        }
      ]
    });
    alert.present();
  }

  public async presentTwoButtonAlert(alertTwoButtonInfo) {

    const alert = await this.alertCtrl.create({
      header: alertTwoButtonInfo.title,
      message: alertTwoButtonInfo.message,
      backdropDismiss: false,
      buttons: [
        {
          text: alertTwoButtonInfo.negativeButtonTitle,
          role: 'cancel',
          handler: alertTwoButtonInfo.negativeButtonHandler
        },
        {

          text: alertTwoButtonInfo.positiveButtonTitle,
          handler: alertTwoButtonInfo.positiveButtonHandler

        }
      ]
    });
    alert.present();
  }

  public async presentThreeButtonAlert(alertThreeButtonInfo) {

    const alert = await this.alertCtrl.create({
      header: alertThreeButtonInfo.title,
      message: alertThreeButtonInfo.message,
      backdropDismiss: false,
      buttons: [
        {
          text: alertThreeButtonInfo.negativeButtonTitle,
          role: 'cancel',
          handler: alertThreeButtonInfo.negativeButtonHandler
        },
        {
          text: alertThreeButtonInfo.indifferentButtonTitle,
          handler: alertThreeButtonInfo.indifferentButtonHandler
        },
        {
          text: alertThreeButtonInfo.positiveButtonTitle,
          handler: alertThreeButtonInfo.positiveButtonHandler
        }
      ]
    });
    alert.present();
  }

  private async showLoader(loaderInfo: any) {
    if (loaderInfo.bShow) {
      if (!this.loader) {
        this.loader = await this.loadCtrl.create(
          {
            message: loaderInfo.message
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

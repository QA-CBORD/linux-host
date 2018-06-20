import { OpenMyDoorModalPage } from './../pages/open-my-door-modal/open-my-door-modal';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { GETService } from '../providers/get-service/get-service';
import { AuthService } from '../providers/auth-service/auth-service';
import { InstService } from '../providers/inst-service/inst-service';
import { SessionService } from '../providers/session-service/session-service';
import { RewardService } from '../providers/reward-service/reward-service';
import { DataCache } from '../providers/data-cache/data-cache';

import { RewardsDataManager } from '../providers/reward-data-manager/reward-data-manager';
import { ContentServiceProvider } from '../providers/content-service/content-service';
import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';
import { ExceptionManager } from '../providers/exception-manager/exception-manager';
import { OpenMyDoorService } from '../providers/open-my-door/open-my-door-service';
import { OpenMyDoorDataManager } from '../providers/open-my-door-data-manager/open-my-door-data-manager';
import { OpenMyDoorModalPageModule } from '../pages/open-my-door-modal/open-my-door-modal.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    SideMenuContentComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  }),
  OpenMyDoorModalPageModule
],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    OpenMyDoorModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ExceptionManager,
    SessionService,
    GETService,
    AuthService,
    InstService,
    RewardService,
    RewardsDataManager,
    OpenMyDoorService,
    OpenMyDoorDataManager,
    ContentServiceProvider,
    DataCache,
    ExceptionManager,
    Geolocation
  ]
})
export class AppModule {}

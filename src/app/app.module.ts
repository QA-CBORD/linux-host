
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { MyApp } from './app.component';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { QRCodeModule } from 'angular2-qrcode';
import { QRCodeComponent } from 'angular2-qrcode';

import { GETService } from '../providers/get-service/get-service';
import { AuthService } from '../providers/auth-service/auth-service';
import { InstService } from '../providers/inst-service/inst-service';
import { SessionService } from '../providers/session-service/session-service';
import { RewardService } from '../providers/reward-service/reward-service';
import { DataCache } from '../providers/data-cache/data-cache';

import { RewardsDataManager } from '../providers/rewards-data-manager/rewards-data-manager';
import { ContentServiceProvider } from '../providers/content-service/content-service';
import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';
import { ExceptionManager } from '../providers/exception-manager/exception-manager';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    SideMenuContentComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    QRCodeModule,
    QRCodeComponent,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  }),
],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp
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
    ContentServiceProvider,
    DataCache,
    ExceptionManager
  ]
})
export class AppModule {}

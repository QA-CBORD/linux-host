
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { QRCodeModule } from 'angular2-qrcode';
import { AppVersion } from '@ionic-native/app-version';

/// SERVICES
import { APIService } from '../services/api-service/api-service'
import { GETService } from '../services/get-service/get-service';
import { AuthService } from '../services/auth-service/auth-service';
import { InstService } from '../services/inst-service/inst-service';
import { SessionService } from '../services/session-service/session-service';
import { RewardService } from '../services/reward-service/reward-service';
import { ContentService } from '../services/content-service/content-service';
import { MobileAccessService } from '../services/mobile-access-service/mobile-access-service';
import { SecureMessagingService } from './../services/secure-messaging-service/secure-messaging-service';
import { UserService } from '../services/user-service/user-service';


/// PROVIDERS
import { MobileAccessProvider } from './../providers/mobile-access-provider/mobile-access-provider';
import { RewardsProvider } from '../providers/reward-provider/reward-provider';
import { ExceptionProvider } from '../providers/exception-provider/exception-provider';
import { SecureMessagingProvider } from '../providers/secure-messaging-provider/secure-messaging-provider';
import { AccountsProvider } from '../providers/accounts-provider/accounts-provider';
import { TestUserProvider } from '../providers/test-user-provider/test-user-provider';

/// UTILITY
import { DataCache } from '../utility/data-cache/data-cache';

/// PAGES
import { MobileAccessModalPage } from './../pages/mobile-access-modal/mobile-access-modal';
import { MobileAccessModalPageModule } from './../pages/mobile-access-modal/mobile-access-modal.module';
import { RewardDetailsModalPage } from './../pages/reward-details-modal/reward-details-modal';
import { RewardDetailsModalPageModule } from '../pages/reward-details-modal/reward-details-modal.module';

import { HomePage } from './../pages/home/home';
import { SecureMessagingPage } from './../pages/secure-messaging/secure-messaging';
import { RewardsPage } from './../pages/rewards/rewards';
import { MobileAccessPage } from '../pages/mobile-access/mobile-access';


/// COMPONENTS
import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';
import { AccordionListContentComponent } from '../shared/accordion-list/accordionlist-content.component';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    SideMenuContentComponent,
    AccordionListContentComponent,
    HomePage,
    SecureMessagingPage,
    RewardsPage,
    MobileAccessPage
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
    QRCodeModule,
    MobileAccessModalPageModule,
    RewardDetailsModalPageModule
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    MobileAccessModalPage,
    RewardDetailsModalPage,
    HomePage,
    SecureMessagingPage,
    RewardsPage,
    MobileAccessPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppVersion,
    DatePipe,
    ExceptionProvider,
    SessionService,
    APIService,
    GETService,
    AuthService,
    InstService,
    RewardService,
    UserService,
    SecureMessagingService,
    RewardsProvider,
    MobileAccessService,
    MobileAccessProvider,
    SecureMessagingProvider,
    ContentService,
    DataCache,
    ExceptionProvider,
    Geolocation,
    Diagnostic,
    AndroidPermissions,
    AccountsProvider,
    TestUserProvider
  ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { MyApp } from './app.component';
// import { IonicStorageModule } from '@ionic/storage';

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

/// PROVIDERS
import { MobileAccessProvider } from './../providers/mobile-access-provider/mobile-access-provider';
import { RewardsProvider } from '../providers/reward-provider/reward-provider';
import { ExceptionProvider } from '../providers/exception-provider/exception-provider';

/// UTILITY
import { DataCache } from '../utility/data-cache/data-cache';

/// PAGES
import { MobileAccessModalPage } from './../pages/mobile-access-modal/mobile-access-modal';
import { MobileAccessModalPageModule } from './../pages/mobile-access-modal/mobile-access-modal.module';

/// COMPONENTS
import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';
import { AccountsProvider } from '../providers/accounts-provider/accounts-provider';
import { TestUserProvider } from '../providers/test-user/test-user';



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
    // IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MobileAccessModalPageModule
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    MobileAccessModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ExceptionProvider,
    SessionService,
    APIService,
    GETService,
    AuthService,
    InstService,
    RewardService,
    SecureMessagingService,
    RewardsProvider,
    MobileAccessService,
    MobileAccessProvider,
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

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicRouteStrategy } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { SelectivePreloadingStrategy } from './preload-strategy/selective-preloading-strategy';
import { BaseInterceptor } from '@core/interceptors/base.interceptor';
import { ServerError } from '@core/interceptors/server-error.interceptor';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AccessCardService } from '@sections/dashboard/containers/access-card/services/access-card.service';
import { MobileCredentialModule } from '@shared/ui-components/mobile-credentials/mobile.credential.module';
import { RegistrationModule } from '../non-authorized/pages/registration/registration.module';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

const imports = [CommonModule, BrowserModule, HttpClientModule, MobileCredentialModule, RegistrationModule];

const providers = [
  SelectivePreloadingStrategy,
  StatusBar,
  SplashScreen,
  ScreenOrientation,
  { provide: HTTP_INTERCEPTORS, useClass: ServerError, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true },
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  DatePipe,
  InAppBrowser,
  AccessCardService,
  AndroidPermissions
];

@NgModule({
  imports,
  providers,
})
export class CoreModule {}

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicRouteStrategy } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SelectivePreloadingStrategy } from './preload-strategy/selective-preloading-strategy';
import { BaseInterceptor } from '@core/interceptors/base.interceptor';
import { ServerError } from '@core/interceptors/server-error.interceptor';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AccessCardService } from '@sections/dashboard/containers/access-card/services/access-card.service';

const imports = [CommonModule, BrowserModule, HttpClientModule];

const providers = [
  SelectivePreloadingStrategy,
  StatusBar,
  SplashScreen,
  { provide: HTTP_INTERCEPTORS, useClass: ServerError, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true },
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  DatePipe,
  BarcodeScanner,
  InAppBrowser,
  AccessCardService
];

@NgModule({
  imports,
  providers,
})
export class CoreModule {}

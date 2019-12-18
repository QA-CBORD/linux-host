import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Network } from '@ionic-native/network/ngx';
import { HttpClientModule } from '@angular/common/http';
import { IonicRouteStrategy } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SelectivePreloadingStrategy } from './preload-strategy/selective-preloading-strategy';

const imports = [CommonModule, BrowserModule, HttpClientModule];

const providers = [
  SelectivePreloadingStrategy,
  StatusBar,
  SplashScreen,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  Network,
  DatePipe,
  Keyboard,
  BarcodeScanner,
  Geolocation,
];

@NgModule({
  imports,
  providers,
})
export class CoreModule {}

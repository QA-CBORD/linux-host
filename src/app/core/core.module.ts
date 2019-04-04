import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { RouteReuseStrategy } from "@angular/router";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { HttpClientModule } from "@angular/common/http";
import { IonicRouteStrategy } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';

const imports = [
    CommonModule,
    BrowserModule,
    HttpClientModule
];

const providers = [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePipe,
    Keyboard
];

@NgModule({
    imports,
    providers
})
export class CoreModule {
}

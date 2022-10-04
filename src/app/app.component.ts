import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import {StatusBar} from '@capacitor/status-bar';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  preserveWhitespaces: true,
})
export class AppComponent implements OnInit {
  
  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly screenOrientation: ScreenOrientation
  ) {}

  ngOnInit(): void {
    this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    await this.platform.ready();
    this.splashScreen.hide();
    if (this.platform.is('android')) {
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.setBackgroundColor({ color: '#FFFFFF' });
    }
    if (this.platform.is('cordova')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { TranslateFacadeService } from '@core/facades/translate/translate.facade.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  preserveWhitespaces: true,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly platform: Platform,
    private readonly translateFacadeService: TranslateFacadeService
  ) {}

  ngOnInit(): void {
    this.initializeApp();
    this.translateFacadeService.listenForContentStringStateChanges();
  }

  private async initializeApp(): Promise<void> {
    await this.platform.ready();
    if (this.platform.is('android')) {
      StatusBar.setOverlaysWebView({ overlay: false });
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: '#FFFFFF' });
    }
  }
}

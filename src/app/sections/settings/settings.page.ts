import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_ROUTING, SETTINGS_CONFIG } from '@sections/settings/settings.config';
import { PATRON_NAVIGATION } from '../../app.global';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { SettingItemConfig, SettingsSectionConfig } from './models/setting-items-config.model';
import { Plugins } from '@capacitor/core';
import { SettingsFactoryService } from './services/settings-factory.service';
import { Observable } from 'rxjs';
const { Device } = Plugins;

@Component({
  selector: 'st-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})
export class SettingsPage implements OnInit {
  settingSections$: Observable<SettingsSectionConfig[]>;
  appVersion = '';
  constructor(
    private router: Router,
    private readonly sessionFacadeService: SessionFacadeService,
    private settingsFactory: SettingsFactoryService
  ) {}

  ngOnInit() {
    this.settingSections$ = this.settingsFactory.getSettings();
    this.getAppVersion().then(appVersion => (this.appVersion = appVersion));
  }

  //couldnt get photo upload route to work correctly, still trying to fix
  navigateToPhotoUpload() {
    this.router.navigate([PATRON_NAVIGATION.settings, LOCAL_ROUTING.photoUpload]);
  }

  settingTap(setting: SettingItemConfig) {
    if (setting.navigate) {
      this.router.navigate([PATRON_NAVIGATION.settings, setting.navigate]);
    }
  }
  logout() {
    this.sessionFacadeService.logoutUser();
  }
  async getAppVersion(): Promise<string> {
    const deviceInfo = await Device.getInfo();
    return deviceInfo.appVersion;
  }
}

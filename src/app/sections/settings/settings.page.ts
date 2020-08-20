import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_ROUTING } from '@sections/settings/settings.config';
import { PATRON_NAVIGATION } from '../../app.global';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { SettingItemConfig, SettingsSectionConfig, ModalContent } from './models/setting-items-config.model';
import { Plugins } from '@capacitor/core';
import { SettingsFactoryService } from './services/settings-factory.service';
import { ModalController } from '@ionic/angular';
import { map, take } from 'rxjs/operators';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
const { Device } = Plugins;

@Component({
  selector: 'st-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})
export class SettingsPage implements OnInit {
  settingSections: Promise<SettingsSectionConfig[]>;
  appVersion = '';

  constructor(
    private router: Router,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly modalController: ModalController,
    private readonly contentStringFacadeService: ContentStringsFacadeService,
    private readonly settingsFactory: SettingsFactoryService,
    private readonly globalNav: GlobalNavService
  ) {}

  ngOnInit() {
    this.settingSections = this.settingsFactory.getSettings();
    this.getAppVersion().then(appVersion => (this.appVersion = appVersion));
  }

  //couldnt get photo upload route to work correctly, still trying to fix
  navigateToPhotoUpload() {
    this.router.navigate([PATRON_NAVIGATION.settings, LOCAL_ROUTING.photoUpload]);
  }

  settingTap(setting: SettingItemConfig) {
    !setting.navigateExternal &&
      setting.navigate &&
      this.router.navigate([PATRON_NAVIGATION.settings, setting.navigate]);

    setting.navigateExternal && setting.navigate && this.openSiteURL(setting.navigate);

    setting.modalContent && this.openModal(setting.modalContent);
  }
  logout() {
    this.sessionFacadeService.logoutUser();
  }
  async getAppVersion(): Promise<string> {
    const deviceInfo = await Device.getInfo();
    return deviceInfo.appVersion;
  }

  async openSiteURL(url: string): Promise<void> {
    window.open(url, '_system');
  }

  async openModal(modalContent: ModalContent) {
    const { domain, category, name } = modalContent;
    const string = await this.contentStringFacadeService
      .fetchContentString$(domain, category, name)
      .pipe(
        map(st => st.value),
        take(1)
      )
      .toPromise();
    const buttons = [
      {
        label: 'Close',
        callback: () => {
          this.globalNav.showNavBar();
          this.modalController.dismiss();
        },
      },
    ];
    const componentProps = { htmlContent: string, buttons };
    const settingModal = await this.modalController.create({
      backdropDismiss: false,
      component: modalContent.component,
      componentProps,
    });
    this.globalNav.hideNavBar();
    await settingModal.present();
  }
}

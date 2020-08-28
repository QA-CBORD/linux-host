import { Injectable } from '@angular/core';
import { merge, Observable, of, zip } from 'rxjs';
import {
  SettingItemConfig,
  SETTINGS_VALIDATIONS,
  SettingsSectionConfig,
  SettingsServices,
} from '../models/setting-items-config.model';
import { SETTINGS_CONFIG } from '../settings.config';
import { catchError, map, reduce, take } from 'rxjs/operators';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from 'src/app/app.global';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { IdentityService } from '@core/service/identity/identity.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { ModalController } from '@ionic/angular';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import Setting = Settings.Setting;
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable()
export class SettingsFactoryService {
  services: SettingsServices = {
    authService: this.authFacadeService,
    identity: this.identityFacadeService,
    userService: this.userFacadeService,
    globalNav: this.globalNav,
    modalController: this.modalController,
    contentString: this.contentStringFacadeService,
    settings: this.settingsFacade,
    institution: this.institutionFacadeService,
    environment: this.environmentFacadeService,
    appBrowser: this.appBrowser,
  };

  constructor(
    private readonly authFacadeService: AuthFacadeService,
    private readonly settingsFacade: SettingsFacadeService,
    private readonly identityService: IdentityService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly contentStringFacadeService: ContentStringsFacadeService,
    private readonly globalNav: GlobalNavService,
    private readonly appBrowser: InAppBrowser,
    private readonly modalController: ModalController
  ) {}

  async getSettings(): Promise<SettingsSectionConfig[]> {
    const parsedSettings: SettingsSectionConfig[] = [...SETTINGS_CONFIG];
    for (let sectionIndex = 0; sectionIndex < parsedSettings.length; sectionIndex++) {
      const section = parsedSettings[sectionIndex];
      const promises = [];
      const hiddenSettings: { [key: string]: Boolean } = {};
      for (let settingIndex = 0; settingIndex < section.items.length; settingIndex++) {
        const setting = section.items[settingIndex];
        promises.push(
          this.checkDisplayOption(setting).then(enabled => {
            if (enabled) {
              setting.setToggleStatus && setting.setToggleStatus(this.services);
              setting.setCallback && setting.setCallback(this.services);
            } else hiddenSettings[setting.id] = true;
          })
        );
      }

      await Promise.all(promises);
      section.items = section.items.filter(setting => !hiddenSettings[setting.id]);
      section.items.length === 0 && parsedSettings.splice(sectionIndex, 1) && sectionIndex--;
    }
    return parsedSettings;
  }

  private checkDisplayOption(setting: SettingItemConfig): Promise<boolean> {
    if (setting.validations) {
      const validations$ = [];
      for (const validation of setting.validations) {
        if (validation.type === SETTINGS_VALIDATIONS.SettingEnable) {
          validations$.push(
            this.settingsFacade.getSetting(validation.value as Settings.Setting).pipe(
              map(({ value }): boolean => parseInt(value) === 1),
              take(1)
            )
          );
        } else if (validation.type === SETTINGS_VALIDATIONS.Biometric) {
          validations$.push(
            this.availableBiometricHardware$.pipe(
              map((biometrics): boolean => biometrics && biometrics.some(cap => cap === validation.value)),
              take(1)
            )
          );
        }
      }
      return merge(...validations$)
        .pipe(
          reduce((acc: boolean, val: boolean): boolean => acc && val),
          take(1)
        )
        .toPromise();
    }
    return of(true).toPromise();
  }
  
  get availableBiometricHardware$(): Observable<string[]> {
    return this.identityService.getAvailableBiometricHardware().pipe(take(1));
  }

  get photoUploadEnabled$(): Observable<boolean> {
    return this.settingsFacade.getSetting(Setting.PHOTO_UPLOAD_ENABLED).pipe(
      map(setting => Boolean(JSON.parse(setting.value))),
      take(1),
      catchError(() => of(false))
    );
  }
}

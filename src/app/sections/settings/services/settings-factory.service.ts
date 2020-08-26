import { Injectable } from '@angular/core';
import { of, merge, pipe, Observable } from 'rxjs';
import {
  SettingsSectionConfig,
  SettingItemConfig,
  SETTINGS_VALIDATIONS,
  SettingsServices,
} from '../models/setting-items-config.model';
import { SETTINGS_CONFIG, SETTINGS_ID } from '../settings.config';
import { take, map, reduce } from 'rxjs/operators';
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

@Injectable()
export class SettingsFactoryService {
  services: SettingsServices = {
    identity: this.identityFacadeService,
    userService: this.userFacadeService,
    globalNav: this.globalNav,
    modalController: this.modalController,
    contentString: this.contentStringFacadeService,
    settings: this.settingsFacade,
    institution: this.institutionFacadeService,
    environment: this.environmentFacadeService,
  };

  constructor(
    private readonly settingsFacade: SettingsFacadeService,
    private readonly identityService: IdentityService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly contentStringFacadeService: ContentStringsFacadeService,
    private readonly globalNav: GlobalNavService,
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
              setting.navigateExternal && this.setExternalURL(setting);
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

  private async setExternalURL(setting: SettingItemConfig) {
    let linkPromise: Promise<string>;
    const resource = setting.navigateExternal;
    if (resource.type === 'email') {
      linkPromise = this.settingsFacade
        .getSetting(resource.value as Settings.Setting)
        .pipe(
          map(emailSetting => 'mailto:' + emailSetting.value),
          take(1)
        )
        .toPromise();
    }
    if (resource.type === 'link') {
      linkPromise = this.institutionFacadeService.cachedInstitutionInfo$
        .pipe(
          map(inst => `${this.environmentFacadeService.getSitesURL()}/${inst.shortName}/full/${resource.value}`),
          take(1)
        )
        .toPromise();
    }
    setting.navigate = await linkPromise;
  }

  get availableBiometricHardware$(): Observable<string[]> {
    return this.identityService.getAvailableBiometricHardware().pipe(take(1));
  }
}

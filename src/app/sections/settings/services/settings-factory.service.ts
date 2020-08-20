import { Injectable } from '@angular/core';
import { of, merge, pipe } from 'rxjs';
import { SettingsSectionConfig, SettingItemConfig, SETTINGS_VALIDATIONS } from '../models/setting-items-config.model';
import { SETTINGS_CONFIG, SETTINGS_ID } from '../settings.config';
import { take, map, reduce } from 'rxjs/operators';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from 'src/app/app.global';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';

@Injectable()
export class SettingsFactoryService {
  SETTINGS_TOGGLE_SERVICES = {
    [SETTINGS_ID.lostCard]: this.userFacadeService,
  };

  constructor(
    private readonly settingsFacade: SettingsFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly userFacadeService: UserFacadeService
  ) {}

  async getSettings(): Promise<SettingsSectionConfig[]> {
    const parsedSettings: SettingsSectionConfig[] = [];
    for (const section of [...SETTINGS_CONFIG]) {
      const promises = [];
      const parsedSetting = { ...section };
      parsedSetting.items = [];

      for (const setting of section.items) {
        promises.push(
          this.checkDisplayOption(setting).then(enabled => {
            if (enabled) {
              parsedSetting.items.push(setting);
              this.setToggleStatus(setting);
              setting.navigateExternal && this.setExternalURL(setting);
            }
          })
        );
      }

      await Promise.all(promises);
      if (parsedSetting.items.length) {
        parsedSettings.push(parsedSetting);
      }
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
          // TODO: Implement observable.
          validations$.push(
            this.identityFacadeService.availableBiometricHardware$.then(
              (biometrics): boolean => biometrics && biometrics.some(cap => cap === validation.value)
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

  private async setToggleStatus(setting: SettingItemConfig): Promise<boolean> {
    if (setting.getToggleStatus) {
      setting.checked = await setting.getToggleStatus(this.SETTINGS_TOGGLE_SERVICES[setting.id]);
      setting.label = setting.checked ? setting.toggleLabel.checked : setting.toggleLabel.unchecked;
    }
    return true;
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
}

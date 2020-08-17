import { Injectable } from '@angular/core';
import { BehaviorSubject, of, merge } from 'rxjs';
import { SettingsSectionConfig, SettingItemConfig, SETTINGS_VALIDATIONS } from '../models/setting-items-config.model';
import { SETTINGS_CONFIG, SETTINGS_ID } from '../settings.config';
import { take, map, tap, reduce } from 'rxjs/operators';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from 'src/app/app.global';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';

@Injectable()
export class SettingsFactoryService {
  SETTINGS_TOGGLE_SERVICES = {
    [SETTINGS_ID.lostCard]: this.userFacadeService,
  };

  constructor(
    private settingsFacade: SettingsFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
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
          this.checkDisplayOption(setting).then(
            enabled => enabled && parsedSetting.items.push(setting) && this.setToggleStatus(setting)
          )
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
          validations$.push(
            this.identityFacadeService.availableBiometricHardware$.pipe(
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

  private async setToggleStatus(setting: SettingItemConfig): Promise<boolean> {
    if (setting.getToggleStatus) {
      setting.checked = await setting.getToggleStatus(this.SETTINGS_TOGGLE_SERVICES[setting.id]);
      setting.label = setting.checked ? setting.toggleLabel.checked : setting.toggleLabel.unchecked;
    }
    return true;
  }
}

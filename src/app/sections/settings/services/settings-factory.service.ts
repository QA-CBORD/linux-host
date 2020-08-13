import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SettingsSectionConfig, SettingItemConfig } from '../models/setting-items-config.model';
import { SETTINGS_CONFIG } from '../settings.config';
import { take, map, tap } from 'rxjs/operators';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Injectable()
export class SettingsFactoryService {
  protected readonly _state$: BehaviorSubject<SettingsSectionConfig[]> = new BehaviorSubject<SettingsSectionConfig[]>([
    ...SETTINGS_CONFIG,
  ]);

  constructor(private settingsFacade: SettingsFacadeService) {}

  getSettings() {
    return this._state$.pipe(
      map((settings: SettingsSectionConfig[]) => {
        settings.forEach(section => {
          section.items.forEach(setting => this.createSettingOption(setting));
          section.visible = section.items.some(s => s.visible === true);
        });
        return settings;
      }),
      take(1)
    );
  }

  private async createSettingOption(setting: SettingItemConfig) {
    if (setting.settingKey) {
      setting.visible = await this.settingsFacade
        .getSetting(setting.settingKey)
        .pipe(
          map(({ value }) => parseInt(value) === 1),
          take(1)
        )
        .toPromise();
    } else {
      setting.visible = true;
    }
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SettingInfoList } from 'src/app/core/model/configuration/setting-info-list.model';
import { Settings } from 'src/app/app.global';
import { TILES_BASE_CONFIG, TILES_ID } from '@sections/dashboard/dashboard.config';
import { parseArrayFromString } from '@core/utils/general-helpers';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Injectable()
export class DashboardService {

  constructor(private readonly settingsFacadeService: SettingsFacadeService) {
  }

  retrieveSettingsList(): Observable<SettingInfoList> {
    return this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES);
  }

  isAddFundsButtonEnabled(): Observable<boolean> {
    const requiredSettings = [
      Settings.Setting.PAYMENT_TYPES,
      Settings.Setting.ONETIME_DEPOSITS_ENABLED
    ];

    return this.settingsFacadeService.getSettings(requiredSettings)
      .pipe(
        map(([paymentTypes, onetimeDeposits]) =>
          parseArrayFromString(paymentTypes.value).length && !!Number(onetimeDeposits.value),
        ),
      );
  }

  updateAccountTile(config: TileWrapperConfig[]): Observable<TileWrapperConfig[]> {
    return this.isAddFundsButtonEnabled().pipe(
      map((enabled) => {
        const index = config.findIndex((tile) => tile.id === TILES_ID.accounts);
        if (index >= 0) {
          const tile = config[index];
          config[index] = { ...tile, buttonConfig: { ...tile.buttonConfig, show: enabled } };
        }
        return config;
      }),
    );
  }

  getUpdatedTilesBaseConfig(settings: SettingInfoList): TileWrapperConfig[] {
    return TILES_BASE_CONFIG.map((setting) => {
      const s = settings.list.find(({ name }) => name === setting.id);
      return s
        ? { ...setting, isEnable: !!Number(s.value) }
        : setting;
    });
  }

  updateConfigByCashedConfig(allowedConfig: TileWrapperConfig[], cashedConfig: TileWrapperConfig[]): TileWrapperConfig[] {
    const newSettings = [];
    const existingSettingsInCache = allowedConfig.reduce((res, config) => {
      const cashedSettingIndex = cashedConfig.findIndex(({ id }) => id === config.id);
      cashedSettingIndex !== -1 ? res[cashedSettingIndex] = cashedConfig[cashedSettingIndex] : newSettings.push(config);
      return res;
    }, []).filter(Boolean);

    return [...newSettings, ...existingSettingsInCache];
  }
}

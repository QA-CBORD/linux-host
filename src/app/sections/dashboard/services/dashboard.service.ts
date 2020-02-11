import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { SettingInfoList } from 'src/app/core/model/configuration/setting-info-list.model';
import { Settings } from 'src/app/app.global';
import {
  ACCOUNTS_SETTINGS_CONFIG,
  DASHBOARD_SETTINGS_CONFIG,
  TILES_BASE_CONFIG,
  TILES_ID,
} from '@sections/dashboard/dashboard.config';
import { parseArrayFromString } from '@core/utils/general-helpers';
import { AccountsService } from '@sections/dashboard/services/accounts.service';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { DashboardApiService } from '@sections/dashboard/services/dashboard.api.service';

@Injectable()
export class DashboardService {

  constructor(private readonly dashApiService: DashboardApiService,
              private readonly accountsService: AccountsService) {
  }

  retrieveSettingsList(): Observable<SettingInfoList> {
    return this.dashApiService.retrieveSettingsList(Settings.SettingList.FEATURES);
  }

  isAddFundsButtonEnabled(): Observable<boolean> {
    const requireSettings = [
      ACCOUNTS_SETTINGS_CONFIG.paymentTypes,
      ACCOUNTS_SETTINGS_CONFIG.enableOnetimeDeposits,
    ];

    return this.accountsService.getUserSettings(requireSettings)
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
      let s = settings.list.find(({ name }) => name === setting.id);
      // temporary solution for skipping explore tab (s.name !== DASHBOARD_SETTINGS_CONFIG.enableExplore.name)
      return s && s.name !== DASHBOARD_SETTINGS_CONFIG.enableExplore.name
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

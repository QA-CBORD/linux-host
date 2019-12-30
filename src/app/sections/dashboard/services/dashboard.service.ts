import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DashboardApiService } from './dashboard.api.service';

import { SettingInfoList } from 'src/app/core/model/configuration/setting-info-list.model';
import { Settings } from 'src/app/app.global';
import { ACCOUNTS_SETTINGS_CONFIG, TILES_ID, TILES_BASE_CONFIG } from '@sections/dashboard/dashboard.config';
import { parseArrayFromString } from '@core/utils/general-helpers';
import { AccountsService } from '@sections/dashboard/services/accounts.service';
import { TileWrapperConfig } from '@sections/dashboard/models';

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
      return s ? { ...setting, isEnable: !!Number(s.value) } : setting;
    });
  }

  updateConfigByCashedConfig(allowedConfig: TileWrapperConfig[], cashedConfig: TileWrapperConfig[]): TileWrapperConfig[] {
    const temp = [];
    return cashedConfig.reduce((res, cfg) => {
      const elem = allowedConfig.some(({ id }) => id === cfg.id);
      elem ? res.push(cfg) : temp.push(cfg);
      return res;
    }, []).concat(temp);
  }
}

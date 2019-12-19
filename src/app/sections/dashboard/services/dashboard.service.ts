import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { DashboardApiService } from './dashboard.api.service';

import { SettingInfoList } from 'src/app/core/model/configuration/setting-info-list.model';
import { Settings } from 'src/app/app.global';
import { ACCOUNTS_SETTINGS_CONFIG, TILES_ID } from '@sections/dashboard/dashboard.config';
import { parseArrayFromString } from '@core/utils/general-helpers';
import { AccountsService } from '@sections/dashboard/services/accounts.service';
import { TileWrapperConfig } from '@sections/dashboard/models';

@Injectable()
export class DashboardService {
  private settings: SettingInfoList = {} as SettingInfoList;
  private readonly _settings$: BehaviorSubject<SettingInfoList> = new BehaviorSubject<SettingInfoList>(this.settings);

  constructor(private readonly dashApiService: DashboardApiService,
              private readonly accountsService: AccountsService) {
  }

  get settings$(): Observable<SettingInfoList> {
    return this._settings$.asObservable();
  }

  private set _settings(value: SettingInfoList) {
    this.settings = { ...value };
    this._settings$.next({ ...this.settings });
  }

  retrieveSettingsList(): Observable<SettingInfoList> {
    return this.dashApiService.retrieveSettingsList(Settings.SettingList.FEATURES).pipe(
      tap(settings => this._settings = settings),
    );
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
          return config;
        }
        return config;
      }),
    );
  }

  getUpdatedTilesConfig(tilesConfig: TileWrapperConfig[], settings: SettingInfoList): TileWrapperConfig[] {
    return tilesConfig.map((setting) => {
      let s = settings.list.find(({ name }) => name === setting.id);
      return s ? { ...setting, isEnable: !!Number(s.value) } : setting;
    });
  }
}

import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { LOCAL_STORAGE_STATE_KEYS, LocalStorageStateService } from '@core/states/local-storage';
import { DashboardService } from '@sections/dashboard/services';
import { Observable, zip } from 'rxjs';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class TileConfigFacadeService extends ServiceStateFacade {
  private readonly key: keyof typeof LOCAL_STORAGE_STATE_KEYS = LOCAL_STORAGE_STATE_KEYS.SETTINGS;

  constructor(private readonly localStorageStateService: LocalStorageStateService,
              private readonly dashboardService: DashboardService) {
    super();
  }

  get tileSettings$(): Observable<TileWrapperConfig[]> {
    if (!this.isTileConfigInStorage()) {
      this.localStorageStateService.registerStateEntity(this.key);
    }
    return this.localStorageStateService.getStateEntityByKey$<TileWrapperConfig[]>(this.key);
  }

  isValidConfig(config: any): boolean {
    return config && Array.isArray(config) && !!config.length;
  }

  isTileConfigInStorage(): boolean {
    return this.localStorageStateService.isKeyExistInState(this.key);
  }

  updateTilesConfigBySystemSettings(): Observable<TileWrapperConfig[]> {
    const configData = zip(
      this.tileSettings$,
      this.dashboardService.retrieveSettingsList(),
    );

    return this.makeRequestWithUpdatingStateHandler(configData, this.localStorageStateService).pipe(
      map(([config, settings]) => {
        const updatedBaseConfigs = this.dashboardService.getUpdatedTilesBaseConfig(settings);
        const allowedConfigFromBE = updatedBaseConfigs.filter(({ isEnable }) => isEnable);

        return this.isValidConfig(config)
          ? this.dashboardService.updateConfigByCashedConfig(allowedConfigFromBE, config)
          : allowedConfigFromBE;
      }),
      switchMap((updatedConfig) => this.dashboardService.updateAccountTile(updatedConfig)),
      tap(config => this.updateConfigState(config)),
    );
  }

  updateConfigState(value: TileWrapperConfig[]) {
    this.localStorageStateService.updateStateByKey(this.key, value);
  }
}

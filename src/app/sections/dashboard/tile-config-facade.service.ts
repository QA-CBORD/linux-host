import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { LOCAL_STORAGE_STATE_KEYS, LocalStorageStateService } from '@core/states/local-storage';
import { DashboardService } from '@sections/dashboard/services';
import { Observable, zip } from 'rxjs';
import { tilesConfig } from '@sections/dashboard/dashboard.config';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class TileConfigFacadeService extends ServiceStateFacade {
  private readonly key: keyof typeof LOCAL_STORAGE_STATE_KEYS = LOCAL_STORAGE_STATE_KEYS.SETTINGS;

  constructor(private readonly localStorageStateService: LocalStorageStateService,
              private readonly dashboardService: DashboardService) {
    super();
  }

  tileSettings$(): Observable<TileWrapperConfig[]> {
    if (!this.isTileConfigInStorage()) {
      this.localStorageStateService.registerStateEntity(LOCAL_STORAGE_STATE_KEYS.SETTINGS, tilesConfig);
    }
    return this.localStorageStateService.getStateEntityByKey$<TileWrapperConfig[]>(LOCAL_STORAGE_STATE_KEYS.SETTINGS)
      .pipe(
        tap((config) => {
          if (!config || !Array.isArray(config) || !config.length) {
            this.localStorageStateService.updateStateByKey(LOCAL_STORAGE_STATE_KEYS.SETTINGS, tilesConfig);
          }
        }),
      );
  }

  private isTileConfigInStorage(): boolean {
    return this.localStorageStateService.isKeyExistInState(LOCAL_STORAGE_STATE_KEYS.SETTINGS);
  }

  updateTilesConfigBySystemSettings(): Observable<TileWrapperConfig[]> {
    const operation = zip(
      this.tileSettings$(),
      this.dashboardService.retrieveSettingsList(),
    );

    return this.makeRequestWithUpdatingStateHandler(operation, this.localStorageStateService).pipe(
      map(([config, settings]) => this.dashboardService.getUpdatedTilesConfig(config, settings)),
      switchMap((updatedConfig) => this.dashboardService.updateAccountTile(updatedConfig)),
      tap(config => this.localStorageStateService.updateStateByKey(this.key, config)),
    );
  }
}

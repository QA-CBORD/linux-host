import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { LOCAL_STORAGE_STATE_KEYS, LocalStorageStateService } from '@core/states/local-storage';
import { DashboardService } from '@sections/dashboard/services';
import { Observable, zip } from 'rxjs';
import { ButtonConfig, TileWrapperConfig } from '@sections/dashboard/models';
import { first, map, switchMap, tap } from 'rxjs/operators';

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

  getTileById$(id: string): Observable<TileWrapperConfig> {
    return this.tileSettings$.pipe(map(tiles => tiles.find(({ id: tId }) => id === tId)));
  }

  isValidConfig(config: TileWrapperConfig[]): boolean {
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

  async updateConfigById(id: string, config: Partial<TileWrapperConfig>): Promise<void> {
    const tiles = await this.tileSettings$.pipe(first()).toPromise();
    const index = tiles.findIndex(({ id: tileId }) => id === tileId);
    if (index !== -1) {
      tiles[index] = {
        ...tiles[index],
        ...config,
        buttonConfig: { ...tiles[index]['buttonConfig'], ...config['buttonConfig'] },
      };
      this.updateConfigState(tiles);
    }
  }

  async resolveAsyncUpdatingConfig(instructions: {
      [key in keyof Partial<TileWrapperConfig>]: Observable<any> |
      { [key in keyof Partial<ButtonConfig>]: Observable<any> }
    }
    | { [key in keyof Partial<ButtonConfig>]: Observable<any> }): Promise<Partial<TileWrapperConfig>> {
    const promises = [];
    let res = {};

    for (const key in instructions) {
      if (key === 'buttonConfig') {
        const buttonConfig = instructions['buttonConfig'];
        for (const bkey in buttonConfig) {
          promises.push(buttonConfig[bkey].pipe(first()).toPromise().then(
            (value) => res = { ...res, buttonConfig: { ...buttonConfig, [bkey]: value } }),
          );
        }
      } else {
        promises.push(instructions[key].pipe(first()).toPromise().then(
          (value) => res = { ...res, [key]: value }),
        );
      }
    }

    await Promise.all(promises);
    return res;
  }

  updateConfigState(value: TileWrapperConfig[]) {
    this.localStorageStateService.updateStateByKey(this.key, value);
  }
}

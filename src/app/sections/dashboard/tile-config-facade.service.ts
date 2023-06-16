import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { DashboardService } from '@sections/dashboard/services';
import { Observable, zip } from 'rxjs';
import { APP_PROFILES, ButtonConfig, TileWrapperConfig } from '@sections/dashboard/models';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { ProfileServiceFacade } from '@shared/services/app.profile.services';

@Injectable()
export class TileConfigFacadeService extends ServiceStateFacade {
  private readonly key: string = 'DASHBOARD_TILES_SETTINGS';

  constructor(private readonly dashboardService: DashboardService,
              private readonly storage: StorageStateService,
              private readonly profileService: ProfileServiceFacade
              ) {
    super();
  }

  get tileSettings$(): Observable<TileWrapperConfig[]> {
    if (!this.isTileConfigInStorage()) this.storage.updateStateEntity(this.key, [], { ttl: Number.MAX_SAFE_INTEGER });
    return this.config$;
  }

  private get config$(): Observable<TileWrapperConfig[]> {
    return this.storage.getStateEntityByKey$<TileWrapperConfig[]>(this.key).pipe(
      map((storageEntity) => storageEntity !== null ? storageEntity.value : null),
    );
  }

  getTileById$(id: string): Observable<TileWrapperConfig> {
    return this.tileSettings$.pipe(map(tiles => tiles.find(({ id: tId }) => id === tId)));
  }

  isValidConfig(config: TileWrapperConfig[]): boolean {
    return !!(config && Array.isArray(config) && !!config.length);
  }

  isTileConfigInStorage(): boolean {
    return this.storage.isKeyExistInState(this.key);
  }

  updateTilesConfigBySystemSettings(): Observable<TileWrapperConfig[]> {
    const configData = zip(
      this.tileSettings$,
      this.dashboardService.retrieveSettingsList(),
    );


    return this.makeRequestWithUpdatingStateHandler(configData, this.storage).pipe(
      switchMap(async([config, settings]) => {
        const updatedBaseConfigs = this.dashboardService.getUpdatedTilesBaseConfig(settings);
        const currentProfile: APP_PROFILES = await this.profileService.determineCurrentProfile(settings.list);
        const allowedConfigFromBE = updatedBaseConfigs.filter(({ isEnable, supportProfiles }) => isEnable && supportProfiles.includes(currentProfile));

        return this.isValidConfig(config)
          ? this.dashboardService.updateConfigByCashedConfig(allowedConfigFromBE, config)
          : allowedConfigFromBE;
      }),
      switchMap((updatedConfig) => this.dashboardService.updateAccountTile(updatedConfig)),
      tap(async config => this.updateConfigState(config)),
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
      [key in keyof Partial<TileWrapperConfig>]: Observable<string> | Observable<boolean> |
      { [key in keyof Partial<ButtonConfig>]: Observable<string> }
    }
    | { [key in keyof Partial<ButtonConfig>]: Observable<string> }): Promise<Partial<TileWrapperConfig>> {
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

  updateConfigState(value: TileWrapperConfig[]): void {
    this.storage.updateStateEntity(this.key, value, { highPriorityKey: true });
  }
}

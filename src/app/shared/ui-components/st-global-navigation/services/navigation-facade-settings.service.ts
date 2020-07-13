import { Injectable } from '@angular/core';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { NAVIGATION_BASE_CONFIG } from '@shared/ui-components/st-global-navigation/config';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Injectable()
export class NavigationFacadeSettingsService extends ServiceStateFacade {
  private readonly key: string = 'NAVIGATION_SETTINGS';

  constructor(private readonly storage: StorageStateService,
              private readonly settingsFacadeService: SettingsFacadeService) {
    super();
  }

  get settings$(): Observable<any[]> {
    if (!this.isConfigInStorage()) this.storage.updateStateEntity(this.key, []);
    return this.initSettings().pipe(switchMap(() => this.config$));
  }

  private get config$(): Observable<NavigationBottomBarElement[]> {
    return this.storage.getStateEntityByKey$<NavigationBottomBarElement[]>(this.key).pipe(
      map((data) => !!data ? data.value : null),
    );
  }

  async update(settings: NavigationBottomBarElement[]): Promise<void> {
    const state = await this.storage.getStateEntityByKey$(this.key).pipe(take(1)).toPromise();
  }

  private isConfigInStorage(): boolean {
    return this.storage.isKeyExistInState(this.key);
  }

  private getAllowedSettings(): Observable<NavigationBottomBarElement[]> {
    return this.settingsFacadeService.getCachedSettings().pipe(
      map((list) => this.getUpdatedConfig(list).filter(({ isEnable }) => isEnable)),
    );
  }

  private initSettings(): Observable<NavigationBottomBarElement[]> {
    return zip(
      this.storage.getStateEntityByKey$<NavigationBottomBarElement[]>(this.key),
      this.getAllowedSettings(),
    ).pipe(
      take(1),
      map(([{ value: cashedSettings }, settings]) => this.updateCachedSettings(cashedSettings, settings)),
      tap((settings) => this.storage.updateStateEntity(this.key, settings)),
    );
  }

  private getUpdatedConfig(settings: SettingInfo[]): NavigationBottomBarElement[] {
    return NAVIGATION_BASE_CONFIG.map((setting) => {
      let s = settings.find(({ name }) => name === setting.id);
      return s
        ? { ...setting, isEnable: !!Number(s.value) }
        : setting;
    });
  }

  private updateCachedSettings(cashedSettings: NavigationBottomBarElement[],
                               availableSettings: NavigationBottomBarElement[]): NavigationBottomBarElement[] {
    const newConfig = [];
    const cached = [];
    for (let i = 0; i < availableSettings.length; i++) {
      const index = cashedSettings.findIndex(({ id }) => availableSettings[i].id === id);
      if (index !== -1) {
        cached[index] = cashedSettings[index];
      } else {
        newConfig.push(availableSettings[i]);
      }
    }
    return [...cached.filter(Boolean), ...newConfig];
  }
}

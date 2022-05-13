import { Injectable } from '@angular/core';
import { SingleEntityStateManager } from '@core/classes/single-entity-state-manager';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { getSettingInfoObject } from '@core/utils/settings-helper';
import { Settings } from '../../../app.global';

@Injectable({
  providedIn: 'root',
})
export class SettingsStateService extends SingleEntityStateManager<SettingInfo[]> {
  protected activeUpdaters = 0;
  protected state: SettingInfo[] = [];
  protected readonly _isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.activeUpdaters);
  protected readonly _state$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>(this.state);

  get state$(): Observable<SettingInfo[]> {
    return this._state$.asObservable();
  }

  getSetting(setting: Settings.Setting): Observable<SettingInfo> {
    const { domain, category, name } = getSettingInfoObject(setting);
    return this.state$.pipe(
      map((settings) => {
        if (!settings.length) return null;
        return settings.find(
          ({ domain: d, category: c, name: n }) => domain === d && category === c && name === n,
        );
      }),
      distinctUntilChanged(),
      take(1), /// added take(1) to close stream
    );
  }

  removeSetting(setting: Settings.Setting): void {
    const { domain, category, name } = getSettingInfoObject(setting);
    const index = this.state.findIndex(
      ({ category: c, name: n, domain: d }) => d === domain && c === category && n === name,
    );
    if (index !== -1) {
      this.state.splice(index, 1);
    }
    this.setState(this.state);
  }

  clearState(): void {
    this.state = [];
    this.dispatchStateChanges();
  }

  updateState(settings: SettingInfo | SettingInfo[]): void {
    if (settings === null) return;
    if (settings instanceof Array) {
      settings.forEach((s) => this.resolveAddingSettingToArray(this.state, s));
    } else {
      this.resolveAddingSettingToArray(this.state, settings);
    }
    this.setState(this.state);
  }

  private resolveAddingSettingToArray(settings: SettingInfo[], setting: SettingInfo): void {
    const index = settings.findIndex(({ name }) => setting.name === name);
    if (index !== -1) {
      settings[index] = setting;
    } else {
      settings.push(setting);
    }
  }

  protected dispatchStateChanges(): void {
    this._state$.next([...this.state]);
  }

  protected setState(newState: SettingInfo[]): void {
    this.state = JSON.parse(JSON.stringify(newState));
    this.dispatchStateChanges();
  }
}

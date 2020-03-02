import { Injectable } from '@angular/core';
import { SingleEntityStateManager } from '@core/classes/single-entity-state-manager';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SettingInfo } from '@core/model/configuration/setting-info.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsStateService extends SingleEntityStateManager<SettingInfo[]> {
  protected activeUpdaters: number = 0;
  protected state: SettingInfo[] = [];
  protected readonly _isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.activeUpdaters);
  protected readonly _state$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>(this.state);

  getSetting$(domain: string, category: string, name: string): Observable<SettingInfo> {
    return this.state$.pipe(
      map((settings) => {
        if (!settings.length) return null;
        return settings.find(
          ({ domain: d, category: c, name: n }) => domain === d && category === c && name === n,
        );
      }),
      distinctUntilChanged(),
    );
  }

  removeSetting(domain: string, category: string, name: string): void {
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
    const index = settings.findIndex(({ id }) => setting.id === id);
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

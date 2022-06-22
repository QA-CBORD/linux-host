import { Injectable } from '@angular/core';
import { SingleEntityStateManager } from '@core/classes/single-entity-state-manager';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { UserSettingInfo } from '@core/model/user';
import { User } from '../../../app.global';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsStateService extends SingleEntityStateManager<UserSettingInfo[]> {
  protected activeUpdaters = 0;
  protected state: UserSettingInfo[] = [];
  protected readonly _isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.activeUpdaters);
  protected readonly _state$: BehaviorSubject<UserSettingInfo[]> = new BehaviorSubject<UserSettingInfo[]>(this.state);

  getSetting(setting: User.Settings): Observable<UserSettingInfo> {
    const name = setting.toString();
    return this.state$.pipe(
      map(settings => {
        if (!settings.length) return null;
        return settings.find(({ name: n }) => name === n);
      }),
      distinctUntilChanged(),
      take(1)
    );
  }

  removeSetting(setting: User.Settings): void {
    const name = setting.toString();
    const index = this.state.findIndex(({ name: n }) => n === name);
    if (index !== -1) {
      this.state.splice(index, 1);
    }
    this.setState(this.state);
  }

  clearState(): void {
    this.state = [];
    this.dispatchStateChanges();
  }

  updateState(settings: UserSettingInfo | UserSettingInfo[]): void {
    if (settings === null) return;
    if (settings instanceof Array) {
      settings.forEach(s => this.resolveAddingSettingToArray(this.state, s));
    } else {
      this.resolveAddingSettingToArray(this.state, settings);
    }
    this.setState(this.state);
  }

  private resolveAddingSettingToArray(settings: UserSettingInfo[], setting: UserSettingInfo): void {
    const index = settings.findIndex(_setting => _setting.name.toString() === setting.name);

    if (index !== -1) {
      settings[index] = setting;
    } else {
      settings.push(setting);
    }
  }

  protected dispatchStateChanges(): void {
    this._state$.next([...this.state]);
  }

  protected setState(newState: UserSettingInfo[]): void {
    this.state = JSON.parse(JSON.stringify(newState));
    this.dispatchStateChanges();
  }
}

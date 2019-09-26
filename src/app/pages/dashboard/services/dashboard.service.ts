import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';

@Injectable(
)
export class DashboardService {

  public readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>([]);
  constructor() { }


  get settings$(): Observable<SettingInfo[]> {
    return this._settings$.asObservable();
  }

  private set _settings(value: SettingInfo[]) {
    this._settings$.next([...value]);
  }

}

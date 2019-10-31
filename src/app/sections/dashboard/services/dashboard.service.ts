import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, zip } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DashboardApiService } from './dashboard.api.service';

import { SettingInfoList } from 'src/app/core/model/configuration/setting-info-list.model';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';
import { SYSTEM_SETTING } from '../dashboard.config';
import { Settings } from 'src/app/app.global';

@Injectable()
export class DashboardService {
  public readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>([]);

  settings: SettingInfo[] = [];

  constructor(private readonly dashApiService: DashboardApiService) {}

  get settings$(): Observable<SettingInfo[]> {
    return this._settings$.asObservable();
  }

  private set _settings(value: SettingInfo[]) {
    this.settings = [...this.settings, ...value];
    this._settings$.next(this.settings);
  }

  retrieveSettings(settings: Settings.ESetting[]): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.dashApiService.retrieveSetting(setting));
    return zip(...requestArray).pipe(tap((settings: SettingInfo[]) => (this._settings = settings)));
  }

  retrieveSettingsList(): Observable<SettingInfoList> {
    return this.dashApiService.retrieveSettingsList(Settings.ESettingList.FEATURES);
  }

  getSettingValueByName(settingName: SYSTEM_SETTING): any {
    const split: string[] = settingName.toString().split('.');
    let value: any = 0;
    this.settings.some(setting => {
      if (setting.domain === split[0] && setting.category === split[1] && setting.name === split[2]) {
        value = setting.value;
        return true;
      }
    });
    return value;
  }
}

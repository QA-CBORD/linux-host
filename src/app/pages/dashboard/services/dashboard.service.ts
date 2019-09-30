import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ConfigurationService } from 'src/app/core/service/config-service/configuration.service';

import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';
import { SYSTEM_SETTING } from './../dashboard.config';

@Injectable()
export class DashboardService {
  public readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>([]);

  settings: SettingInfo[] = [];

  constructor(private readonly configService: ConfigurationService) {}

  get settings$(): Observable<SettingInfo[]> {
    return this._settings$.asObservable();
  }

  private set _settings(value: SettingInfo[]) {
    this.settings = [...this.settings, ...value];
    this._settings$.next(this.settings);
    
  }

  retrieveDashboardSettings(): Observable<SettingInfo[]> {
    return this.configService
      .getSettingListByConfig({ domain: 'get', category: 'feature' })
      .pipe(tap(response => (this._settings = response)));
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

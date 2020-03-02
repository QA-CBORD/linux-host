import { SettingInfoList } from './../../model/configuration/setting-info-list.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BaseService } from '../base-service/base.service';

import { MessageResponse } from './../../model/service/message-response.model';
import { ServiceParameters } from './../base-service/base.service';
import { SettingInfo } from '../../model/configuration/setting-info.model';
import { Settings } from 'src/app/app.global';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService extends BaseService {
  private readonly serviceUrl = '/json/configuration';

  private settings: SettingInfoList = {
    list: [],
    map: new Map<string, SettingInfo>(),
  };

  constructor(protected readonly http: HttpClient) {
    super(http);
  }

  // talk to team about this... caching settings for use app wide
  getSetting(institutionId: string, setting: Settings.Setting): Observable<SettingInfo> {
    const settingKey = setting.split('.').join('~');

    if (this.settings.map.has(settingKey)) {
      return of(this.settings.map.get(settingKey));
    } else {
      return this.retrieveSetting(institutionId, setting);
    }
  }

  retrieveSetting(institutionId: string, setting: Settings.Setting): Observable<SettingInfo> {
    const methodName = 'retrieveSetting';

    const set: string[] = setting.split('.');

    const params: ServiceParameters = {
      domain: set[0],
      category: set[1],
      name: set[2],
    };

    return this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, params).pipe(
      map(({ response }: MessageResponse<SettingInfo>) => response),
      tap(response => {
        this.addSettingToCache(response);
        return response;
      })
    );
  }

  retrieveSettingList(institutionId: string, setting: Settings.SettingList): Observable<SettingInfoList> {
    const methodName = 'retrieveSettingList';

    const set: string[] = setting.split('.');

    const params: ServiceParameters = {
      domain: set[0],
      category: set[1],
    };

    return this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, params).pipe(
      map(({ response }: MessageResponse<SettingInfoList>) => response),
      tap(settingList => {
        settingList.list.forEach(setting => this.addSettingToCache(setting));
        return settingList;
      })
    );
  }

  private addSettingToCache(setting: SettingInfo) {
    const index = this.settings.list.map(item => item.name).indexOf(setting.name);

    if (index > 0) {
      this.settings.list[index] = setting;
    } else {
      this.settings.list.push(setting);
    }

    this.settings.map.set(this.getSettingKey(setting), setting);
  }

  private getSettingKey(setting: SettingInfo) {
    return setting.domain + '~' + setting.category + '~' + setting.name;
  }
}

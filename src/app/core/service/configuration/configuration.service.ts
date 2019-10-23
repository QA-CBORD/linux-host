import { SettingInfoList } from './../../model/configuration/setting-info-list.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service/base.service';

import { MessageResponse } from './../../model/service/message-response.model';
import { ServiceParameters } from './../base-service/base.service';
import { SettingInfo } from '../../model/configuration/setting-info.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService extends BaseService {
  private readonly serviceUrl = '/json/configuration';

  private settings: SettingInfoList = {
    list: [],
    map: new Map(),
  };

  constructor(protected readonly http: HttpClient) {
    super(http);
  }

  // talk to team about this... caching settings for use app wide
  getSetting(institutionId: string, { domain, category, name }: SettingInfo): Observable<SettingInfo> {
    const delim = '~';
    const settingKey = domain + delim + category + delim + name;

    if (this.settings.map.has(settingKey)) {
      return of(this.settings.map.get(settingKey));
    } else {
      return this.retrieveSetting(institutionId, { domain, category, name });
    }
  }

  retrieveSetting(institutionId: string, { domain, category, name }: SettingInfo): Observable<SettingInfo> {
    const methodName = 'retrieveSetting';

    const params: ServiceParameters = {
      domain: domain,
      category: category,
      name: name,
    };

    return this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, params).pipe(
      map(({ response }: MessageResponse<SettingInfo>) => response)
    );
  }

  retrieveSettingList(institutionId: string, { domain, category }: SettingInfo): Observable<SettingInfoList> {
    const methodName = 'retrieveSettingList';

    const params: ServiceParameters = {
      domain: domain,
      category: category,
    };

    return this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, params).pipe(
      map(({ response }: MessageResponse<SettingInfoList>) => response)
    );
  }
}

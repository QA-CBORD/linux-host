import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from '../base-service/base.service';
import { UserService } from '../user-service/user.service';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { SettingRequest } from '../../model/configuration/setting-requst.model';
import { SettingInfo } from '../../model/configuration/setting-info.model';
import { MessageResponse } from './../../model/service/message-response.model';
import { SettingInfoList } from '../../model/configuration/setting-info-list.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService extends BaseService {
  private readonly serviceUrl: string = '/json/configuration';

  constructor(protected readonly http: HttpClient, private readonly userService: UserService) {
    super(http);
  }

  getSettingByConfig(config: SettingRequest): Observable<SettingInfo> {
    const methodName = 'retrieveSetting';
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, config)),
      map(({ response }: MessageResponse<SettingInfo>) => response)
    );
  }

  getSettingListByConfig(config: SettingRequest): Observable<SettingInfo[]> {
    const methodName = 'retrieveSettingList';
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, config)),
      map(({ response }: MessageResponse<SettingInfoList>) => response.list)
    );
  }
}

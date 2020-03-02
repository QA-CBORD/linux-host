import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from '../base-service/base.service';
import { UserService } from '../user-service/user.service';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { SettingRequest } from '@core/model/configuration/setting-requst.model';
import { MessageResponse } from '@core/model/service/message-response.model';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


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

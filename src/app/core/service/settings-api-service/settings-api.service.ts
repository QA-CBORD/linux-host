import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { UserSettingInfo } from '@core/model/user';
import { MessageResponse } from '@core/model/service/message-response.model';
import { map } from 'rxjs/operators';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { Settings, User } from '../../../app.global';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';
import { getSettingInfoObject } from '@core/utils/settings-helper';

@Injectable({
  providedIn: 'root',
})
export class SettingsApiService {
  private readonly configurationsUrl: string = '/json/configuration';
  private readonly userSettingsUrl: string = '/json/user';

  constructor(private readonly http: HttpClient) {}

  getUserSetting(settingName: User.Settings): Observable<UserSettingInfo> {
    const queryConfig = new RPCQueryConfig('retrieveSetting', { settingName }, true);
    return this.http
      .post<MessageResponse<UserSettingInfo>>(this.userSettingsUrl, queryConfig)
      .pipe(map(({ response }) => response));
  }

  deleteUserSetting(settingName: User.Settings): Observable<boolean> {
    const queryConfig = new RPCQueryConfig(
      'deleteSetting',
      {
        settingName,
      },
      true
    );
    return this.http
      .post<MessageResponse<boolean>>(this.userSettingsUrl, queryConfig)
      .pipe(map(({ response }) => response));
  }

  saveUserSetting(settingName: User.Settings, settingValue: string): Observable<boolean> {
    const queryConfig = new RPCQueryConfig(
      'saveSetting',
      {
        settingName,
        settingValue,
      },
      true
    );
    return this.http
      .post<MessageResponse<boolean>>(this.userSettingsUrl, queryConfig)
      .pipe(map(({ response }) => response));
  }

  getSetting(setting: Settings.Setting, sessionId?: string, institutionId?: string): Observable<SettingInfo> {
    const queryConfig = new RPCQueryConfig('retrieveSetting', getSettingInfoObject(setting), true, true);
    if (sessionId) {
      queryConfig.params['sessionId'] = sessionId;
    }
    if (institutionId) {
      queryConfig.params['institutionId'] = institutionId;
    }
    return this.http
      .post(this.configurationsUrl, queryConfig)
      .pipe(map(({ response }: MessageResponse<SettingInfo>) => response));
  }

  getSettings(settings: Settings.Setting[], sessionId?: string, institutionId?: string): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.getSetting(setting, sessionId, institutionId));
    return zip(...requestArray);
  }

  getSettingList(
    setting: Settings.SettingList,
    sessionId?: string,
    institutionId?: string
  ): Observable<SettingInfoList> {
    const queryConfig = new RPCQueryConfig('retrieveSettingList', getSettingInfoObject(setting), true, true);
    if (sessionId) {
      queryConfig.params['sessionId'] = sessionId;
    }
    if (institutionId) {
      queryConfig.params['institutionId'] = institutionId;
    }
    return this.http
      .post(this.configurationsUrl, queryConfig)
      .pipe(map(({ response }: MessageResponse<SettingInfoList>) => response));
  }
}

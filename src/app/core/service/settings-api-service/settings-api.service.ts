import { Injectable } from '@angular/core';
import { BaseService } from '@core/service/base-service/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { UserSettingInfo } from '@core/model/user';
import { MessageResponse } from '@core/model/service/message-response.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { ContentStringRequest } from '@core/model/content/content-string-request.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { UserService } from '@core/service/user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsApiService extends BaseService {
  private readonly configurationsUrl: string = '/json/configuration';
  private readonly userSettingsUrl: string = '/json/user';

  constructor(protected readonly http: HttpClient,
              private readonly userService: UserService) {
    super(http);
  }

  getUserSettingsByName(settingName: string): Observable<UserSettingInfo> {
    return this.httpRequest<MessageResponse<UserSettingInfo>>(this.userSettingsUrl, 'retrieveSetting', true, {
      settingName,
    }).pipe(map(({ response }) => response));
  }

  saveUserSettingsByName(settingName: string, settingValue: string): Observable<MessageResponse<boolean>> {
    return this.httpRequest<MessageResponse<boolean>>(this.userSettingsUrl, 'saveSetting', true, {
      settingName,
      settingValue,
    });
  }

  getSettingByConfig(config: ContentStringRequest): Observable<SettingInfo> {
    const methodName = 'retrieveSetting';

    return this.userService.userData.pipe(
      switchMap(({ institutionId }) =>
        this.httpRequestFull(this.configurationsUrl, methodName, true, institutionId, config)),
      map(({ response }: MessageResponse<SettingInfo>) => response),
    );
  }

  getSettings(settings: ContentStringRequest[]): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.getSettingByConfig(setting));

    return zip(...requestArray);
  }
}

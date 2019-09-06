import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from '../../../core/service/base-service/base.service';
import { UserService } from '../../../core/service/user-service/user.service';
import { ContentStringRequest } from '../../../core/model/content/content-string-request.model';
import { MessageResponse } from '../../../core/model/service/message-response.model';
import { SettingInfo } from '../../../core/model/configuration/setting-info.model';

@Injectable()
export class AccountsApiService extends BaseService {
  private readonly serviceUrl: string = '/json/configuration';

  constructor(protected readonly http: HttpClient, private readonly userService: UserService) {
    super(http);
  }

  getSettingByConfig(config: ContentStringRequest): Observable<SettingInfo> {
    const methodName = 'retrieveSetting';

    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, config)),
      map(({ response }: MessageResponse<SettingInfo>) => response)
    );
  }
}

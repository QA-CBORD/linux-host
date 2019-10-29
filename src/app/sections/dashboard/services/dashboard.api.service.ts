import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { BaseService } from 'src/app/core/service/base-service/base.service';
import { UserService } from 'src/app/core/service/user-service/user.service';
import { ConfigurationService } from 'src/app/core/service/configuration/configuration.service';

import { SettingInfoList } from 'src/app/core/model/configuration/setting-info-list.model';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';

@Injectable()
export class DashboardApiService extends BaseService {
  constructor(
    protected readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly configService: ConfigurationService
  ) {
    super(http);
  }

  retrieveSetting(settingInfo: SettingInfo): Observable<SettingInfo> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.configService.retrieveSetting(institutionId, settingInfo))
    );
  }

  retrieveSettingsList({ domain, category }: SettingInfo): Observable<SettingInfoList> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) =>
        this.configService.retrieveSettingList(institutionId, { domain: domain, category: category })
      ),
      take(1)
    );
  }
}

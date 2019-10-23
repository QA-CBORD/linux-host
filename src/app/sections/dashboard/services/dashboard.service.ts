import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap, tap, take } from 'rxjs/operators';

import { UserService } from 'src/app/core/service/user-service/user.service';
import { ConfigurationService } from 'src/app/core/service/configuration/configuration.service';

import { UserInfo } from 'src/app/core/model/user/user-info.model';
import { SettingInfoList } from 'src/app/core/model/configuration/setting-info-list.model';

@Injectable()
export class DashboardService {
  constructor(private readonly userService: UserService, private readonly configService: ConfigurationService) {}


  retrieveSettingsList(): Observable<SettingInfoList> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }: UserInfo) => {
        return this.configService.retrieveSettingList(institutionId, { domain: 'get', category: 'feature' });
      }),
      tap(response => console.log(response)),
      take(1)
    );
  }
}

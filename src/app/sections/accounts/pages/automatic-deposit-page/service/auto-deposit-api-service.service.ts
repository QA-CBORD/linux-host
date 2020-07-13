import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserAutoDepositSettingInfo } from '../models/auto-deposit-settings';
import { MessageResponse } from '@core/model/service/message-response.model';
import { UserAccount } from '@core/model/account/account.model';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { UserFacadeService } from '@core/facades/user/user.facade.service';

@Injectable()
export class AutoDepositApiService {
  constructor(private readonly http: HttpClient, private readonly userFacadeService: UserFacadeService) {}

  getUserAutoDepositSettingInfo(): Observable<UserAutoDepositSettingInfo> {
    const url = '/json/user';

    return this.userFacadeService.getUserData$().pipe(
      switchMap(({ id: userId }) => {
        const queryConfig = new RPCQueryConfig('retrieveAutoDepositSettings', { userId }, true);

        return this.http.post(url, queryConfig);
      }),
      map(({ response }: MessageResponse<UserAutoDepositSettingInfo>) => response)
    );
  }

  retrieveAutoDepositAccountList(paymentType: number): Observable<UserAccount[]> {
    const url = '/json/commerce';

    return this.userFacadeService.getUserData$().pipe(
      switchMap(({ id: userId }) => {
        const queryConfig = new RPCQueryConfig('retrieveAutoDepositAccountList', { userId, paymentType }, true);

        return this.http.post(url, queryConfig);
      }),
      map(({ response }: MessageResponse<UserAccount[]>) => response)
    );
  }

  updateAutoDepositSettings(userAutoDepositSettingInfo: UserAutoDepositSettingInfo): Observable<boolean> {
    const url = '/json/user';

    const queryConfig = new RPCQueryConfig('updateAutoDepositSettings', { userAutoDepositSettingInfo }, true);

    return this.http.post(url, queryConfig).pipe(map(({ response }: MessageResponse<boolean>) => response));
  }
}

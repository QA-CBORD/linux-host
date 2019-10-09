import { Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/service/base-service/base.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../../core/service/user-service/user.service';
import { map, switchMap } from 'rxjs/operators';
import { MessageResponse } from '../../../../../core/model/service/message-response.model';
import { Observable } from 'rxjs';
import { UserAutoDepositSettingInfo } from '../models/auto-deposit-settings';
import { UserAccount } from '../../../../../core/model/account/account.model';

@Injectable()
export class AutoDepositApiService extends BaseService {
  constructor(protected readonly http: HttpClient, private readonly userService: UserService) {
    super(http);
  }

  getUserAutoDepositSettingInfo(): Observable<UserAutoDepositSettingInfo> {
    const url = '/json/user';
    const method = 'retrieveAutoDepositSettings';

    return this.userService.userData.pipe(
      switchMap(({ id: userId }) => this.httpRequest(url, method, true, { userId })),
      map(({ response }: MessageResponse<UserAutoDepositSettingInfo>) => response)
    );
  }

  retrieveAutoDepositAccountList(paymentType: number): Observable<UserAccount[]> {
    const url = '/json/commerce';
    const method = 'retrieveAutoDepositAccountList';

    return this.userService.userData.pipe(
      switchMap(({ id: userId }) => this.httpRequest(url, method, true, { userId, paymentType })),
      map(({ response }: MessageResponse<UserAccount[]>) => response)
    );
  }

  updateAutoDepositSettings(userAutoDepositSettingInfo: UserAutoDepositSettingInfo): Observable<boolean> {
    const url = '/json/user';
    const method = 'updateAutoDepositSettings';

    return this.httpRequest(url, method, true, {userAutoDepositSettingInfo}).pipe(
      map(({ response }: MessageResponse<boolean>) => response)
    );
  }
}

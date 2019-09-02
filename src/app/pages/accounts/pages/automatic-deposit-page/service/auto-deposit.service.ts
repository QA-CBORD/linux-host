import { Injectable } from '@angular/core';

import { Observable, of, zip } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { UserAutoDepositSettingInfo } from '../models/auto-deposit-settings';
import { AutoDepositApiService } from './auto-deposit-api-service.service';
import { SYSTEM_SETTINGS_CONFIG } from '../../../accounts.config';
import { parseArray } from '../../../../../core/utils/general-helpers';
import { SettingService } from '../../../services/setting.service';
import { UserService } from '../../../../../core/service/user-service/user.service';

@Injectable()
export class AutoDepositService {
  private _userAutoDepositInfo: UserAutoDepositSettingInfo;

  constructor(
    private readonly apiService: AutoDepositApiService,
    private readonly settingsService: SettingService,
    private readonly userService: UserService
  ) {}

  get userAutoDepositInfo(): UserAutoDepositSettingInfo {
    return { ...this._userAutoDepositInfo };
  }

  getUserAutoDepositInfo(): Observable<UserAutoDepositSettingInfo> {
    return this.apiService.getUserAutoDepositSettingInfo().pipe(
      switchMap(response => (response ? of(response) : this.getInitialAutoDepositSetting())),
      tap(settings => (this._userAutoDepositInfo = settings))
    );
  }

  getAutoDepositAccountList(): Observable<any> {
    return this.settingsService.settings$.pipe(
      switchMap(settings => {
        const settingInfo = this.settingsService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.autoDepositPaymentTypes.name
        );
        const paymentType = settingInfo ? parseArray(settingInfo.value) : [];
        const calls = paymentType.map((type: number) => this.apiService.retrieveAutoDepositAccountList(type));
        return zip(...calls);
      })
    );
  }

  updateAutoDepositSettings(settings: UserAutoDepositSettingInfo): Observable<boolean> {
    return this.apiService.updateAutoDepositSettings(settings);
  }

  private getInitialAutoDepositSetting(): Observable<UserAutoDepositSettingInfo> {
    return this.userService.userData.pipe(
      map(({ id: userId }) => ({
        userId,
        amount: 0,
        lowBalanceAmount: 0,
        active: false,
      }))
    );
  }
}

import { Injectable } from '@angular/core';

import { Observable, zip } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { UserAutoDepositSettingInfo } from '../models/auto-deposit-settings';
import { AutoDepositApiServiceService } from './auto-deposit-api-service.service';
import { SYSTEM_SETTINGS_CONFIG } from '../../../accounts.config';
import { parseArray } from '../../../../../core/utils/general-helpers';
import { SettingService } from '../../../services/setting.service';

@Injectable()
export class AutoDepositService {
  private _userAutoDepositInfo: UserAutoDepositSettingInfo;

  constructor(private readonly apiServiceService: AutoDepositApiServiceService,
              private readonly settingsService: SettingService) {
  }

  get userAutoDepositInfo(): UserAutoDepositSettingInfo {
    return { ...this._userAutoDepositInfo };
  }

  getUserAutoDepositInfo(): Observable<UserAutoDepositSettingInfo> {
    return this.apiServiceService.getUserAutoDepositSettingInfo().pipe(
      tap(data => this._userAutoDepositInfo = data ? { amount: 0, lowBalanceAmount: 0 } : data),
    );
  }

  getAutoDepositAccountList(): Observable<any> {
    return this.settingsService.settings$.pipe(
      switchMap((settings) => {
        const settingInfo = this.settingsService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.autoDepositPaymentTypes.name);
        const paymentType = settingInfo ? parseArray(settingInfo.value) : [];
        const calls = paymentType.map((type: number) =>
          this.apiServiceService.retrieveAutoDepositAccountList(type),
        );
        return zip(...calls);
      }),
    );
  }
}
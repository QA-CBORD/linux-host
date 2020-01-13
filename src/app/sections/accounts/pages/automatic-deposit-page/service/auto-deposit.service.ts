import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { UserAutoDepositSettingInfo } from '../models/auto-deposit-settings';
import { AutoDepositApiService } from './auto-deposit-api-service.service';
import { SettingService } from '@core/service/settings/setting.service';
import { UserService } from '@core/service/user-service/user.service';
import { SYSTEM_SETTINGS_CONFIG } from '@sections/accounts/accounts.config';
import { parseArrayFromString } from '@core/utils/general-helpers';

@Injectable()
export class AutoDepositService {
  private readonly settings: BehaviorSubject<UserAutoDepositSettingInfo> = new BehaviorSubject<UserAutoDepositSettingInfo>(null);

  constructor(
    private readonly apiService: AutoDepositApiService,
    private readonly settingsService: SettingService,
    private readonly userService: UserService
  ) {}

  set _settings(val: UserAutoDepositSettingInfo) {
    this.settings.next(val);
  }

  get settings$(): Observable<UserAutoDepositSettingInfo> {
    return this.settings.asObservable();
  }

  getUserAutoDepositInfo(): Observable<UserAutoDepositSettingInfo> {
    return this.apiService
      .getUserAutoDepositSettingInfo()
      .pipe(
        switchMap(response => (response ? of(response) : this.getInitialAutoDepositSetting())),
        tap((settings) => this._settings = settings)
        );
  }

  getAutoDepositAccountList(): Observable<any> {
    return this.settingsService.settings$.pipe(
      switchMap(settings => {
        const settingInfo = this.settingsService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.autoDepositPaymentTypes.name
        );
        const paymentType = settingInfo ? parseArrayFromString(settingInfo.value) : [];
        const calls = paymentType.map((type: number) => this.apiService.retrieveAutoDepositAccountList(type));
        return zip(...calls);
      })
    );
  }

  updateAutoDepositSettings(settings: UserAutoDepositSettingInfo): Observable<boolean> {
    return this.apiService.updateAutoDepositSettings(settings).pipe(
      tap((response) => response && (this._settings = settings))
    );
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

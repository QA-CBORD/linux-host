import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { UserAutoDepositSettingInfo } from '../models/auto-deposit-settings';
import { AutoDepositApiService } from './auto-deposit-api-service.service';
import { parseArrayFromString } from '@core/utils/general-helpers';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from '../../../../../app.global';
import { UserAccount } from '@core/model/account/account.model';

@Injectable()
export class AutoDepositService {
  private readonly settings: BehaviorSubject<UserAutoDepositSettingInfo> = new BehaviorSubject<
    UserAutoDepositSettingInfo
  >(null);

  constructor(
    private readonly apiService: AutoDepositApiService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly userFacadeService: UserFacadeService
  ) {}

  set _settings(val: UserAutoDepositSettingInfo) {
    this.settings.next(val);
  }

  get settings$(): Observable<UserAutoDepositSettingInfo> {
    return this.settings.asObservable();
  }

  getUserAutoDepositInfo(): Observable<UserAutoDepositSettingInfo> {
    return this.apiService.getUserAutoDepositSettingInfo().pipe(
      switchMap(response => (response ? of(response) : this.getInitialAutoDepositSetting())),
      tap(settings => (this._settings = settings))
    );
  }

  getAutoDepositAccountList(): Observable<UserAccount[][]> {
    return this.settingsFacadeService.getSetting(Settings.Setting.AUTO_DEPOSIT_PAYMENT_TYPES).pipe(
      map(({ value }) => parseArrayFromString(value)),
      switchMap(array => zip(array.map((type: number) => this.apiService.retrieveAutoDepositAccountList(type))))
    );
  }

  updateAutoDepositSettings(settings: UserAutoDepositSettingInfo): Observable<boolean> {
    return this.apiService
      .updateAutoDepositSettings(settings)
      .pipe(tap(response => response && (this._settings = settings)));
  }

  private getInitialAutoDepositSetting(): Observable<UserAutoDepositSettingInfo> {
    return this.userFacadeService.getUserData$().pipe(
      map(({ id: userId }) => ({
        userId,
        amount: 0,
        lowBalanceAmount: 0,
        active: false,
      }))
    );
  }
}

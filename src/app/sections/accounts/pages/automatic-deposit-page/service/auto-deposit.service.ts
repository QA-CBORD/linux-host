import { Injectable } from '@angular/core';
import { UserAutoDepositSettingInfo } from '../models/auto-deposit-settings';
import { AutoDepositApiServiceService } from './auto-deposit-api-service.service';
import { Observable, zip } from 'rxjs';
import { UserAccount } from '../../../../../core/model/account/account.model';
import { switchMap } from 'rxjs/operators';
import { SYSTEM_SETTINGS_CONFIG } from '../../../accounts.config';
import { transformStringToArray } from '../../../../../core/utils/general-helpers';
import { SettingService } from '../../../services/setting.service';

@Injectable()
export class AutoDepositService {
  private userAutoDepositInfo: UserAutoDepositSettingInfo;

  constructor(private readonly apiServiceService:AutoDepositApiServiceService,
              private readonly settingsService: SettingService) { }

  getUserAutoDepositInfo(): Observable<UserAutoDepositSettingInfo> {
    return this.apiServiceService.getUserAutoDepositSettingInfo();
  }

  getAutoDepositAccountList(): Observable<any> {
    return this.settingsService.settings$.pipe(
      switchMap((settings) => {
        const settingInfo = this.settingsService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.depositPaymentTypes.name);
        const paymentType = settingInfo ? transformStringToArray(settingInfo.value) : [];
        const calls = paymentType.map((type: number) =>
          this.apiServiceService.retrieveAutoDepositAccountList(type),
        );
        return zip(...calls);
      }),
    );
  }
}

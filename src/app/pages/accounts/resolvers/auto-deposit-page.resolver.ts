import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { SYSTEM_SETTINGS_CONFIG } from '../accounts.config';
import { SettingInfo } from '../../../core/model/configuration/setting-info.model';
import { SettingService } from '../services/setting.service';

@Injectable()
export class AutoDepositPageResolver implements Resolve<Observable<SettingInfo[]>> {

  constructor(private readonly settingsService: SettingService) {}

  resolve(): Observable<SettingInfo[]> {
    const requireSettings = [
      SYSTEM_SETTINGS_CONFIG.depositPaymentTypes,
      SYSTEM_SETTINGS_CONFIG.lowBalanceAutoDepositEnabled,
      SYSTEM_SETTINGS_CONFIG.lowBalanceFreeFormAmounts,
      SYSTEM_SETTINGS_CONFIG.lowBalanceFreeFormEnabled,
      SYSTEM_SETTINGS_CONFIG.billMeFreeFormEnabled,
      SYSTEM_SETTINGS_CONFIG.billMeFreeFormAmounts,
      SYSTEM_SETTINGS_CONFIG.billMeMapping,
      SYSTEM_SETTINGS_CONFIG.freeFromDepositEnabled,
      SYSTEM_SETTINGS_CONFIG.presetDepositAmountsCreditCard,
    ];

    return this.settingsService.getUserSettings(requireSettings).pipe(take(1));
  }
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { SYSTEM_SETTINGS_CONFIG } from '../accounts.config';
import { SettingInfo } from '../../../core/model/configuration/setting-info.model';
import { SettingService } from '../services/setting.service';
import { LoadingService } from '../../../core/service/loading/loading.service';

@Injectable()
export class AutoDepositPageResolver implements Resolve<Observable<SettingInfo[]>> {
  constructor(private readonly settingsService: SettingService, private readonly loadingService: LoadingService) {}

  resolve(): Observable<SettingInfo[]> {
    const requireSettings = [
      SYSTEM_SETTINGS_CONFIG.autoDepositPaymentTypes,
      SYSTEM_SETTINGS_CONFIG.lowBalanceAutoDepositEnabled,
      SYSTEM_SETTINGS_CONFIG.lowBalanceAmounts,
      SYSTEM_SETTINGS_CONFIG.lowBalanceFreeFormEnabled,
      SYSTEM_SETTINGS_CONFIG.billMeFreeFormEnabled,
      SYSTEM_SETTINGS_CONFIG.billMeFreeFormAmounts,
      SYSTEM_SETTINGS_CONFIG.billMeMapping,
      SYSTEM_SETTINGS_CONFIG.freeFromDepositEnabled,
      SYSTEM_SETTINGS_CONFIG.presetDepositAmountsCreditCard,
      SYSTEM_SETTINGS_CONFIG.enableAutoDeposits,
    ];

    this.loadingService.showSpinner();
    return this.settingsService.getUserSettings(requireSettings).pipe(
      take(1),
      tap(
        this.loadingService.closeSpinner.bind(this.loadingService),
        this.loadingService.closeSpinner.bind(this.loadingService)
      )
    );
  }
}

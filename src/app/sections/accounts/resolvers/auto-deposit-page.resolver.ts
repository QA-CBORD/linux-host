import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { SYSTEM_SETTINGS_CONFIG } from '../accounts.config';
import { SettingInfo } from '../../../core/model/configuration/setting-info.model';
import { LoadingService } from '../../../core/service/loading/loading.service';
import { SettingService } from '@core/service/settings/setting.service';

@Injectable()
export class AutoDepositPageResolver implements Resolve<Observable<SettingInfo[]>> {
  constructor(private readonly settingsService: SettingService,
              private readonly loadingService: LoadingService) {}

  resolve(): Observable<SettingInfo[]> {
    const requireSettings = [
      SYSTEM_SETTINGS_CONFIG.autoDepositPaymentTypes,
      SYSTEM_SETTINGS_CONFIG.paymentTypes,
      SYSTEM_SETTINGS_CONFIG.lowBalanceAutoDepositEnabled,
      SYSTEM_SETTINGS_CONFIG.maxAmountbillme,
      SYSTEM_SETTINGS_CONFIG.lowBalanceAmounts,
      SYSTEM_SETTINGS_CONFIG.maxAmountCreditCard,
      SYSTEM_SETTINGS_CONFIG.minAmountCreditCard,
      SYSTEM_SETTINGS_CONFIG.minAmountbillme,
      SYSTEM_SETTINGS_CONFIG.lowBalanceFreeFormEnabled,
      SYSTEM_SETTINGS_CONFIG.billMeFreeFormEnabled,
      SYSTEM_SETTINGS_CONFIG.billMeAmounts,
      SYSTEM_SETTINGS_CONFIG.billMeMapping,
      SYSTEM_SETTINGS_CONFIG.freeFromDepositEnabled,
      SYSTEM_SETTINGS_CONFIG.presetDepositAmountsCreditCard,
      SYSTEM_SETTINGS_CONFIG.enableAutoDeposits,
      SYSTEM_SETTINGS_CONFIG.autoDepositTenders,
      SYSTEM_SETTINGS_CONFIG.paymentSystem
    ];

    this.loadingService.showSpinner();
    return this.settingsService.getUserSettings(requireSettings).pipe(
      take(1),
      tap(null, this.loadingService.closeSpinner.bind(this.loadingService))
    );
  }
}

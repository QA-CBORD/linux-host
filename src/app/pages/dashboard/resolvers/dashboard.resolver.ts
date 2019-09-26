import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { ConfigurationService } from 'src/app/core/service/config-service/configuration.service';
import { SYSTEM_SETTINGS_LIST } from '../dashboard.config';

@Injectable()
export class DashboardPageResolver implements Resolve<Observable<SettingInfo[]>> {
  constructor(private readonly configService: ConfigurationService, private readonly loadingService: LoadingService) {}

  resolve(): Observable<SettingInfo[]> {
    const requireSettings = [
    //   SYSTEM_SETTINGS_CONFIG.autoDepositPaymentTypes,
    //   SYSTEM_SETTINGS_CONFIG.lowBalanceAutoDepositEnabled,
    //   SYSTEM_SETTINGS_CONFIG.lowBalanceAmounts,
    //   SYSTEM_SETTINGS_CONFIG.lowBalanceFreeFormEnabled,
    //   SYSTEM_SETTINGS_CONFIG.billMeFreeFormEnabled,
    //   SYSTEM_SETTINGS_CONFIG.billMeAmounts,
    //   SYSTEM_SETTINGS_CONFIG.billMeMapping,
    //   SYSTEM_SETTINGS_CONFIG.freeFromDepositEnabled,
    //   SYSTEM_SETTINGS_CONFIG.presetDepositAmountsCreditCard,
    //   SYSTEM_SETTINGS_CONFIG.enableAutoDeposits,
    //   SYSTEM_SETTINGS_CONFIG.autoDepositTenders,
    ];

    this.loadingService.showSpinner();
    return this.configService.getSettingListByConfig({domain: 'get', category: 'feature'}).pipe(
      take(1),
      tap(null, this.loadingService.closeSpinner.bind(this.loadingService))
    );
  }
}

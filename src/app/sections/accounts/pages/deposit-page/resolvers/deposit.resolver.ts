import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { SYSTEM_SETTINGS_CONFIG } from '../../../accounts.config';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { tap } from 'rxjs/operators';
import { DepositService } from '../services/deposit.service';

@Injectable()
export class DepositResolver implements Resolve<Observable<any>> {
  constructor(private readonly depositService: DepositService, private readonly loadingService: LoadingService) {}
  resolve(): Observable<any> {
    const requireSettings = [
      SYSTEM_SETTINGS_CONFIG.depositTenders,
      SYSTEM_SETTINGS_CONFIG.paymentTypes,
      SYSTEM_SETTINGS_CONFIG.billMeMapping,
      SYSTEM_SETTINGS_CONFIG.freeFromDepositEnabled,
      SYSTEM_SETTINGS_CONFIG.presetDepositAmountsCreditCard,
      SYSTEM_SETTINGS_CONFIG.billMeAmounts,
      SYSTEM_SETTINGS_CONFIG.minAmountbillme,
      SYSTEM_SETTINGS_CONFIG.billMeFreeFormEnabled,
      SYSTEM_SETTINGS_CONFIG.minAmountCreditCard,
      // SYSTEM_SETTINGS_CONFIG.maxAmountbillme,
      SYSTEM_SETTINGS_CONFIG.maxAmountCreditCard,
    ];
    const accountsCall = this.depositService.getUserAccounts();
    const settingsCall = this.depositService.getUserSettings(requireSettings);
    this.loadingService.showSpinner();

    return zip(settingsCall, accountsCall).pipe(
      tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner())
    );
  }
}

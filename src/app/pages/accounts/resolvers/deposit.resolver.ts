import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { DepositService } from '../services/deposit.service';
import { SYSTEM_SETTINGS_CONFIG } from '../accounts.config';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { tap } from 'rxjs/operators';

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
      SYSTEM_SETTINGS_CONFIG.presetDepositAmountsBillMe,
    ];
    const accountsCall = this.depositService.getUserAccounts();
    const settingsCall = this.depositService.getUserSettings(requireSettings)
    .pipe(tap(res => console.log(res)));
    this.loadingService.showSpinner();

    return zip(settingsCall, accountsCall).pipe(
      tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner())
    );
  }
}

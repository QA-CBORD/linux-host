import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { MerchantService } from '../services';

@Injectable()
export class OrderingResolver implements Resolve<Observable<any>> {
  constructor(private readonly merchantListService: MerchantService, private readonly loadingService: LoadingService) {}
  resolve(): Observable<any> {
    // const requireSettings = [
    //   SYSTEM_SETTINGS_CONFIG.depositTenders,
    //   SYSTEM_SETTINGS_CONFIG.paymentTypes,
    //   SYSTEM_SETTINGS_CONFIG.billMeMapping,
    //   SYSTEM_SETTINGS_CONFIG.freeFromDepositEnabled,
    //   SYSTEM_SETTINGS_CONFIG.presetDepositAmountsCreditCard,
    //   SYSTEM_SETTINGS_CONFIG.presetDepositAmountsBillMe,
    //   SYSTEM_SETTINGS_CONFIG.minAmountbillme,
    //   SYSTEM_SETTINGS_CONFIG.minAmountCreditCard,
    //   // SYSTEM_SETTINGS_CONFIG.maxAmountbillme,
    //   SYSTEM_SETTINGS_CONFIG.maxAmountCreditCard,
    // ];
    // const accountsCall = this.depositService.getUserAccounts();
    // const settingsCall = this.depositService.getUserSettings(requireSettings);
    this.loadingService.showSpinner();

    // return zip(settingsCall, accountsCall).pipe(
    //   tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner())
    // );

    return this.merchantListService.getMerchantsWithFavoriteInfo().pipe(
        delay(1000),
        tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner())
    );
  }
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { forkJoin, zip } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/operators';
import { Settings } from 'src/app/app.global';

const requiredSettings = [
  Settings.Setting.DEPOSIT_TENDERS,
  Settings.Setting.PAYMENT_TYPES,
  Settings.Setting.FREEFORM_DEPOSIT_ENABLED,
  Settings.Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD,
  Settings.Setting.CREDIT_PAYMENT_SYSTEM_TYPE,
  Settings.Setting.CREDITCARD_AMOUNT_MIN,
  Settings.Setting.CREDITCARD_AMOUNT_MAX,
];

@Injectable({ providedIn: 'root' })
export class GuestAddFundsResolver implements Resolve<Observable<any>> {
  constructor(private readonly depositService: DepositService, private readonly loadingService: LoadingService) {}

  resolve(): Observable<any> {
    const contentStringCall = this.depositService.initContentStringsList();
    const accountsCall = this.depositService.getUserAccounts();
    const settingsCall = this.depositService.getUserSettings(requiredSettings);
    this.loadingService.showSpinner();

    return forkJoin(contentStringCall, settingsCall, accountsCall).pipe(
      tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner()),
      map(
        ([contentString, settings, accounts]) => ({ contentString, settings, accounts }),
      
      )
    );
  }
}

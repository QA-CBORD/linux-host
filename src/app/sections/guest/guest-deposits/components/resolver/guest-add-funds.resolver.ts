import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { GuestDepositsService } from '@sections/guest/services/guest-deposits.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  constructor(private readonly depositService: DepositService, private readonly loadingService: LoadingService, private readonly commonService: CommonService, private readonly userFacadeService: UserFacadeService, private readonly guestDepositsService: GuestDepositsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const addFundsCs = this.commonService.loadContentString(ContentStringCategory.addFunds);
    const confirmationCs = this.commonService.loadContentString(ContentStringCategory.guestDeposit);
    const applePayEnabled = this.userFacadeService.isApplePayEnabled$();
    const settingsCall = this.depositService.getUserSettings(requiredSettings);
    const recipientName  = route.queryParams.recipientName;
    const recipientId = route.queryParams.userId;
    const sourceAccounts = this.guestDepositsService.guestAccounts();
    const destinationAccounts = this.guestDepositsService.recipientAccounts(recipientId);
    this.loadingService.showSpinner();
    
    return forkJoin(settingsCall, applePayEnabled, destinationAccounts, sourceAccounts, addFundsCs, confirmationCs).pipe(
      tap(() => { this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner()
      }),
      map(
        ([settings, applePayEnabled, destinationAccounts, sourceAccounts, addFundsCs, confirmationCs]) => ({ settings, applePayEnabled, destinationAccounts, sourceAccounts, recipientName, addFundsCs, confirmationCs}),
      )
    );
  }
}
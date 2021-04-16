import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { GuestDepositsService } from '@sections/guest/services/guest-deposits.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { forkJoin, of } from 'rxjs';
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
  constructor(private readonly depositService: DepositService, private readonly loadingService: LoadingService, private readonly commonService: CommonService, private readonly userFacadeService: UserFacadeService, private readonly guestDepositsService: GuestDepositsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const recipientName  = route.queryParams.recipientName;
    const recipientId = route.queryParams.userId;
    const addFundsContentStrings = this.commonService.loadContentString(ContentStringCategory.addFunds);
    const applePayEnabled = this.userFacadeService.isApplePayEnabled$();
    const settingsCall = this.depositService.getUserSettings(requiredSettings);
    const destinationAccounts = this.depositService.getUserAccounts();
    const sourceAccounts = this.depositService.getUserAccounts();
    // const sourceAccounts = this.guestDepositsService.guestAccounts();
    // const destinationAccounts = this.guestDepositsService.userAccounts(recipientId);
    this.loadingService.showSpinner();
    
    return forkJoin(settingsCall, applePayEnabled, destinationAccounts, sourceAccounts, addFundsContentStrings).pipe(
      tap(() => { this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner()
      }),
      map(
        ([settings, applePayEnabled, destinationAccounts, sourceAccounts]) => ({ settings, applePayEnabled, destinationAccounts, sourceAccounts, recipientName }),
      )
    );
  }
}

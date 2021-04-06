import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { CONTENT_STRINGS } from '../../../accounts.config';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { tap } from 'rxjs/operators';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { Settings } from '../../../../../app.global';

@Injectable()
export class DepositResolver implements Resolve<Observable<any>> {

  constructor(private readonly depositService: DepositService,
              private readonly loadingService: LoadingService) {}

  resolve(): Observable<any> {

    const requiredSettings = [
      Settings.Setting.DEPOSIT_TENDERS,
      Settings.Setting.PAYMENT_TYPES,
      Settings.Setting.BILLME_MAPPING,
      Settings.Setting.FREEFORM_DEPOSIT_ENABLED,
      Settings.Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD,
      Settings.Setting.BILLME_AMOUNTS,
      Settings.Setting.BILLME_AMOUNT_MIN,
      Settings.Setting.BILLME_AMOUNT_MAX,
      Settings.Setting.BILLME_FREEFORM_ENABLED,
      Settings.Setting.CREDIT_PAYMENT_SYSTEM_TYPE,
      Settings.Setting.CREDITCARD_AMOUNT_MIN,
      Settings.Setting.CREDITCARD_AMOUNT_MAX,
    ];

    const contentStringCall = this.depositService.initContentStringsList();
    const accountsCall = this.depositService.getUserAccounts();
    const settingsCall = this.depositService.getUserSettings(requiredSettings);
    this.loadingService.showSpinner();

    return zip(contentStringCall, settingsCall, accountsCall).pipe(
      tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner())
    );
  }
}

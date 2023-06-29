import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { Settings } from '../../../app.global';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Injectable()
export class AutoDepositPageResolver {
  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly loadingService: LoadingService
  ) {}

  resolve(): Observable<SettingInfo[]> {
    const requiredSettings = [
      Settings.Setting.AUTO_DEPOSIT_PAYMENT_TYPES,
      Settings.Setting.PAYMENT_TYPES,
      Settings.Setting.LOW_BALANCE_AUTO_DEPOSIT_ENABLED,
      Settings.Setting.BILLME_AMOUNT_MAX,
      Settings.Setting.LOW_BALANCE_AMOUNTS,
      Settings.Setting.CREDITCARD_AMOUNT_MAX,
      Settings.Setting.CREDITCARD_AMOUNT_MIN,
      Settings.Setting.BILLME_AMOUNT_MIN,
      Settings.Setting.LOW_BALANCE_FREEFORM_ENABLED,
      Settings.Setting.BILLME_FREEFORM_ENABLED,
      Settings.Setting.BILLME_AMOUNTS,
      Settings.Setting.BILLME_MAPPING,
      Settings.Setting.FREEFORM_DEPOSIT_ENABLED,
      Settings.Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD,
      Settings.Setting.AUTO_DEPOSIT_ENABLED,
      Settings.Setting.AUTO_DEPOSIT_TENDERS,
      Settings.Setting.CREDIT_PAYMENT_SYSTEM_TYPE
    ];

    this.loadingService.showSpinner();
    return this.settingsFacadeService.getSettings(requiredSettings).pipe(
      take(1),
      tap(null, this.loadingService.closeSpinner.bind(this.loadingService))
    );
  }
}

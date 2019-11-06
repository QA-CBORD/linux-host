import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingService } from '@core/service/settings/setting.service';
import { SYSTEM_SETTINGS_CONFIG } from '@sections/ordering/ordering.config';
import { first, switchMap, tap } from 'rxjs/operators';
import { CartService, MerchantAccountInfoList, MerchantService } from '@sections/ordering';
import { SettingInfo } from '@core/model/configuration/setting-info.model';

@Injectable()
export class CartResolver implements Resolve<Observable<[SettingInfo[], MerchantAccountInfoList]>> {

  constructor(private readonly settingService: SettingService,
              private readonly loadingService: LoadingService,
              private readonly merchantService: MerchantService,
              private readonly cartService: CartService) {
  }

  resolve(): Observable<[SettingInfo[], MerchantAccountInfoList]> {
    this.loadingService.showSpinner();

    const requireSettings = [
      SYSTEM_SETTINGS_CONFIG.displayTenders,
      SYSTEM_SETTINGS_CONFIG.displayCreditCard,
    ];

    const accountsCall = this.cartService.merchant$.pipe(
      switchMap(({id}) => this.merchantService.getMerchantPaymentAccounts(id))
    );
    const settingsCall = this.settingService.getUserSettings(requireSettings);

    return zip(settingsCall ,accountsCall).pipe(
      tap(this.loadingService.closeSpinner.bind(this.loadingService)),
      first()
    );
  }
}

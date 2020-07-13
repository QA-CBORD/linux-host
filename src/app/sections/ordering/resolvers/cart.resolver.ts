import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { finalize, first, skipWhile, switchMap } from 'rxjs/operators';
import { CartService, MerchantAccountInfoList, MerchantService } from '@sections/ordering';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { Settings } from '../../../app.global';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Injectable()
export class CartResolver implements Resolve<Observable<[SettingInfo[], MerchantAccountInfoList]>> {

  constructor(private readonly settingsFacadeService: SettingsFacadeService,
              private readonly loadingService: LoadingService,
              private readonly merchantService: MerchantService,
              private readonly cartService: CartService) {
  }

  resolve(): Observable<[SettingInfo[], MerchantAccountInfoList]> {
    this.loadingService.showSpinner();

    const requiredSettings = [
      Settings.Setting.DISPLAY_TENDERS,
      Settings.Setting.DISPLAY_CREDIT_CARDS,
      Settings.Setting.CREDIT_PAYMENT_SYSTEM_TYPE
    ];

    const accountsCall = this.cartService.merchant$.pipe(
      skipWhile((merchant) => !merchant),
      switchMap(({id}) => this.merchantService.getMerchantPaymentAccounts(id))
    );
    const settingsCall = this.settingsFacadeService.getSettings(requiredSettings);

    return zip(settingsCall ,accountsCall).pipe(
      finalize(() => this.loadingService.closeSpinner()),
      first()
    );
  }
}

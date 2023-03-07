import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { finalize, first, map, skipWhile, switchMap } from 'rxjs/operators';
import { CartService, MerchantAccountInfoList, MerchantService } from '@sections/ordering';
import { Settings } from '../../../app.global';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

type CartResolvedData = Observable<{ accounts: MerchantAccountInfoList }>;

@Injectable()
export class CartResolver implements Resolve<CartResolvedData> {
  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly loadingService: LoadingService,
    private readonly merchantService: MerchantService,
    private readonly cartService: CartService
  ) {}

  resolve(): CartResolvedData {
    this.loadingService.showSpinner();

    const requiredSettings = [
      Settings.Setting.DISPLAY_TENDERS,
      Settings.Setting.DISPLAY_CREDIT_CARDS,
      Settings.Setting.CREDIT_PAYMENT_SYSTEM_TYPE,
    ];

    const accountsCall = this.cartService.merchant$.pipe(
      skipWhile(merchant => !merchant),
      switchMap(({ id }) => this.merchantService.getMerchantPaymentAccounts(id)),
      first()
    );
    const settingsCall = this.settingsFacadeService.getSettings(requiredSettings);

    return forkJoin([settingsCall, accountsCall]).pipe(
      map(([, accounts]) => ({ accounts })),
      finalize(() => this.loadingService.closeSpinner())
    );
  }
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { finalize, first, map, skipWhile, switchMap } from 'rxjs/operators';
import { CartService, MerchantAccountInfoList, MerchantService } from '@sections/ordering';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { Settings } from '../../../app.global';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { CommonService } from '@shared/services/common.service';
import { CheckingServiceFacade } from '@sections/check-in/services/checkin-service-facade';
import { CheckingContentCsModel } from '@sections/check-in/contents-strings/checkin-content-string.model';

@Injectable()
export class CartResolver implements Resolve<Observable<[SettingInfo[], MerchantAccountInfoList, CheckingContentCsModel]>> {

  constructor(private readonly settingsFacadeService: SettingsFacadeService,
              private readonly loadingService: LoadingService,
              private readonly merchantService: MerchantService,
              private readonly cartService: CartService, 
              private readonly checkinService: CheckingServiceFacade) {
  }

  resolve(): Observable<[SettingInfo[], MerchantAccountInfoList,  CheckingContentCsModel]> {
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
    const checkinPageContentString$ = this.checkinService.loadAllContentString();

    return zip(settingsCall ,accountsCall,  checkinPageContentString$).pipe(
      map((response ) =>  response),
      finalize(() => this.loadingService.closeSpinner()),
      first()
    );
  }
}

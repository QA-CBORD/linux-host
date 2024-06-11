import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { MerchantApiService } from '@core/service/merchant-api-service/merchant-api.service';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { MerchantStateService } from '@core/states/merchant/merchant-state.service';
import { MerchantSearchOptionName, PAYMENT_SYSTEM_TYPE } from '@sections/ordering/ordering.config';
import { AuthFacadeService } from '../auth/auth.facade.service';
import { MerchantSearchOptions } from '@sections/ordering/utils/merchant-search-options';
import { MerchantInfo } from '@sections/ordering/shared/models/merchant-info.model';
import { MerchantSettingInfo } from '@sections/ordering/shared/models/merchant-setting.model';
import { MerchantSearchOption } from '@sections/ordering';
import { parseArrayFromString } from '@core/utils/general-helpers';

@Injectable({
  providedIn: 'root',
})
export class MerchantFacadeService extends ServiceStateFacade {
  private readonly stateManager: MerchantStateService = new MerchantStateService();

  constructor(private readonly apiService: MerchantApiService, private readonly authFacadeService: AuthFacadeService) {
    super();
  }

  get merchants$(): Observable<MerchantInfo[]> {
    return this.stateManager.state$;
  }

  get isStateUpdating$(): Observable<boolean> {
    return this.stateManager.isUpdating$;
  }

  fetchMerchants$(options: MerchantSearchOptions = new MerchantSearchOptions(), noGuestFiltering?: boolean) {
    return this.authFacadeService.isGuestUser().pipe(
      switchMap(isGuestUser => {
        options = this.addRequiredOption(options);
        if (!isGuestUser) {
          const call = this.apiService.getMerchants(options);
          return this.makeRequestWithUpdatingStateHandler<MerchantInfo[]>(call, this.stateManager).pipe(
            tap((data: MerchantInfo[]) => this.updateState(data))
          );
        }
        const call = this.apiService.getMerchants(options);
        return this.makeRequestWithUpdatingStateHandler<MerchantInfo[]>(call, this.stateManager).pipe(
          map(data => (noGuestFiltering && data) || this.filterMerchantList(data)),
          tap((data: MerchantInfo[]) => this.updateState(data))
        );
      })
    );
  }

  removeFavoriteMerchant(merchantId: string): Observable<boolean> {
    return this.apiService.removeFavoriteMerchant(merchantId);
  }

  addFavoriteMerchant(merchantId: string): Observable<string> {
    return this.apiService.addFavoriteMerchant(merchantId);
  }

  fetchFavoriteMerchants() {
    return this.apiService.getFavoriteMerchants();
  }
  fetchMechantSettingdById(merchantId: string) {
    return this.apiService.getMerchantSettings(merchantId);
  }

  private filterMerchantList(merchantList: MerchantInfo[]): MerchantInfo[] {
    return merchantList.filter(merchant => this.isCreditCardSupported(merchant));
  }

  isCreditCardSupported(merchant: MerchantInfo) {
    const key = 'merchant.payment.supported_types';
    const setting: MerchantSettingInfo = merchant?.settings?.map[key];
    const parsedValue = parseArrayFromString(setting?.value);
    return parsedValue.some(({ payment_system_type }) => payment_system_type == PAYMENT_SYSTEM_TYPE.USAEPAY);
  }

  private addRequiredOption(options: MerchantSearchOptions) {
    if (!options) options = new MerchantSearchOptions();
    const exists = options
      .getSearchOptions()
      .some(({ key }: MerchantSearchOption) => key === MerchantSearchOptionName.INCLUDE_SETTINGS);
    if (!exists) {
      options.addSearchOption({
        key: MerchantSearchOptionName.INCLUDE_SETTINGS,
        value: 1,
      });
    }
    return options;
  }

  fetchMenuMerchants(options: MerchantSearchOptions = new MerchantSearchOptions(), noGuestFiltering?: boolean) {
    return this.authFacadeService.isGuestUser().pipe(
      switchMap(isGuestUser => {
        if (!isGuestUser) {
          return this.apiService.getMenuMerchants(options);
        }
        options = this.addRequiredOption(options);
        return this.apiService
          .getMenuMerchants(options)
          .pipe(map(data => (noGuestFiltering && data) || this.filterMerchantList(data)));
      })
    );
  }

  private updateState(data: MerchantInfo[]) {
    this.stateManager.updateState(data);
  }

  clearState() {
    this.stateManager.clearState();
  }
}

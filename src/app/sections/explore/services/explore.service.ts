import { Injectable } from '@angular/core';
import { MerchantFacadeService } from '@core/facades/merchant/merchant-facade.service';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { MenuMerchantFacadeService } from '@core/facades/menu-merchant/menu-merchant-facade.service';
import { combineLatest, Observable, zip } from 'rxjs';
import { MerchantInfo, MerchantSearchOptions } from '@sections/ordering';
import { map } from 'rxjs/operators';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { Settings } from '../../../app.global';
import { exploreMerchantSorting } from '@core/utils/general-helpers';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';

@Injectable({
  providedIn: 'root',
})
export class ExploreService {
  constructor(
    private readonly merchantFacadeService: MerchantFacadeService,
    private readonly favoriteMerchantsFacadeService: FavoriteMerchantsFacadeService,
    private readonly menuMerchantFacadeService: MenuMerchantFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly institutionService: InstitutionFacadeService
  ) {}

  get merchants$(): Observable<MerchantInfo[]> {
    return combineLatest(
      this.merchantFacadeService.merchants$,
      this.favoriteMerchantsFacadeService.favoriteMerchants$,
      this.menuMerchantFacadeService.menuMerchants$,
      this.getFoodSetting()
    ).pipe(
      map(([merchants, favMerchants, menuMerchants, enableFoodSetting]) =>
        this.updateMerchantInfo(enableFoodSetting, merchants, favMerchants, menuMerchants)
      )
    );
  }

  async isGuestOrderEnabled(merchant: MerchantInfo): Promise<boolean> {
    if (await this.authFacadeService.isGuestUser().toPromise()) {
      if (await this.institutionService.guestOrderEnabled) {
        return this.merchantFacadeService.isCreditCardSupported(merchant);
      }
    }
    return Promise.resolve(false);
  }

  get sortedMerchants$(): Observable<MerchantInfo[]> {
    return this.merchants$.pipe(map(exploreMerchantSorting));
  }

  getFoodSetting(): Observable<SettingInfo> {
    return this.settingsFacadeService.getSetting(Settings.Setting.FOOD_ENABLED);
  }

  getMerchantById$(id: string): Observable<MerchantInfo> {
    return this.merchants$.pipe(map(merchants => merchants.find(({ id: mId }) => id === mId)));
  }

  getInitialMerchantData$(): Observable<[MerchantInfo[], MerchantInfo[], MerchantInfo[]]> {
    const options = new MerchantSearchOptions();
    return zip(
      this.merchantFacadeService.fetchMerchants$(options, true),
      this.favoriteMerchantsFacadeService.fetchFavoritesMerchants$(),
      this.menuMerchantFacadeService.fetchMenuMerchant$(options, true)
    );
  }

  private updateMerchantInfo(
    foodEnabledSetting: SettingInfo,
    merchants: MerchantInfo[] = [],
    favMerchants: MerchantInfo[] = [],
    menuMerchants: MerchantInfo[] = []
  ): MerchantInfo[] {
    const isFoodEnabled = foodEnabledSetting && Boolean(Number(foodEnabledSetting.value));
    const menuIds = menuMerchants.map(({ id }) => id);
    const favIds = favMerchants.map(({ id }) => id);

    return merchants.map(merchant => ({
      ...merchant,
      isFavorite: favIds.includes(merchant.id),
      isAbleToOrder: menuIds.includes(merchant.id) && isFoodEnabled,
    }));
  }
}

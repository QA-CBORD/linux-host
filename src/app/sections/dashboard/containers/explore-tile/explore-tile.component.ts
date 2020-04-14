import { Component, OnInit } from '@angular/core';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { MerchantInfo } from '@sections/ordering';
import { combineLatest, Observable, zip } from 'rxjs';
import { MerchantFacadeService } from '@core/facades/merchant/merchant-facade.service';
import { Environment } from '../../../../environment';
import { NAVIGATE, Settings } from '../../../../app.global';
import { EXPLORE_ROUTING } from '@sections/explore/explore.config';
import { Router } from '@angular/router';
import { finalize, map, take } from 'rxjs/operators';
import { exploreMerchantSorting } from '@core/utils/general-helpers';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { MenuMerchantFacadeService } from '@core/facades/menu-merchant/menu-merchant-facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Component({
  selector: 'st-explore-tile',
  templateUrl: './explore-tile.component.html',
  styleUrls: ['./explore-tile.component.scss'],
})
export class ExploreTileComponent implements OnInit {
  favMerchants$: Observable<MerchantInfo[]>;
  awsImageUrl: string = Environment.getImageURL();
  isLoading: boolean = true;

  constructor(private readonly merchantFacadeService: MerchantFacadeService,
              private readonly favMerchantFacadeService: FavoriteMerchantsFacadeService,
              private readonly menuMerchantFacadeService: MenuMerchantFacadeService,
              private readonly settingsFacadeService: SettingsFacadeService,
              private readonly router: Router) {
  }

  ngOnInit() {
    zip(
      this.merchantFacadeService.fetchMerchants$(),
      this.favMerchantFacadeService.fetchFavoritesMerchants$(),
      this.menuMerchantFacadeService.fetchMenuMerchant$(),
    ).pipe(
      take(1),
      finalize(() => this.isLoading = false),
    ).subscribe();

    this.favMerchants$ = combineLatest(
      this.merchantFacadeService.merchants$,
      this.favMerchantFacadeService.favoriteMerchants$,
      this.menuMerchantFacadeService.menuMerchants$,
      this.getFoodSetting(),
    ).pipe(
      map(([merchant, fav, menuMerchants, setting]) => {
        const updated = this.updateMerchantFavoriteInfo(merchant, fav, menuMerchants, setting);
        return exploreMerchantSorting(updated).slice(0, 2);
      }),
    );
  }

  async onMerchantClicked(id: string) {
    await this.router.navigate(
      [NAVIGATE.explore, EXPLORE_ROUTING.merchantDetails, id],
      { skipLocationChange: true },
    );
  }

  private updateMerchantFavoriteInfo(
    merchants: MerchantInfo[] = [],
    favMerchants: MerchantInfo[] = [],
    menuMerchants: MerchantInfo[] = [],
    foodEnabledSetting: SettingInfo): MerchantInfo[] {
    const isFoodEnabled = foodEnabledSetting && Boolean(Number(foodEnabledSetting.value));
    const menuIds = menuMerchants.map(({ id }) => id);
    const favIds = favMerchants.map(({ id }) => id);

    return merchants.map(merchant => ({
      ...merchant,
      isFavorite: favIds.includes(merchant.id),
      isAbleToOrder: menuIds.includes(merchant.id) && isFoodEnabled,
    }));
  }

  getFoodSetting(): Observable<SettingInfo> {
    const setting = Settings.Setting.FOOD_ENABLED.split('.');
    return this.settingsFacadeService.fetchSettingByConfig$(
      { domain: setting[0], category: setting[1], name: setting[2] },
    );
  }
}

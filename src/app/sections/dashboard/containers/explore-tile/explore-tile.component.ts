import { Component, OnInit } from '@angular/core';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { MerchantInfo } from '@sections/ordering';
import { combineLatest, Observable } from 'rxjs';
import { MerchantFacadeService } from '@core/facades/merchant/merchant-facade.service';
import { Settings } from '../../../../app.global';
import { EXPLORE_ROUTING } from '@sections/explore/explore.config';
import { finalize, map, take } from 'rxjs/operators';
import { exploreMerchantSorting } from '@core/utils/general-helpers';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { MenuMerchantFacadeService } from '@core/facades/menu-merchant/menu-merchant-facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { environmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ExploreService } from '@sections/explore/services/explore.service';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';

@Component({
  selector: 'st-explore-tile',
  templateUrl: './explore-tile.component.html',
  styleUrls: ['./explore-tile.component.scss'],
})
export class ExploreTileComponent implements OnInit {
  favMerchants$: Observable<MerchantInfo[]>;
  awsImageUrl: string = this.environmentFacadeService.getImageURL();
  isLoading = true;

  constructor(
    private readonly environmentFacadeService: environmentFacadeService,
    private readonly merchantFacadeService: MerchantFacadeService,
    private readonly favMerchantFacadeService: FavoriteMerchantsFacadeService,
    private readonly menuMerchantFacadeService: MenuMerchantFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly exploreService: ExploreService,
    private readonly routingService: NavigationService
  ) {}

  ngOnInit() {
    this.getMerchants();
  }

  getMerchants() {
    this.exploreService
      .getInitialMerchantData$()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();

    this.favMerchants$ = combineLatest(
      this.merchantFacadeService.merchants$,
      this.favMerchantFacadeService.favoriteMerchants$,
      this.menuMerchantFacadeService.menuMerchants$,
      this.getFoodSetting()
    ).pipe(
      map(([merchant, fav, menuMerchants, setting]) => {
        const updated = this.updateMerchantFavoriteInfo(merchant, fav, menuMerchants, setting);
        return exploreMerchantSorting(updated).slice(0, 2);
      })
    );
  }

  async onMerchantClicked(id: string) {
    await this.routingService.navigate([APP_ROUTES.explore, EXPLORE_ROUTING.merchantDetails, id]);
  }

  private updateMerchantFavoriteInfo(
    merchants: MerchantInfo[] = [],
    favMerchants: MerchantInfo[] = [],
    menuMerchants: MerchantInfo[] = [],
    foodEnabledSetting: SettingInfo
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

  getFoodSetting(): Observable<SettingInfo> {
    return this.settingsFacadeService.getSetting(Settings.Setting.FOOD_ENABLED);
  }
}

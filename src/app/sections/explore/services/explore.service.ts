import { Injectable } from '@angular/core';
import { MerchantFacadeService } from '@core/facades/merchant/merchant-facade.service';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { MenuMerchantFacadeService } from '@core/facades/menu-merchant/menu-merchant-facade.service';
import { combineLatest, Observable, zip } from 'rxjs';
import { MerchantInfo } from '@sections/ordering';
import { map } from 'rxjs/operators';

@Injectable()
export class ExploreService {

  constructor(private readonly merchantFacadeService: MerchantFacadeService,
              private readonly favoriteMerchantsFacadeService: FavoriteMerchantsFacadeService,
              private readonly menuMerchantFacadeService: MenuMerchantFacadeService) {
  }

  get merchants$(): Observable<MerchantInfo[]> {
    return combineLatest(
      this.merchantFacadeService.merchants$,
      this.favoriteMerchantsFacadeService.favoriteMerchants$,
      this.menuMerchantFacadeService.menuMerchants$,
    ).pipe(
      map(([merchants, favMerchants, menuMerchants]) =>
        this.updateMerchantInfo(merchants, favMerchants, menuMerchants)),
    );
  }

  get sortedMerchants$(): Observable<MerchantInfo[]> {
    return this.merchants$.pipe(
      map((merchants) => {
        const sortedByFavorite = ExploreService.sortBy(merchants, 'isFavorite');
        const sortedByRange = ExploreService.sortBy(sortedByFavorite, 'distanceFromUser');
        return ExploreService.sortBy(sortedByRange, 'openNow');
      }),
    );
  }

  getMerchantById$(id: string): Observable<MerchantInfo> {
    return this.merchants$.pipe(
      map(merchants => merchants.find(({ id: mId }) => id === mId)),
    );
  }

  getInitialMerchantData$(): Observable<[MerchantInfo[], MerchantInfo[], MerchantInfo[]]> {
    return zip(
      this.merchantFacadeService.fetchMerchants$(),
      this.favoriteMerchantsFacadeService.fetchFavoritesMerchants$(),
      this.menuMerchantFacadeService.fetchMenuMerchant$(),
    );
  }

  private updateMerchantInfo(
    merchants: MerchantInfo[] = [],
    favMerchants: MerchantInfo[] = [],
    menuMerchants: MerchantInfo[] = []): MerchantInfo[] {
    const menuIds = menuMerchants.map(({ id }) => id);
    const favIds = favMerchants.map(({ id }) => id);

    return merchants.map(merchant => ({
      ...merchant,
      isFavorite: favIds.includes(merchant.id),
      isAbleToOrder: menuIds.includes(merchant.id),
    }));
  }

  private static sortBy(merchants: MerchantInfo[], fieldName: keyof MerchantInfo): MerchantInfo[] {
    return merchants.sort(
      (merchant1, merchant2) => Number(merchant2[fieldName]) - Number(merchant1[fieldName]),
    );
  }
}

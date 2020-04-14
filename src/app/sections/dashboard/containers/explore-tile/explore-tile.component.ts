import { Component, OnInit } from '@angular/core';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { MerchantInfo } from '@sections/ordering';
import { combineLatest, Observable, zip } from 'rxjs';
import { MerchantFacadeService } from '@core/facades/merchant/merchant-facade.service';
import { Environment } from '../../../../environment';
import { NAVIGATE } from '../../../../app.global';
import { EXPLORE_ROUTING } from '@sections/explore/explore.config';
import { Router } from '@angular/router';
import { finalize, map, take } from 'rxjs/operators';
import { exploreMerchantSorting } from '@core/utils/general-helpers';

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
              private readonly router: Router) {
  }

  ngOnInit() {
    zip(
      this.merchantFacadeService.fetchMerchants$(),
      this.favMerchantFacadeService.fetchFavoritesMerchants$(),
    ).pipe(
      take(1),
      finalize(() => this.isLoading = false),
    ).subscribe();

    this.favMerchants$ = combineLatest(
      this.merchantFacadeService.merchants$,
      this.favMerchantFacadeService.favoriteMerchants$,
    ).pipe(
      map(([merchant, fav]) => {
        const updated = this.updateMerchantFavoriteInfo(merchant, fav);
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
  ): MerchantInfo[] {
    const favIds = favMerchants.map(({ id }) => id);

    return merchants.map(merchant => ({
      ...merchant,
      isFavorite: favIds.includes(merchant.id),
    }));
  }
}

import { Component, OnInit } from '@angular/core';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { MerchantInfo } from '@sections/ordering';
import { Observable } from 'rxjs';
import { MerchantFacadeService } from '@core/facades/merchant/merchant-facade.service';
import { Environment } from '../../../../environment';
import { finalize, map } from 'rxjs/operators';
import { NAVIGATE } from '../../../../app.global';
import { EXPLORE_ROUTING } from '@sections/explore/explore.config';
import { Router } from '@angular/router';

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
    this.favMerchants$ = this.merchantFacadeService.fetchMerchants$().pipe(
      map(merchants => merchants.slice(0, 2)),
      finalize(() => this.isLoading = false),
    );
  }

  async onMerchantClicked(id: string) {
    await this.router.navigate(
      [NAVIGATE.explore, EXPLORE_ROUTING.merchantDetails, id],
      { skipLocationChange: true },
    );
  }
}

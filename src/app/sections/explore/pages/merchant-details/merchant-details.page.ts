import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantInfo } from '@sections/ordering';
import { Observable } from 'rxjs';
import { Environment } from '../../../../environment';
import { NAVIGATE } from '../../../../app.global';
import { take } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { ExploreService } from '@sections/explore/services/explore.service';

@Component({
  selector: 'st-merchant-details',
  templateUrl: './merchant-details.page.html',
  styleUrls: ['./merchant-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantDetailsPage implements OnInit {
  merchant$: Observable<MerchantInfo>;
  awsImageUrl: string = Environment.getImageURL();
  isHoursHidden: boolean = true;
  filledStarPath: string = '/assets/icon/star-filled.svg';
  blankStarPath: string = '/assets/icon/star-outline.svg';

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly exploreService: ExploreService,
              private readonly router: Router,
              private readonly loadingService: LoadingService,
              private readonly merchantIdsFacadeService: FavoriteMerchantsFacadeService) {
  }

  ngOnInit() {
    this.merchant$ = this.exploreService.getMerchantById$(this.activatedRoute.snapshot.params.id);
  }

  toggleHours() {
    this.isHoursHidden = !this.isHoursHidden;
  }

  navigateToMerchant(merchantId: string) {
    this.router.navigate([NAVIGATE.ordering], { skipLocationChange: true, queryParams: { merchantId } });
  }

  async onFavoriteTrigger(merchant: MerchantInfo): Promise<void> {
    await this.loadingService.showSpinner();
    try {
      await this.merchantIdsFacadeService.resolveFavoriteMerchant(merchant).pipe(take(1)).toPromise();
      await this.merchantIdsFacadeService.fetchFavoritesMerchants$().pipe(take(1)).toPromise();
    } finally {
      await this.loadingService.closeSpinner();
    }
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantInfo } from '@sections/ordering';
import { Observable } from 'rxjs';
import { PATRON_NAVIGATION } from '../../../../app.global';
import { take } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { ExploreService } from '@sections/explore/services/explore.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'st-merchant-details',
  templateUrl: './merchant-details.page.html',
  styleUrls: ['./merchant-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantDetailsPage implements OnInit {
  merchant$: Observable<MerchantInfo>;
  awsImageUrl: string = this.environmentFacadeService.getImageURL();
  isHoursHidden: boolean = true;
  isNotesHidden: boolean = true;
  filledStarPath: string = '/assets/icon/star-filled.svg';
  blankStarPath: string = '/assets/icon/star-outline.svg';

  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly exploreService: ExploreService,
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly merchantIdsFacadeService: FavoriteMerchantsFacadeService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.merchant$ = this.exploreService.getMerchantById$(this.activatedRoute.snapshot.params.id);
  }

  toggleHours() {
    this.isHoursHidden = !this.isHoursHidden;
  }

  toggleNotes() {
    this.isNotesHidden = !this.isNotesHidden;
  }

  navigateToMerchant(merchantId: string) {
    this.router.navigate([PATRON_NAVIGATION.ordering], { queryParams: { merchantId } });
  }

  async onFavoriteTrigger(merchant: MerchantInfo): Promise<void> {
    const { isFavorite, name: n } = merchant;
    const message = `Merchant ${n} was ${isFavorite ? 'removed from' : 'added to'} favorites`;
    await this.loadingService.showSpinner();
    try {
      await this.merchantIdsFacadeService
        .resolveFavoriteMerchant(merchant)
        .pipe(take(1))
        .toPromise();
      await this.merchantIdsFacadeService
        .fetchFavoritesMerchants$()
        .pipe(take(1))
        .toPromise();
      await this.onToastDisplayed(message);
    } finally {
      await this.loadingService.closeSpinner();
    }
  }

  private async onToastDisplayed(message: string): Promise<void> {
    await this.toastService.showToast({ message, position: 'bottom' });
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantInfo, MerchantSettingInfo } from '@sections/ordering';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { ExploreService } from '@sections/explore/services/explore.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { PAYMENT_SYSTEM_TYPE } from '@sections/ordering/ordering.config';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';

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
  guestOrderEnabled: boolean = true;
  filledStarPath: string = '/assets/icon/star-filled.svg';
  blankStarPath: string = '/assets/icon/star-outline.svg';

  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly exploreService: ExploreService,
    private readonly loadingService: LoadingService,
    private readonly merchantIdsFacadeService: FavoriteMerchantsFacadeService,
    private readonly toastService: ToastService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly routingService: NavigationService
  ) {}

  ngOnInit() {
    this.merchant$ = this.exploreService.getMerchantById$(this.activatedRoute.snapshot.params.id).pipe(
      take(1),
      switchMap(merchant => {
        return this.authFacadeService.isGuestUser().pipe(
          take(1),
          map(isGuestUser => {
            if (isGuestUser) {
              this.guestOrderEnabled = this.checkGuestOrderEnabled(merchant);
            }
            return merchant;
          })
        );
      })
    );
  }

  private checkGuestOrderEnabled(merchant: MerchantInfo) {
    const setting: MerchantSettingInfo = merchant.settings.map['merchant.payment.supported_types'];
    const parsedValue: any[] = JSON.parse(setting.value);
    return parsedValue.some(({ payment_system_type }) => payment_system_type == PAYMENT_SYSTEM_TYPE.USAEPAY);
  }

  toggleHours() {
    this.isHoursHidden = !this.isHoursHidden;
  }

  toggleNotes() {
    this.isNotesHidden = !this.isNotesHidden;
  }

  navigateToMerchant(merchantId: string) {
    this.routingService.navigate([APP_ROUTES.ordering], { queryParams: { merchantId } });
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

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ExploreService } from '@sections/explore/services/explore.service';
import { MerchantInfo } from '@sections/ordering';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { APP_ROUTES } from '@sections/section.config';
import { NavigationService } from '@shared/services/navigation.service';
import { Observable, firstValueFrom } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Settings } from 'src/app/app.global';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';

@Component({
  selector: 'st-merchant-details',
  templateUrl: './merchant-details.page.html',
  styleUrls: ['./merchant-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantDetailsPage implements OnInit {
  merchant$: Observable<MerchantInfo>;
  awsImageUrl: string = this.environmentFacadeService.getImageURL();
  isHoursHidden = true;
  isNotesHidden = true;
  guestOrderEnabled = true;
  filledStarPath = '/assets/icon/star-filled.svg';
  blankStarPath = '/assets/icon/star-outline.svg';
  lockDown: (Observable<boolean> | Observable<ContentStringInfo>)[];

  lockDownMessage: string;
  lockDownFlag: boolean;

  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly exploreService: ExploreService,
    private readonly loadingService: LoadingService,
    private readonly merchantIdsFacadeService: FavoriteMerchantsFacadeService,
    private readonly toastService: ToastService,
    private readonly routingService: NavigationService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly authFacadeService: AuthFacadeService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService
  ) {}

  ngOnInit() {
    this.merchant$ = this.retrieveSeletectedMerchant(this.activatedRoute.snapshot.params.id);
    this.loadStringsAndSettings();
  }

  async loadStringsAndSettings() {
    this.lockDownMessage = await firstValueFrom(
      this.contentStringsFacadeService.getContentStringValue$(
        CONTENT_STRINGS_DOMAINS.get_common,
        CONTENT_STRINGS_CATEGORIES.error_message,
        ORDERING_CONTENT_STRINGS.disableOrdering
      )
    );

    this.lockDownFlag = await firstValueFrom(
      this.settingsFacadeService
        .fetchSettingValue$(Settings.Setting.LOCK_DOWN_ORDERING)
        .pipe(map(sett => Boolean(sett === '1')))
    );
  }

  private retrieveSeletectedMerchant(merchantId: string): Observable<MerchantInfo> {
    return this.exploreService.getMerchantById$(merchantId).pipe(
      tap(async merchant => {
        const currentUserIsAGuest = await this.authFacadeService.isGuestUser().toPromise();
        if (currentUserIsAGuest) {
          this.guestOrderEnabled = await this.exploreService.isGuestOrderEnabled(merchant);
          this.changeDetector.detectChanges();
        }
      })
    );
  }

  toggleHours() {
    this.isHoursHidden = !this.isHoursHidden;
  }

  toggleNotes() {
    this.isNotesHidden = !this.isNotesHidden;
  }

  async navigateToMerchant(merchantId: string) {
    if (this.lockDownFlag) {
      await this.toastService.showError(this.lockDownMessage);
      return;
    }

    this.routingService.navigate([APP_ROUTES.ordering], { queryParams: { merchantId } });
  }

  async onFavoriteTrigger(merchant: MerchantInfo): Promise<void> {
    const { isFavorite, name: n } = merchant;
    const message = `Merchant ${n} was ${isFavorite ? 'removed from' : 'added to'} favorites`;
    await this.loadingService.showSpinner();
    try {
      await this.merchantIdsFacadeService.resolveFavoriteMerchant(merchant).pipe(take(1)).toPromise();
      await this.merchantIdsFacadeService.fetchFavoritesMerchants$().pipe(take(1)).toPromise();
      await this.onToastDisplayed(message);
    } finally {
      await this.loadingService.closeSpinner();
    }
  }

  private async onToastDisplayed(message: string): Promise<void> {
    await this.toastService.showToast({ message, position: 'bottom' });
  }
}

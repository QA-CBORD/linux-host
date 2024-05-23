import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { FavoriteMerchantsFacadeService } from '@core/facades/favourite-merchant/favorite-merchants-facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ExploreService } from '@sections/explore/services/explore.service';
import { CartService, MerchantInfo } from '@sections/ordering';
import { OrderingResolver } from '@sections/ordering/resolvers';
import { ActiveCartService } from '@sections/ordering/services/active-cart.service';
import { OrderActionSheetService } from '@sections/ordering/services/odering-actionsheet.service';
import { Schedule } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { LockDownService } from '@shared/index';
import { Observable, firstValueFrom } from 'rxjs';
import {  take, tap } from 'rxjs/operators';

@Component({
  selector: 'st-merchant-details',
  templateUrl: './merchant-details.page.html',
  styleUrls: ['./merchant-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantDetailsPage implements OnInit, AfterViewInit {
  merchant$: Observable<MerchantInfo>;
  awsImageUrl: string = this.environmentFacadeService.getImageURL();
  isHoursHidden = true;
  isNotesHidden = true;
  guestOrderEnabled = true;
  filledStarPath = '/assets/icon/star-filled.svg';
  blankStarPath = '/assets/icon/star-outline.svg';
  orderSchedule: Schedule;
  private readonly orderActionSheetService = inject(OrderActionSheetService);
  private readonly orderingResolverService = inject(OrderingResolver);
  private readonly cartService = inject(CartService);
  private readonly activeCartService = inject(ActiveCartService);

  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly exploreService: ExploreService,
    private readonly loadingService: LoadingService,
    private readonly merchantIdsFacadeService: FavoriteMerchantsFacadeService,
    private readonly toastService: ToastService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly authFacadeService: AuthFacadeService,
    private readonly lockDownService: LockDownService
  ) {}

  ngOnInit() {
    this.merchant$ = this.retrieveSeletectedMerchant(this.activatedRoute.snapshot.params.id);
    this.loadStringsAndSettings();
  }
  async ngAfterViewInit(): Promise<void> {
    this.orderSchedule = this.orderSchedule = await this.cartService.orderSchedule;
  }

  async loadStringsAndSettings() {
    this.lockDownService.loadStringsAndSettings();
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
    if (this.lockDownService.isLockDownOn()) {
      return;
    }

    this.activeCartService.preValidateOrderFlow(
      merchantId,
      this.openOrderOptions.bind(this, merchantId),
      this.orderSchedule
    );
  }

  async openOrderOptions(merchantId: string) {
    await firstValueFrom(this.orderingResolverService.resolve());
    this.orderActionSheetService.openOrderOptionsByMerchantId(merchantId);
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

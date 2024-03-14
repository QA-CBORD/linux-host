import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { ToastService } from '@core/service/toast/toast.service';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { APP_ROUTES } from '@sections/section.config';
import { LockDownService } from '@shared/index';
import { NavigationService } from '@shared/services/navigation.service';
import { Observable, iif } from 'rxjs';
import { first, map, switchMap, take } from 'rxjs/operators';
import { LOCAL_ROUTING, MerchantSettings, ORDERING_CONTENT_STRINGS, TOAST_MESSAGES } from './ordering.config';
import { CartService, MerchantService } from './services';
import { MerchantInfo, MerchantOrderTypesInfo } from './shared/models';
import { OrderOptionsActionSheetComponent } from './shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';

@Component({
  selector: 'st-ordering.page',
  templateUrl: './ordering.page.html',
  styleUrls: ['./ordering.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderingPage implements OnInit {
  merchantList$: Observable<MerchantInfo[]>;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  searchString = '';

  constructor(
    private readonly modalController: ModalsService,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly cartService: CartService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly orderingService: OrderingService,
    private readonly routingService: NavigationService,
    private readonly lockDownService: LockDownService
  ) {}

  ngOnInit() {
    this.merchantList$ = this.merchantService.menuMerchants$;
    this.initContentStrings();
  }

  async ionViewDidEnter() {
    this.handleActiveMerchantInRoute();
    await this.loadingService.closeSpinner();
  }

  async merchantClickHandler(merchantInfo: MerchantInfo) {
    if (this.lockDownService.isLockDownOn()) {
      return;
    }

    if (merchantInfo.walkout) {
      await this.toastService.showError(TOAST_MESSAGES.isWalkOut);
      return;
    }

    if (!this.isOpen(merchantInfo)) {
      this.onToastDisplayed(`${merchantInfo.name} is currently closed, please try again during operating hours`);
      return;
    }

    this.openOrderOptions(merchantInfo);
  }

  async favouriteHandler({ isFavorite, id }): Promise<void> {
    await this.loadingService.showSpinner();
    const addedToFav = await this.contentStrings.labelAddedToFavorites.pipe(take(1)).toPromise();
    const removeToFav = await this.contentStrings.labelRemovedFromFavorites.pipe(take(1)).toPromise();

    iif(() => isFavorite, this.merchantService.removeFavoriteMerchant(id), this.merchantService.addFavoriteMerchant(id))
      .pipe(
        switchMap(() => this.merchantService.getMerchantsWithFavoriteInfo()),
        first()
      )
      .subscribe(
        () => this.onToastDisplayed(isFavorite ? removeToFav : addedToFav),
        null,
        () => this.loadingService.closeSpinner()
      );
  }

  private openOrderOptions(merchant) {
    this.cartService.setActiveMerchant(merchant);
    this.actionSheet(merchant.orderTypes, merchant.id, merchant.storeAddress, merchant.settings, merchant.timeZone);
  }

  private async actionSheet(orderTypes: MerchantOrderTypesInfo, merchantId, storeAddress, settings, timeZone) {
    const footerButtonName = 'continue';
    let cssClass = 'order-options-action-sheet';
    cssClass += orderTypes.delivery && orderTypes.pickup ? ' order-options-action-sheet-p-d' : '';
    this.merchantService.orderTypes = orderTypes;
    this.cartService.removeOrderDetailsOptions();

    const modal = await this.modalController.createActionSheet(
      {
        component: OrderOptionsActionSheetComponent,
        cssClass,
        componentProps: {
          orderTypes,
          footerButtonName,
          merchantId,
          storeAddress,
          settings,
          timeZone,
        },
      },
      true
    );

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.cartService.clearActiveOrder();
        this.cartService.setActiveMerchantsMenuByOrderOptions(data.dueTime, data.orderType, data.address, data.isASAP);
        this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.fullMenu]);
      }
    });
    await modal.present();
  }

  private async handleActiveMerchantInRoute(): Promise<void> {
    const merchantId = this.activatedRoute.snapshot.queryParams.merchantId;
    if (merchantId) {
      const merchant = await this.merchantList$
        .pipe(
          map((merchants: MerchantInfo[]) => merchants.find(({ id }) => id === merchantId)),
          first()
        )
        .toPromise();

      if (!merchant) {
        this.onToastDisplayed('We were unable to find your merchant - Please try again');
        return;
      }
      if (!this.isOpen(merchant)) {
        this.onToastDisplayed(`${merchant.name} is currently closed, please try again during operating hours`);
        return;
      }
      this.openOrderOptions(merchant);
    }
  }

  private async onToastDisplayed(message: string): Promise<void> {
    await this.toastService.showToast({ message, position: 'bottom', duration: 4000 });
  }

  private isOpen(merchant: MerchantInfo): boolean {
    return merchant.openNow || parseInt(merchant.settings.map[MerchantSettings.orderAheadEnabled].value) === 1;
  }

  private async initContentStrings() {
    this.contentStrings.labelAddedToFavorites = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelAddedToFavorites
    );
    this.contentStrings.labelRemovedFromFavorites = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelRemovedFromFavorites
    );
    this.contentStrings.buttonBack = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonBack);
    this.contentStrings.labelOrder = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelOrder);
    this.lockDownService.loadStringsAndSettings();
  }

  onSearchedValue(value: string) {
    this.searchString = value;
  }
}

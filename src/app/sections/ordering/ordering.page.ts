import { CartService, MerchantService } from './services';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { iif, Observable } from 'rxjs';
import { first, map, switchMap, take } from 'rxjs/operators';

import { MerchantInfo, MerchantOrderTypesInfo } from './shared/models';
import { LoadingService } from '@core/service/loading/loading.service';
import { OrderOptionsActionSheetComponent } from './shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_ROUTING, ORDERING_CONTENT_STRINGS } from './ordering.config';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';

@Component({
  selector: 'st-ordering.page',
  templateUrl: './ordering.page.html',
  styleUrls: ['./ordering.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderingPage implements OnInit {
  merchantList$: Observable<MerchantInfo[]>;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController,
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly orderingService: OrderingService
  ) {}

  ngOnInit() {
    this.merchantList$ = this.merchantService.menuMerchants$;
    this.initContentStrings();
    this.handleActiveMerchantInRoute();
  }

  merchantClickHandler(merchantInfo: MerchantInfo) {
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
      .subscribe(() => this.onToastDisplayed(isFavorite ? removeToFav : addedToFav), null, () =>
        this.loadingService.closeSpinner()
      );
  }

  locationPinHandler(event: string) {
    // TODO location feature
    // console.log(`Location Pin Clicked - Merch Id: ${event}`);
  }

  private openOrderOptions(merchant) {
    this.cartService.setActiveMerchant(merchant);
    this.actionSheet(merchant.orderTypes, merchant.id, merchant.storeAddress, merchant.settings);
  }

  private async actionSheet(orderTypes: MerchantOrderTypesInfo, merchantId, storeAddress, settings) {
    const footerButtonName = 'continue';
    let cssClass = 'order-options-action-sheet';
    cssClass += orderTypes.delivery && orderTypes.pickup ? ' order-options-action-sheet-p-d' : '';
    this.merchantService.orderTypes = orderTypes;

    const modal = await this.modalController.create({
      component: OrderOptionsActionSheetComponent,
      cssClass,
      componentProps: {
        orderTypes,
        footerButtonName,
        merchantId,
        storeAddress,
        settings,
      },
    });
    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.cartService.clearActiveOrder();
        this.cartService.setActiveMerchantsMenuByOrderOptions(data.dueTime, data.orderType, data.address, data.isASAP);
        this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.fullMenu]);
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
      this.openOrderOptions(merchant);
    }
  }

  private async onToastDisplayed(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }

  private initContentStrings() {
    this.contentStrings.labelAddedToFavorites = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelAddedToFavorites
    );
    this.contentStrings.labelRemovedFromFavorites = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelRemovedFromFavorites
    );
    this.contentStrings.buttonBack = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonBack);
    this.contentStrings.labelOrder = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelOrder);
  }
}

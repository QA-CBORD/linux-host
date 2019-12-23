import { MerchantService, CartService } from './services';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { Observable, iif } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { MerchantInfo, MerchantOrderTypesInfo } from './shared/models';
import { LoadingService } from '@core/service/loading/loading.service';
import { OrderOptionsActionSheetComponent } from './shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_ROUTING } from './ordering.config';
import { NAVIGATE } from 'src/app/app.global';

@Component({
  selector: 'st-ordering.page',
  templateUrl: './ordering.page.html',
  styleUrls: ['./ordering.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderingPage implements OnInit {
  merchantList$: Observable<MerchantInfo[]>;

  constructor(
    private readonly modalController: ModalController,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly toastController: ToastController,
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.merchantList$ = this.merchantService.menuMerchants$;
    this.handleActiveMerchantInRoute();
  }

  merchantClickHandler(merchantInfo: MerchantInfo) {
    this.openOrderOptions(merchantInfo);
  }

  favouriteHandler({ isFavorite, id }) {
    this.loadingService.showSpinner();
    iif(() => isFavorite, this.merchantService.removeFavoriteMerchant(id), this.merchantService.addFavoriteMerchant(id))
      .pipe(
        switchMap(() => this.merchantService.getMerchantsWithFavoriteInfo()),
        first()
      )
      .subscribe(
        () => {
          const message = isFavorite ? 'Removed from favorites' : 'Added to favorites';
          this.onToastDisplayed(message);
        },
        null,
        () => this.loadingService.closeSpinner()
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
        settings
      },
    });
    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.cartService.clearActiveOrder();
        this.cartService.setActiveMerchantsMenuByOrderOptions(data.dueTime, data.orderType, data.address, data.isASAP);
        this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.fullMenu], { skipLocationChange: true });
      }
    });
    await modal.present();
  }

  private async handleActiveMerchantInRoute(): Promise<void> {
    const merchantId = this.activatedRoute.snapshot.queryParams.merchantId;
    if(merchantId) {
      const merchant = await this.merchantList$.pipe(
        map((merchants: MerchantInfo[]) => merchants.find(({id}) => id === merchantId)),
        first()
      ).toPromise();
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
}

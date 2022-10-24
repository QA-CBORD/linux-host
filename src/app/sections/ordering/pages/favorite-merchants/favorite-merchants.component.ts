import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { FavoriteMerchantsService } from './services/favorite-merchants.service';
import { switchMap, take, first } from 'rxjs/operators';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { MerchantInfo, MerchantOrderTypesInfo } from '../../shared/models';
import { CartService, MerchantService } from '../../services';
import { OrderOptionsActionSheetComponent } from '../../shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { LOCAL_ROUTING, ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalsService } from '@core/service/modals/modals.service';

@Component({
  selector: 'st-favorite-merchants',
  templateUrl: './favorite-merchants.component.html',
  styleUrls: ['./favorite-merchants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteMerchantsComponent implements OnInit {
  merchantList: MerchantInfo[] = [];
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly modalController: ModalsService,
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly favoriteMerchantsService: FavoriteMerchantsService,
    private readonly cartService: CartService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly orderingService: OrderingService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ data }) => (this.merchantList = data));
    this.initContentStrings();
  }

  backToOrdering() {
    this.router.navigate([PATRON_NAVIGATION.ordering]);
  }

  async merchantClickHandler(merchantInfo): Promise<void> {
    this.openOrderOptions(merchantInfo);
  }

  async favouriteHandler({ id }): Promise<void> {
    await this.loadingService.showSpinner();
    const removeFavoriteMessage = await this.contentStrings.labelRemovedFromFavorites.pipe(first()).toPromise();
    this.merchantService
      .removeFavoriteMerchant(id)
      .pipe(
        switchMap(() => this.favoriteMerchantsService.getFavoriteMerchants()),
        take(1)
      )
      .subscribe(
        data => {
          this.merchantList = [...data];
          this.cdRef.detectChanges();
          this.onToastDisplayed(removeFavoriteMessage);
          this.loadingService.closeSpinner();
        },
        () => this.loadingService.closeSpinner()
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  locationPinHandler(event: string) {
    // console.log(`Location Pin Clicked - Merch Id: ${event}`);
  }

  private async openOrderOptions(merchant): Promise<void> {
    await this.cartService.setActiveMerchant(merchant);
    await this.actionSheet(merchant.orderTypes, merchant.id, merchant.storeAddress, merchant.settings,merchant.timeZone);
  }

  private async actionSheet(orderTypes: MerchantOrderTypesInfo, merchantId, storeAddress, settings,timeZone): Promise<void> {
    const footerButtonName = 'continue';
    let cssClass = 'order-options-action-sheet';
    cssClass += orderTypes.delivery && orderTypes.pickup ? ' order-options-action-sheet-p-d' : '';

    const modal = await this.modalController.createActionSheet({
      component: OrderOptionsActionSheetComponent,
      cssClass,
      componentProps: {
        orderTypes,
        footerButtonName,
        merchantId,
        storeAddress,
        settings,
        timeZone
      },
    });
    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.cartService.setActiveMerchantsMenuByOrderOptions(data.dueTime, data.orderType, data.address, data.isASAP);
        this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.fullMenu]);
      }
    });
    await modal.present();
  }

  private async onToastDisplayed(message: string): Promise<void> {
    await this.toastService.showToast({ message });
  }

  private initContentStrings() {
    this.contentStrings.backToOrdering = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.backToOrdering
    );
    this.contentStrings.labelEmptyFavorites = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelEmptyFavorites
    );
    this.contentStrings.labelFavorites = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelFavorites
    );
    this.contentStrings.labelRemovedFromFavorites = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelRemovedFromFavorites
    );
  }
}

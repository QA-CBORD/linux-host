import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@core/service/toast/toast.service';
import { OrderActionSheetService } from './services/odering-actionsheet.service';
import { LockDownService } from '@shared/index';
import { Observable, iif } from 'rxjs';
import { finalize, first, switchMap, tap } from 'rxjs/operators';
import { ORDERING_CONTENT_STRINGS, TOAST_MESSAGES } from './ordering.config';
import { CartService, MerchantService } from './services';
import { MerchantInfo } from './shared/models';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'st-ordering.page',
  templateUrl: './ordering.page.html',
  styleUrls: ['./ordering.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderingPage implements OnInit {
  merchantList$: Observable<MerchantInfo[]>;
  searchString = '';
  private readonly orderActionSheetService = inject(OrderActionSheetService);
  private readonly translateService = inject(TranslateService);
  constructor(
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly lockDownService: LockDownService,
    private readonly alertController: AlertController,
    private readonly cartService: CartService
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

    // const hasItemsInCart = (await lastValueFrom(this.cartService.menuItems$.pipe(first()))) > 0;
    // const merchant = (await lastValueFrom(this.cartService.merchant$.pipe(first())));
    // const merchantHasChanged = merchant && merchant.id !== merchantInfo.id;


    // if (hasItemsInCart && merchantHasChanged) {
    //   this.showActiveCartWarning(merchantInfo);
    //   return;
    // }

    this.openOrderOptions(merchantInfo);
  }

  async showActiveCartWarning(merchantInfo: MerchantInfo) {
    const alert = await this.alertController.create({
      cssClass: 'active_cart',
      header: this.translateService.instant('patron-ui.ordering.active_cart_alert_change_title'),
      message: this.translateService.instant('patron-ui.ordering.active_cart_alert_change_msg'),
      buttons: [
        {
          text: this.translateService.instant('patron-ui.ordering.active_cart_alert_change_cancel'),
          role: 'cancel',
          cssClass: 'button__option_cancel',
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: this.translateService.instant('patron-ui.ordering.active_cart_alert_change_proceed'),
          role: 'confirm',
          cssClass: 'button__option_confirm',
          handler: () => {
            this.cartService.clearActiveOrder();
            this.openOrderOptions(merchantInfo);
          },
        },
      ],
    });

    await alert.present();
    return alert.onDidDismiss();
  }

  async favouriteHandler({ isFavorite, id }): Promise<void> {
    await this.loadingService.showSpinner();

    iif(() => isFavorite, this.merchantService.removeFavoriteMerchant(id), this.merchantService.addFavoriteMerchant(id))
      .pipe(
        switchMap(() => this.merchantService.getMerchantsWithFavoriteInfo()),
        first(),
        tap(() =>
          this.onToastDisplayed(
            this.translateService.instant(
              `patron-ui.ordering.${
                isFavorite
                  ? ORDERING_CONTENT_STRINGS.labelRemovedFromFavorites
                  : ORDERING_CONTENT_STRINGS.labelAddedToFavorites
              }`
            )
          )
        ),
        finalize(() => this.loadingService.closeSpinner())
      )
      .subscribe();
  }

  private openOrderOptions(merchant: MerchantInfo) {
    this.orderActionSheetService.openOrderOptions(merchant);
  }

  private async handleActiveMerchantInRoute(): Promise<void> {
    const merchantId = this.activatedRoute.snapshot.queryParams.merchantId;
    if (merchantId) {
      this.orderActionSheetService.openOrderOptionsByMerchantId(merchantId);
    }
  }

  private async onToastDisplayed(message: string): Promise<void> {
    await this.toastService.showToast({ message, position: 'bottom', duration: 4000 });
  }

  private async initContentStrings() {
    await this.lockDownService.loadStringsAndSettings();
  }

  onSearchedValue(value: string) {
    this.searchString = value;
  }
}

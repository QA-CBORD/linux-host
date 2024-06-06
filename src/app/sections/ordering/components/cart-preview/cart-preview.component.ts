import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartService } from '@sections/ordering/services';
import { ActiveCartParams, ActiveCartService } from '@sections/ordering/services/active-cart.service';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { OrderItemDetailsModule } from '@sections/ordering/shared/ui-components/order-item-details/order-item-details.module';
import { StButtonModule, StHeaderModule } from '@shared/ui-components';
@Component({
  standalone: true,
  providers: [PriceUnitsResolverPipe],
  templateUrl: './cart-preview.component.html',
  styleUrl: './cart-preview.component.scss',
  imports: [
    IonicModule,
    StHeaderModule,
    TranslateModule,
    PriceUnitsResolverModule,
    OrderItemDetailsModule,
    IonicModule,
    CommonModule,
    StButtonModule,
  ],
})
export class CartPreviewComponent implements AfterViewInit {
  private readonly modalService = inject(ModalsService);
  private readonly cartService = inject(CartService);
  private readonly alertController = inject(AlertController);
  private readonly translateService = inject(TranslateService);
  private readonly activeCartService = inject(ActiveCartService);

  isCartPreview: boolean = true;
  private activeCartParams: ActiveCartParams;

  async ngAfterViewInit(): Promise<void> {
    this.activeCartParams = {
      isCartPreview: this.isCartPreview,
    };
  }


  onClose = () => {
    this.modalService.dismiss();
  };

  async redirectToCart() {
    this.activeCartService.validateCartItemsAndNavigate(() =>
      this.activeCartService.redirectToCart(this.activeCartParams)
    );
  }

  async addMoreItems() {
    this.activeCartService.validateCartItemsAndNavigate(() =>
      this.activeCartService.addMoreItems()
    );
  }

  removeCart() {
    this.confirmCartRemoval();
  }

  private async confirmCartRemoval() {
    const alert = await this.alertController.create({
      cssClass: 'remove-active-cart',
      message: this.translateService.instant('patron-ui.ordering.cart_preview_confirm_removal_msg'),
      mode: 'md',
      buttons: [
        {
          text: this.translateService.instant('patron-ui.ordering.cart_preview_cancel_removal_btn'),
          role: 'cancel',
          cssClass: 'button__option_cancel',
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: this.translateService.instant('patron-ui.ordering.cart_preview_confirm_removal_btn'),
          role: 'confirm',
          cssClass: 'button__option_confirm',
          handler: () => {
            this.cartService.clearActiveOrder();
            this.cartService.clearCart();
            this.onClose();
          },
        },
      ],
    });

    await alert.present();
  }

  get orderInfo$() {
    return this.cartService.orderInfo$;
  }

  get merchant$() {
    return this.cartService.merchant$;
  }
}

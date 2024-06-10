import { Injectable, inject } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ItemsUnavailableComponent } from '@sections/ordering/shared/ui-components/items-unavailable/items-unavailable.component';
import { PATRON_ROUTES } from '@sections/section.config';
import { NavigationService } from '@shared/index';
import { parseISO } from 'date-fns';
import { first, firstValueFrom, lastValueFrom } from 'rxjs';
import { CartService } from '.';
import { CartPreviewComponent } from '../components/cart-preview/cart-preview.component';
import { LOCAL_ROUTING, ORDER_TYPE } from '../ordering.config';
import { OrderingService } from './ordering.service';

export type ActiveCartParams = {
  isCartPreview?: boolean;
};
@Injectable({
  providedIn: 'root',
})
export class ActiveCartService {
  private readonly alertController = inject(AlertController);
  private readonly translateService = inject(TranslateService);
  private readonly orderingService = inject(OrderingService);
  private readonly cartService = inject(CartService);
  private readonly routingService = inject(NavigationService);
  private readonly modalService = inject(ModalsService);
  private readonly loadingService = inject(LoadingService);

  constructor() {}

  async showChangeMerchantWarning(openOrderOptions: () => void) {
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
          handler: async () => {
            this.cartService.clearActiveOrder();
            this.cartService.clearCart();
            openOrderOptions();
          },
        },
      ],
    });

    await alert.present();
    return alert.onDidDismiss();
  }

  async preValidateOrderFlow(merchantId: string, onContinue: () => void) {
    const hasItemsInCart = (await lastValueFrom(this.cartService.menuItems$.pipe(first()))) > 0;
    const merchant = await lastValueFrom(this.cartService.merchant$.pipe(first()));
    const merchantHasChanged = merchant && merchant.id !== merchantId;

    if (hasItemsInCart && merchantHasChanged) {
      this.showChangeMerchantWarning(onContinue);
      return;
    }

    if (hasItemsInCart && !merchantHasChanged) {
      this.addMoreItems();
      return;
    }
    onContinue();
  }
  async showTimePastWarning(orderType: ORDER_TYPE) {
    const alert = await this.alertController.create({
      cssClass: 'active_cart',
      header:
        orderType === ORDER_TYPE.PICKUP
          ? this.translateService.instant('patron-ui.ordering.active_cart_alert_time_pickup_title')
          : this.translateService.instant('patron-ui.ordering.active_cart_alert_time_delivery_title'),
      message: this.translateService.instant('patron-ui.ordering.active_cart_alert_time_msg'),
      buttons: [
        {
          text: this.translateService.instant('patron-ui.ordering.active_cart_alert_time_cancel'),
          role: 'cancel',
          cssClass: 'button__option_cancel',
          handler: () => alert.dismiss(),
        },
        {
          text: this.translateService.instant('patron-ui.ordering.active_cart_alert_time_continue'),
          role: 'confirm',
          cssClass: 'button__option_confirm button__option_confirm_time',
          handler: () => this.navigateToFullMenu(true, false),
        },
      ],
    });

    await alert.present();
    return alert.onDidDismiss();
  }

  async getOrderTimeAvailability(): Promise<{ orderType: ORDER_TYPE; isTimeValid: boolean }> {
    const { dueTime, orderType, isASAP } = await firstValueFrom(this.cartService.orderDetailsOptions$);
    const isTimeValid = this.isOrderTimeValid(isASAP, String(dueTime));

    return { orderType, isTimeValid };
  }

  isOrderTimeValid(isASAP: boolean, time: string) {
    if (isASAP) return true;

    const targetDateTime = parseISO(time);
    const localTime = new Date();

    return targetDateTime.getTime() > localTime.getTime();
  }

  async addMoreItems() {
    const { isTimeValid, orderType } = await this.getOrderTimeAvailability();
    const { isASAP } = await firstValueFrom(this.cartService.orderDetailsOptions$);
    if (isTimeValid) {
      this.navigateToFullMenu(isASAP);
      return;
    }

    this.showTimePastWarning(orderType);
  }

  async validateCartItemsAndNavigate(navigateMethod: () => Promise<void>) {
    this.loadingService.showSpinner();
    const validatedCartItems = await firstValueFrom(this.cartService.validateCartItems(false));
    this.loadingService.closeSpinner();

    if (!validatedCartItems.orderRemovedItems?.length) return await navigateMethod();

    const unavailableItemsAlert = await this.modalService.createAlert({
      component: ItemsUnavailableComponent,
      componentProps: {
        orderRemovedItems: validatedCartItems.orderRemovedItems,
        mealBased: validatedCartItems.order?.mealBased,
      },
    });
    unavailableItemsAlert.onDidDismiss().then(async ({ role }) => {
      if (BUTTON_TYPE.CONTINUE === role) {
        this.cartService.removeCartItemsFromItemValidateResponse(validatedCartItems);
        if (validatedCartItems.order?.orderItems?.length) return await navigateMethod();
        return await this.addMoreItems();
      }
    });

    return unavailableItemsAlert.present();
  }

  async navigateToFullMenu(openTimeSlot?: boolean, canDismiss: boolean = true) {
    const params = {
      isExistingOrder: false,
      openTimeSlot: openTimeSlot,
      canDismiss: canDismiss,
    };
    const routed = await this.routingService.navigate([PATRON_ROUTES.ordering, LOCAL_ROUTING.fullMenu], {
      queryParams: { ...params },
    });
    if (routed) {
      this.modalService.dismiss();
    }
  }

  async redirectToCart({ isCartPreview }: ActiveCartParams) {
    const { isTimeValid, orderType } = await this.getOrderTimeAvailability();

    if (isTimeValid) {
      this.orderingService.redirectToCart(isCartPreview);
      return;
    }

    this.showTimePastWarning(orderType);
  }

  async openCartpreview() {
    const modal = await this.modalService.createActionSheet({
      component: CartPreviewComponent,
      cssClass: 'cart-preview-action-sheet',
    });

    await modal.present();
  }
}

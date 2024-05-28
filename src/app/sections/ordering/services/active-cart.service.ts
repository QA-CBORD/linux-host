import { Injectable, inject } from '@angular/core';
import { PATRON_ROUTES } from '@sections/section.config';
import { format, parseISO } from 'date-fns';
import { lastValueFrom, first, firstValueFrom } from 'rxjs';
import { CartPreviewComponent } from '../components/cart-preview/cart-preview.component';
import { ORDER_TYPE, LOCAL_ROUTING } from '../ordering.config';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { OrderingService } from './ordering.service';
import { CartService } from '.';
import { Schedule } from '../shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { NavigationService } from '@shared/index';
import { ModalsService } from '@core/service/modals/modals.service';
import { ItemsUnavailableComponent } from '@sections/ordering/shared/ui-components/items-unavailable/items-unavailable.component';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { LoadingService } from '@core/service/loading/loading.service';

export type ActiveCartParams = {
  orderSchedule: Schedule;
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
            openOrderOptions();
          },
        },
      ],
    });

    await alert.present();
    return alert.onDidDismiss();
  }

  async preValidateOrderFlow(merchantId: string, onContinue: () => void, orderSchedule: Schedule) {
    const hasItemsInCart = (await lastValueFrom(this.cartService.menuItems$.pipe(first()))) > 0;
    const merchant = await lastValueFrom(this.cartService.merchant$.pipe(first()));
    const merchantHasChanged = merchant && merchant.id !== merchantId;

    if (hasItemsInCart && merchantHasChanged) {
      this.showChangeMerchantWarning(onContinue);
      return;
    }

    if (hasItemsInCart && !merchantHasChanged) {
      this.addMoreItems({ orderSchedule });
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

  async getOrderTimeAvailability(orderSchedule: Schedule): Promise<{ orderType: ORDER_TYPE; isTimeValid: boolean }> {
    const { dueTime, orderType, isASAP } = await firstValueFrom(this.cartService.orderDetailsOptions$);
    const isTimeValid = this.isOrderTimeValid(isASAP, String(dueTime), orderSchedule);

    return { orderType, isTimeValid };
  }

  isOrderTimeValid(isASAP: boolean, time: string, orderSchedule: Schedule) {
    if (isASAP) return true;

    const dueTime = new Date(time);
    const dateString = format(parseISO(time), 'yyyy-MM-dd');
    const hour = dueTime.getHours();
    const minutes = dueTime.getMinutes();

    return orderSchedule?.days.some(
      date =>
        date.date === dateString &&
        date.hourBlocks.find(dateHour => dateHour.hour === hour && dateHour.minuteBlocks.includes(minutes))
    );
  }

  async addMoreItems({ orderSchedule }: ActiveCartParams) {
    const { isTimeValid, orderType } = await this.getOrderTimeAvailability(orderSchedule);
    const { isASAP } = await firstValueFrom(this.cartService.orderDetailsOptions$);
    if (isTimeValid) {
      this.navigateToFullMenu(isASAP);
      return;
    }

    this.showTimePastWarning(orderType);
  }

  async validateCartItemsAndNavigate(activeCartParams: ActiveCartParams, navigateMethod: () => Promise<void>) {
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
        return await this.addMoreItems(activeCartParams);
      }
    });

    return unavailableItemsAlert.present();
  }

  async navigateToFullMenu(openTimeSlot?: boolean, canDismiss: boolean = true) {
    const params = {
      isExistingOrder: true,
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

  async redirectToCart({ orderSchedule, isCartPreview }: ActiveCartParams) {
    const { isTimeValid, orderType } = await this.getOrderTimeAvailability(orderSchedule);

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

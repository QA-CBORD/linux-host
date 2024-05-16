import { Injectable, inject } from '@angular/core';
import { Schedule } from '@capacitor/local-notifications';
import { PATRON_ROUTES } from '@sections/section.config';
import { format, parseISO } from 'date-fns';
import { lastValueFrom, first, firstValueFrom } from 'rxjs';
import { CartPreviewComponent } from '../components/cart-preview/cart-preview.component';
import { ORDER_TYPE, LOCAL_ROUTING } from '../ordering.config';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ActiveCartService {

  private readonly alertController = inject(AlertController);
  //declare all services needed on this file
  

  constructor() { }

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
            this.clearActiveOrder();
            openOrderOptions();
          },
        },
      ],
    });

    await alert.present();
    return alert.onDidDismiss();
  }

  async preValidateOrderFlow(merchantId: string, onContinue: () => void, orderSchedule: Schedule) {
    const hasItemsInCart = (await lastValueFrom(this.menuItems$.pipe(first()))) > 0;
    const merchant = await lastValueFrom(this.merchant$.pipe(first()));
    const merchantHasChanged = merchant && merchant.id !== merchantId;

    if (hasItemsInCart && merchantHasChanged) {
      this.showChangeMerchantWarning(onContinue);
      return;
    }

    if (hasItemsInCart && !merchantHasChanged) {
      this.addMoreItems(orderSchedule);
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
    const { dueTime, orderType, isASAP } = await firstValueFrom(this.orderDetailsOptions$);
    const isTimeValid = this.isOrderTimeValid(isASAP, String(dueTime),orderSchedule);

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

  async addMoreItems(orderSchedule:Schedule, hasErrors?:boolean) {
    const { isTimeValid, orderType } = await this.getOrderTimeAvailability(orderSchedule);

    if (isTimeValid && !hasErrors) {
      this.navigateToFullMenu();
      return;
    }

    this.showTimePastWarning(orderType);
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

  async redirectToCart() {
    const { isTimeValid, orderType } = await this.getOrderTimeAvailability();

    if (isTimeValid && !this.hasErrors) {
      this.orderingService.redirectToCart(this.isCartPreview);
      return;
    }

    this.showActiveCartWarning(orderType);
  }

  async openCartpreview() {
    const modal = await this.modalService.createActionSheet({
      component: CartPreviewComponent,
      cssClass: 'cart-preview-action-sheet',
    });

    await modal.present();
  }
}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LOCAL_ROUTING, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { CartService, MerchantService } from '@sections/ordering/services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { OrderItemDetailsModule } from '@sections/ordering/shared/ui-components/order-item-details/order-item-details.module';
import { Schedule } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { PATRON_ROUTES } from '@sections/section.config';
import { NavigationService } from '@shared/services';
import { StButtonModule, StHeaderModule } from '@shared/ui-components';
import { format, parseISO } from 'date-fns';
import { combineLatest, firstValueFrom, of, switchMap, take } from 'rxjs';
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
  private readonly orderingService = inject(OrderingService);
  private readonly router = inject(NavigationService);
  private readonly alertController = inject(AlertController);
  private readonly translateService = inject(TranslateService);
  private readonly merchantService = inject(MerchantService);

  isCartPreiew: boolean = true;
  orderSchedule: Schedule;

  async ngAfterViewInit(): Promise<void> {
    const result = await firstValueFrom(
      combineLatest([this.cartService.orderDetailsOptions$, this.cartService.merchant$]).pipe(
        switchMap(([orderDetailsOptions, merchant]) =>
          orderDetailsOptions && merchant
            ? this.merchantService.getMerchantOrderSchedule(
                merchant.id,
                orderDetailsOptions.orderType,
                merchant.timeZone
              )
            : of(null)
        ),
        take(1)
      )
    );

    this.orderSchedule = result ? result : ({} as Schedule);
  }

  async showActiveCartWarning(orderType: ORDER_TYPE) {
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

  onClose = () => {
    this.modalService.dismiss();
  };

  redirectToCart = () => {
    this.orderingService.redirectToCart(this.isCartPreiew);
  };

  isOrdeTimeValid(isASAP: boolean, time: string) {
    if (isASAP) return true;

    const dueTime = new Date(time);
    const dateString = format(parseISO(time), 'yyyy-MM-dd');
    const hour = dueTime.getHours();
    const minutes = dueTime.getMinutes();

    return this.orderSchedule?.days.some(
      date =>
        date.date === dateString &&
        date.hourBlocks.find(dateHour => dateHour.hour === hour && dateHour.minuteBlocks.includes(minutes))
    );
  }

  async addMoreItems() {
    const { dueTime, orderType, isASAP } = await firstValueFrom(this.cartService.orderDetailsOptions$);
    const timeIsValid = this.isOrdeTimeValid(isASAP, String(dueTime));

    if (timeIsValid) {
      this.navigateToFullMenu();
      return;
    }

    this.showActiveCartWarning(orderType);
  }

  async navigateToFullMenu(openTimeSlot?: boolean, canDismiss: boolean = true) {
    const params = {
      isExistingOrder: true,
      openTimeSlot: openTimeSlot,
      canDismiss: canDismiss,
    };
    const routed = await this.router.navigate([PATRON_ROUTES.ordering, LOCAL_ROUTING.fullMenu], {
      queryParams: { ...params },
    });
    if (routed) {
      this.onClose();
    }
  }

  get orderInfo$() {
    return this.cartService.orderInfo$;
  }

  get merchant$() {
    return this.cartService.merchant$;
  }
}

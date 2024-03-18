import { Injectable, inject } from '@angular/core';
import { Observable, Subject, first, firstValueFrom, map, of, switchMap } from 'rxjs';
import { CartService } from './cart.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { MerchantInfo, MerchantOrderTypesInfo } from '../shared/models';
import { MerchantService } from './merchant.service';
import { OrderOptionsActionSheetComponent } from '../shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';
import { LOCAL_ROUTING } from '../ordering.config';
import { ToastService } from '@core/service/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class OrderActionSheetService {
  private openActionSheetSubject = new Subject<void>();
  private readonly cartService = inject(CartService);
  private readonly modalController = inject(ModalsService);
  private readonly merchantService = inject(MerchantService);
  private readonly routingService = inject(NavigationService);
  private readonly toastService = inject(ToastService);

  openActionSheet(): void {
    this.openActionSheetSubject.next();
  }

  get openActionSheet$(): Observable<void> {
    return this.openActionSheetSubject.asObservable();
  }

  async openOrderOptionsByMerchantId(merchantId: string) {
    const merchant = await firstValueFrom(
      this.merchantService.menuMerchants$.pipe(
        switchMap((merchants: MerchantInfo[]) => {
          if (merchants.length === 0) {
            return this.merchantService.getMerchantsWithFavoriteInfo();
          } else {
            return of(merchants);
          }
        }),
        map((merchants: MerchantInfo[]) => merchants.find(({ id }) => id === merchantId)),
        first()
      )
    );

    if (!merchant) {
      this.onToastDisplayed('We were unable to find your merchant - Please try again');
      return;
    }
    this.openOrderOptions(merchant);
  }

  openOrderOptions(merchant: MerchantInfo) {
    if (!this.merchantService.isOpen(merchant)) {
      this.onToastDisplayed(`${merchant.name} is currently closed, please try again during operating hours`);
      return;
    }
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

  private async onToastDisplayed(message: string): Promise<void> {
    await this.toastService.showToast({ message, position: 'bottom', duration: 4000 });
  }
}

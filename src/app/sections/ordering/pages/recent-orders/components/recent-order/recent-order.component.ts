import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantInfo, MerchantService, OrderInfo } from '@sections/ordering';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LOCAL_ROUTING, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { AddressInfo } from '@core/model/address/address-info';
import { NAVIGATE } from '../../../../../../app.global';
import { ModalController, PopoverController } from '@ionic/angular';
import { ORDERING_STATUS } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';
import { ConfirmPopoverComponent } from '@sections/ordering/pages/recent-orders/components/confirm-popover/confirm-popover.component';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { OrderOptionsActionSheetComponent } from '@sections/ordering/shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';

@Component({
  selector: 'st-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrderComponent implements OnInit {
  order$: Observable<OrderInfo>;
  address$: Observable<string>;
  merchant$: Observable<MerchantInfo>;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly merchantService: MerchantService,
              private readonly router: Router,
              private readonly popoverController: PopoverController,
              private readonly modalController: ModalController) {
  }

  ngOnInit() {
    const orderId = this.activatedRoute.snapshot.params.id;
    this.merchantService.recentOrders$.pipe(
      map(orders => orders.find(({ id }) => id === orderId)),
    ).subscribe(d => console.log(d));

    this.order$ = this.merchantService.recentOrders$.pipe(
      map(orders => orders.find(({ id }) => id === orderId)),
    );

    this.merchant$ = this.merchantService.recentOrders$.pipe(
      map(orders => orders.find(({ id }) => id === orderId)),
      switchMap(({ merchantId }) => this.merchantService.menuMerchants$.pipe(
        map(merchants => merchants.find(({ id }) => id === merchantId)),
        tap(m => console.log(m))
      )));

    this.order$.pipe(
      switchMap(({ merchantId }) =>
        this.merchantService.menuMerchants$.pipe(
          map((merchants) => merchants.find(({ id }) => id === merchantId))),
      ),
      map(({ storeAddress }) => storeAddress),
    ).subscribe(d => console.log(d));

    this.address$ = this.getAddress();
  }

  get orderStatus() {
    return ORDERING_STATUS;
  }

  getAddress(): Observable<string> {
    return this.address$ = this.order$.pipe(
      switchMap(({ type, deliveryAddressId }) =>
        type === ORDER_TYPE.DELIVERY
          ? this.getDeliveryAddress(deliveryAddressId)
          : this.getPickupAddress(),
      ),
    );
  }

  private getPickupAddress(): Observable<string> {
    return this.order$.pipe(
      switchMap(({ merchantId }) =>
        this.merchantService.menuMerchants$.pipe(
          map((merchants) => merchants.find(({ id }) => id === merchantId))),
      ),
      map(({ storeAddress }) => this.getPickupAddressAsString(storeAddress)),
    );
  }

  private getDeliveryAddress(deliveryId: string): Observable<string> {
    return this.merchantService.retrieveUserAddressList().pipe(
      map((addresses) =>
        addresses.find(({ id }) => id === deliveryId),
      ),
      map(address => this.getAddressAsString(address)),
    );
  }

  private getPickupAddressAsString({address1, address2, city}: AddressInfo): string {
    address1 = address1 ? address1 : '';
    address2 = address2 ? address2 : '';
    city = city ? city : '';
    debugger;
    return `${address1} ${address2} ${city}`.trim();
  }

  private getAddressAsString(addressInfo: AddressInfo = {} as AddressInfo): string {
    if (!Object.keys(addressInfo).length) return '';

    let { onCampus, address1, address2, city, room, building, state } = addressInfo;
    room = room ? `Room ${room}` : '';
    building = building ? building : '';
    address1 = address1 ? address1 : '';
    state = state ? state : '';
    address2 = address2 ? address2 : '';
    city = city ? city : '';

    return Boolean(Number(onCampus))
      ? `${room}, ${building}`.trim()
      : `${address1} ${address2}, ${city}, ${state}`.trim();
  }

  async back(): Promise<void> {
    await this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.recentOrders]);
  }

  private cancelOrder(): Observable<any> {
    return this.order$.pipe(
      switchMap(({ id }) => this.merchantService.cancelOrderById(id)),
    );
  }

  async showModal(): Promise<void> {
    this.order$.pipe(
      take(1),
      map(({ checkNumber }) => checkNumber),
    ).subscribe(await this.initModal.bind(this));
  }

  private async initModal(n: number): Promise<void> {
    const modal = await this.popoverController.create({
      component: ConfirmPopoverComponent,
      componentProps: {
        data: { message: `Are you sure you want to cancel order #${n}` },
      },
      animated: false,
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(({ role }) => {
      role === BUTTON_TYPE.CANCEL && this.cancelOrder().pipe(
        take(1),
      ).subscribe(response => response && this.back());
    });
    await modal.present();
  }

  onReorderHandler() {
    this.merchant$.pipe(take(1)).subscribe(this.orderOptions.bind(this));
  }

  private async orderOptions({ orderTypes, id: merchantId, storeAddress, settings }: MerchantInfo): Promise<void> {
    const footerButtonName = 'continue';
    const cssClass = 'order-options-action-sheet order-options-action-sheet-p-d';

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

    modal.onDidDismiss().then((d) => {
      console.log(d);
    });
    await modal.present();
  }
}

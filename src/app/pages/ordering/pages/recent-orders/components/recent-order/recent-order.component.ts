import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService, OrderInfo } from '@pages/ordering';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LOCAL_ROUTING, ORDER_TYPE } from '@pages/ordering/ordering.config';
import { AddressInfo } from '@core/model/address/address-info';
import { NAVIGATE } from '../../../../../../app.global';
import { ORDERING_STATUS } from '@pages/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';
import { PopoverController } from '@ionic/angular';
import { ConfirmPopoverComponent } from '@pages/ordering/pages/recent-orders/components/confirm-popover/confirm-popover.component';

@Component({
  selector: 'st-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrderComponent implements OnInit {
  order$: Observable<OrderInfo>;
  address$: Observable<string>;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly merchantService: MerchantService,
              private readonly router: Router,
              private readonly popoverController: PopoverController) {
  }

  ngOnInit() {
    const orderId = this.activatedRoute.snapshot.params.id;
    this.merchantService.recentOrders$.pipe(
      map(orders => orders.find(({ id }) => id === orderId)),
    ).subscribe(d => console.log(d));

    this.order$ = this.merchantService.recentOrders$.pipe(
      map(orders => orders.find(({ id }) => id === orderId)),
    );

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
      map(({ storeAddress }) => `${storeAddress.address1} ${storeAddress.address1} ${storeAddress.city}`),
    );
  }

  private getDeliveryAddress(deliveryId: string): Observable<string> {
    return this.merchantService.retrieveUserAddressList().pipe(
      tap(d => console.log(d, deliveryId)),
      map((addresses) =>
        addresses.find(({ id }) => id === deliveryId),
      ),
      map(address => this.getAddressAsString(address)),
    );
  }

  private getAddressAsString({ onCampus, address1, address2, city, room, building, state }: AddressInfo): string {
    room = room ? `Room ${room}` : '';
    building = building ? building : '';
    address1 = address1 ? address1 : '';
    state = state ? state : '';
    address2 = address2 ? address2 : '';
    city = city ? city : '';

    return Boolean(Number(onCampus))
      ? `${room}, ${building}`
      : `${address1} ${address2}, ${city}, ${state}`;
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

  private async initModal(n: number) {
    const modal = await this.popoverController.create({
      component: ConfirmPopoverComponent,
      componentProps: {
        data: { message: `Are you sure you want to cancel order #${n}` },
      },
      animated: false,
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(d => console.log(d));
    await modal.present();
  }
}

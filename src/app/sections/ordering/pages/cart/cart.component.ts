import { Component, OnInit } from '@angular/core';
import { CartService } from '@sections/ordering/services/cart.service';
import { Observable } from 'rxjs';
import { MerchantService, OrderInfo } from '@sections/ordering';
import { first, map, take } from 'rxjs/operators';
import { MerchantSettings, ORDER_TYPE } from '@sections/ordering/ordering.config';

@Component({
  selector: 'st-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    order$: Observable<Partial<OrderInfo>>;

  constructor(private readonly cartService: CartService,
              private readonly merchantService: MerchantService) { }

  ngOnInit() {
    this.order$ = this.cartService.orderInfo$;
    this.initAddressModalConfig();
  }

  async initAddressModalConfig() {
    let {address: defaultAddress, orderType} = await this.cartService.orderDetailsOptions$.pipe(take(1)).toPromise();
    const buildings = await this.merchantService.retrieveBuildings().pipe(first()).toPromise();
    const {storeAddress, settings, id: merchantId} = await this.cartService.merchant$.pipe(first()).toPromise();
    const [,deliveryLocations] = await this.merchantService.retrieveDeliveryAddresses(merchantId).pipe(first()).toPromise();
    const pickupLocations = await this.merchantService.retrievePickupLocations(storeAddress, settings.map[MerchantSettings.pickupLocationsEnabled]).pipe(first()).toPromise();

    console.log({
      defaultAddress,
      buildings,
      isOrderTypePickup: orderType === ORDER_TYPE.PICKUP,
      pickupLocations,
      deliveryAddresses: deliveryLocations,
      merchantId
    });
  }
}

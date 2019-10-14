import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService, OrderInfo } from '@sections/ordering';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ORDER_TYPE } from "@sections/ordering/ordering.config";
import { AddressInfo } from "@core/model/address/address-info";

@Component({
    selector: 'st-recent-order',
    templateUrl: './recent-order.component.html',
    styleUrls: ['./recent-order.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentOrderComponent implements OnInit {
    order$: Observable<OrderInfo>;
    address$: Observable<AddressInfo>;

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly merchantService: MerchantService) {
    }

    ngOnInit() {
        const orderId = this.activatedRoute.snapshot.params.id;
        this.merchantService.recentOrders$.pipe(
            map(orders => orders.find(({ id }) => id === orderId))
        ).subscribe(d => console.log(d));

        this.order$ = this.merchantService.recentOrders$.pipe(
            map(orders => orders.find(({ id }) => id === orderId))
        );

        this.order$.pipe(
            switchMap(({ merchantId }) =>
                this.merchantService.menuMerchants$.pipe(
                    map((merchants) => merchants.find(({id}) => id === merchantId)))

            ),
            map(({storeAddress}) => storeAddress)
        ).subscribe(d => console.log(d));

        this.address$ = this.getAddress();
    }

    getAddress(): Observable<AddressInfo> {
        return this.address$ = this.order$.pipe(
            switchMap(({ type, deliveryAddressId }) =>
                type === ORDER_TYPE.DELIVERY
                    ? this.getDeliveryAddress(deliveryAddressId)
                    : this.getPickupAddress()
            ),
        )
    }

    private getPickupAddress(): Observable<AddressInfo> {
       return this.order$.pipe(
            switchMap(({ merchantId }) =>
                this.merchantService.menuMerchants$.pipe(
                    map((merchants) => merchants.find(({id}) => id === merchantId)))

            ),
            map(({storeAddress}) => storeAddress)
        )
    }

    private getDeliveryAddress(deliveryId: string): Observable<AddressInfo> {
        return this.merchantService.retrieveUserAddressList().pipe(
            map((addresses) => addresses.find(({ id }) => id === deliveryId)),
            tap(d => console.log(d))
        )
    }
}

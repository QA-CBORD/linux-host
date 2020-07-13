import { Component, Input, OnInit } from '@angular/core';
import { LOCAL_ROUTING, ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { Router } from '@angular/router';
import { AddressInfo } from '@core/model/address/address-info';
import { MerchantService } from '@sections/ordering/services';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';

@Component({
  selector: 'st-order-address-list',
  templateUrl: './order-address-list.component.html',
  styleUrls: ['./order-address-list.component.scss'],
})
export class OrderAddressListComponent implements OnInit {
  @Input() addresses: AddressInfo[] = [];
  @Input() defaultAddress: string;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly merchantService: MerchantService,
    private readonly router: Router,
    private readonly orderingService: OrderingService
  ) {}

  ngOnInit() {
    this.contentStrings.labelAddNewAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelAddNewAddress
    );
  }

  itemSelected(address: AddressInfo) {
    this.merchantService.selectedAddress = address;
    this.router.navigate([`ordering/${LOCAL_ROUTING.addressEdit}`]);
  }
}

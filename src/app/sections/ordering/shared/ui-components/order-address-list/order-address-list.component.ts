import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LOCAL_ROUTING, ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { Router } from '@angular/router';
import { AddressInfo } from '@core/model/address/address-info';
import { MerchantService } from '@sections/ordering/services';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { PATRON_NAVIGATION, User } from 'src/app/app.global';

@Component({
  selector: 'st-order-address-list',
  templateUrl: './order-address-list.component.html',
  styleUrls: ['./order-address-list.component.scss'],
})
export class OrderAddressListComponent implements OnInit {
  @Input() addresses: AddressInfo[] = [];
  @Input() defaultAddress: string;
  @Input() displayAddNewAddress: boolean;
  @Output() onAddNewAddress: EventEmitter<void> = new EventEmitter<void>();

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
    this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.addressEdit]);
  }

  onAddNewAddressClick() {
    this.onAddNewAddress.emit();
  }
}

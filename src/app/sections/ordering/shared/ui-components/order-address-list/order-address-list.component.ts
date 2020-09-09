import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { AddressInfo } from '@core/model/address/address-info';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';

@Component({
  selector: 'st-order-address-list',
  templateUrl: './order-address-list.component.html',
  styleUrls: ['./order-address-list.component.scss'],
})
export class OrderAddressListComponent implements OnInit {
  @Input() addresses: AddressInfo[] = [];
  @Input() defaultAddress: string;
  @Input() displayAddNewAddress: boolean;
  @Output() onAddressSelected: EventEmitter<AddressInfo> = new EventEmitter<AddressInfo>();
  @Output() onAddNewAddress: EventEmitter<void> = new EventEmitter<void>();

  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly orderingService: OrderingService,
  ) {}

  ngOnInit() {
    this.contentStrings.labelAddNewAddress = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelAddNewAddress
    );
  }

  itemSelected(address: AddressInfo) {
    this.onAddressSelected.emit(address);
  }

  onAddNewAddressClick() {
    this.onAddNewAddress.emit();
  }
}

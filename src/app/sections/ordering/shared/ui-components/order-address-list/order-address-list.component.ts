import { Component, OnInit, Input } from '@angular/core';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { Router } from '@angular/router';
import { AddressInfo } from '@core/model/address/address-info';
import { MerchantService } from '@sections/ordering/services';

@Component({
  selector: 'st-order-address-list',
  templateUrl: './order-address-list.component.html',
  styleUrls: ['./order-address-list.component.scss'],
})
export class OrderAddressListComponent implements OnInit {
  @Input() addresses: AddressInfo[] = [];

  constructor(private readonly merchantService: MerchantService, private router: Router) {}

  ngOnInit() {}
  itemSelected(address: AddressInfo) {
    this.merchantService.selectedAddress = address;
    this.router.navigate([`ordering/${LOCAL_ROUTING.addressEdit}`], { skipLocationChange: true });
  }
}

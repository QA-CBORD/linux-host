import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '@core/service/user-service/user.service';
import { AddressInfo } from '@core/model/user/user-address.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { NgZone  } from '@angular/core';
import { LOCAL_ROUTING } from '@pages/ordering/ordering.config';
import { Router } from '@angular/router';

@Component({
  selector: 'st-order-address-list',
  templateUrl: './order-address-list.component.html',
  styleUrls: ['./order-address-list.component.scss'],
})
export class OrderAddressListComponent implements OnInit {
  
  userAddresses$: Observable<AddressInfo[]>;
  
  constructor(private userService: UserService, private zone: NgZone, private ref: ChangeDetectorRef, private router:Router) { }

  items:AddressInfo[];
  ngOnInit() {
    this.userAddresses$ = this.userService.getUserAddresses()
    this.userAddresses$
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.items = data;
          console.log('addresses', this.items);
          // debugger;
          /* this.zone.run(() => {
            console.log('force update the screen');
          }); */
          this.ref.detectChanges();
        },
        (e) => {
          console.log('error', e);
        }
      );
  }
  itemSelected(address:AddressInfo){
    this.router.navigate([`ordering/${LOCAL_ROUTING.addressEdit}`], { skipLocationChange: true });
  }
}

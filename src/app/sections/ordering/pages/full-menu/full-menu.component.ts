import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { MenuInfo } from '@sections/ordering/shared/models';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING, ORDER_TYPE } from '@sections/ordering/ordering.config';

@Component({
  selector: 'st-full-menu',
  templateUrl: './full-menu.component.html',
  styleUrls: ['./full-menu.component.scss'],
})
export class FullMenuComponent implements OnInit {

  menu$: Observable<MenuInfo>;
  orderInfo: { dueTime: Date, orderType: number, addressId };
  constructor(
    private readonly cartService: CartService,
    private readonly router: Router
  ) { }

  get orderType() {
    return this.orderInfo.orderType === ORDER_TYPE.PICKUP ? 'Pickup'
      : this.orderInfo.orderType === ORDER_TYPE.DELIVERY ? 'Delivery' : 'DineIn';
  }

  ngOnInit() {
    this.menu$ = this.cartService.menuInfo$
    this.cartService.orderDetailsOptions$.subscribe(orderDetails => {
      this.orderInfo = orderDetails;
      console.log(this.orderInfo)
    });
  }

  onCategoryClicked({ id }) {
    this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.menuCategoryItems, id], { skipLocationChange: true });
  }

}

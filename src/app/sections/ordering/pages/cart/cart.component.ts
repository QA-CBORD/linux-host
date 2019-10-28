import { Component, OnInit } from '@angular/core';
import { CartService } from '@sections/ordering/services/cart.service';
import { Observable } from 'rxjs';
import { OrderInfo } from '@sections/ordering';

@Component({
  selector: 'st-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    order$: Observable<Partial<OrderInfo>>;

  constructor(private readonly cartService: CartService) { }

  ngOnInit() {
    this.order$ = this.cartService.orderInfo$;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService, OrderInfo } from '@pages/ordering';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'st-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.scss'],
})
export class RecentOrderComponent implements OnInit {
  order$: Observable<OrderInfo>;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly merchantService: MerchantService) { }

  ngOnInit() {
    const orderId = this.activatedRoute.snapshot.params.id;
    this.merchantService.recentOrders$.pipe(
      map(orders => orders.find(({id}) => id === orderId))
    ).subscribe(d => console.log(d));
    this.order$ = this.merchantService.recentOrders$.pipe(
      map(orders => orders.find(({id}) => id === orderId))
    )
  }

}

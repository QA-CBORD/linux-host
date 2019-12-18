import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MerchantService, OrderInfo } from '@sections/ordering';
import { NAVIGATE } from '../../../../app.global';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { ORDERING_STATUS } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';

@Component({
  selector: 'st-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersComponent implements OnInit {
  pendingOrders$: Observable<OrderInfo[]>;
  completedOrders$: Observable<OrderInfo[]>;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly merchantService: MerchantService) {
  }

  ngOnInit() {
    this.initOrders();
  }

  async onOrderPicked(order: OrderInfo): Promise<void> {
    await this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.recentOrders, order.id],
      { skipLocationChange: true },
    );
  }

  async back(): Promise<void> {
    await this.router.navigate([NAVIGATE.ordering]);
  }

  private initOrders() {
    this.pendingOrders$ = this.merchantService.recentOrders$.pipe(map(this.getPendingOrders));
    this.completedOrders$ = this.merchantService.recentOrders$.pipe(map(this.getCompletedOrders));
  }

  private getPendingOrders(orders: OrderInfo[]): OrderInfo[] {
    return orders.filter((order: OrderInfo) => order.status === ORDERING_STATUS.PENDING);
  }

  private getCompletedOrders(orders: OrderInfo[]): OrderInfo[] {
    return orders.filter((order: OrderInfo) => order.status !== ORDERING_STATUS.PENDING);
  }
}

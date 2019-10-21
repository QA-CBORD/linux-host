import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderInfo } from '@pages/ordering';
import { ORDERING_STATUS } from '@pages/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';
import { NAVIGATE } from '../../../../app.global';
import { LOCAL_ROUTING } from '@pages/ordering/ordering.config';

@Component({
  selector: 'st-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersComponent implements OnInit {
  pendingOrders: OrderInfo[] = [];
  completedOrders: OrderInfo[] = [];

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.initOrders();
  }

  private initOrders() {
    const sourceOrders = this.activatedRoute.snapshot.data.recentOrders;
    this.pendingOrders = this.getPendingOrders(sourceOrders);
    this.completedOrders = this.getCompletedOrders(sourceOrders);
  }

  async onOrderPicked(order: OrderInfo) {
    await this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.recentOrders, order.id],
      { skipLocationChange: true },
    );
  }

  private getPendingOrders(orders: OrderInfo[]): OrderInfo[] {
    return this.getOrderByStatus(ORDERING_STATUS.PENDING, orders);
  }

  private getCompletedOrders(orders: OrderInfo[]): OrderInfo[] {
    return orders.filter((order: OrderInfo) => order.status != ORDERING_STATUS.PENDING);
  }

  private getOrderByStatus(orderStatus: ORDERING_STATUS, orders: OrderInfo[]): OrderInfo[] {
    return orders.filter((order: OrderInfo) => order.status === orderStatus);
  }

  async back(): Promise<void> {
    await this.router.navigate([NAVIGATE.ordering]);
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderInfo } from '@sections/ordering';
import { OrderStatus } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';
import { NAVIGATE } from '../../../../app.global';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';

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
    return this.getOrderByStatus(OrderStatus.PENDING, orders);
  }

  private getCompletedOrders(orders: OrderInfo[]): OrderInfo[] {
    return orders.filter((order: OrderInfo) => order.status != OrderStatus.PENDING);
  }

  private getOrderByStatus(orderStatus: OrderStatus, orders: OrderInfo[]): OrderInfo[] {
    return orders.filter((order: OrderInfo) => order.status === orderStatus);
  }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import { OrderInfo } from '../../ui-components';
import { OrderStatus } from './recent-orders-list-item/recent-orders.config';

@Component({
  selector: 'st-recent-orders-list',
  templateUrl: './recent-orders-list.component.html',
  styleUrls: ['./recent-orders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersListComponent implements OnChanges, OnInit {
  @Input('recentOrders') recentOrders: OrderInfo[];

  pendingOrders: OrderInfo[] = [];
  completedOrders: OrderInfo[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const newRecentOrdersChange: OrderInfo[] = changes.recentOrders.currentValue;
    if (newRecentOrdersChange === null) {
      console.log('Recent Orders null');
      return;
    }
    this.pendingOrders = this.getPendingOrders(newRecentOrdersChange);
    this.completedOrders = this.getCompletedOrders(newRecentOrdersChange);
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

  trackOrdersById(index: number, { id }: OrderInfo): string {
    return id;
  }
}

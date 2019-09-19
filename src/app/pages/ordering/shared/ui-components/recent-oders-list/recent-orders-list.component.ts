import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OrderInfo } from '..';

@Component({
  selector: 'st-recent-orders-list',
  templateUrl: './recent-orders-list.component.html',
  styleUrls: ['./recent-orders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersListComponent implements OnInit {

  @Input('recentOrders') recentOrders: OrderInfo[];

  constructor() {}

  ngOnInit() {}


  trackOrdersById(index: number, { id }: OrderInfo): string {
    return id;
  }

}

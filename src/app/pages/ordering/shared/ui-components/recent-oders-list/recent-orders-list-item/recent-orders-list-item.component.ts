import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OrderInfo } from '../../../models';

@Component({
  selector: 'st-recent-orders-list-item',
  templateUrl: './recent-orders-list-item.component.html',
  styleUrls: ['./recent-orders-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersListItemComponent implements OnInit {

  @Input('orderInfo') orderInfo: OrderInfo;

  constructor() {}

  ngOnInit() {}
}

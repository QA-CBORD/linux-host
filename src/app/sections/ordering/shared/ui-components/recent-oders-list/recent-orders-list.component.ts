import {
  Component,
  ChangeDetectionStrategy,
  Input, Output, EventEmitter,
} from '@angular/core';
import { OrderInfo } from '../../models';

@Component({
  selector: 'st-recent-orders-list',
  templateUrl: './recent-orders-list.component.html',
  styleUrls: ['./recent-orders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersListComponent {
  @Input() orders: OrderInfo[];
  @Output() onOrderClicked: EventEmitter<OrderInfo> = new EventEmitter<OrderInfo>();
  @Output() onNavLinkClicked: EventEmitter<OrderInfo> = new EventEmitter<OrderInfo>();
  constructor() {}

  
  trackOrdersById(index: number, { id }: OrderInfo): string {
    return id;
  }
}

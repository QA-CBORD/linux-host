import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { OrderInfo } from '../../../models';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';

@Component({
  selector: 'st-recent-orders-list-item',
  templateUrl: './recent-orders-list-item.component.html',
  styleUrls: ['./recent-orders-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersListItemComponent implements OnInit {
  @Input() orderInfo: OrderInfo;
  @Output() onClicked: EventEmitter<OrderInfo> = new EventEmitter<OrderInfo>();

  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(private readonly orderingService: OrderingService) {}

  ngOnInit() {
    this.contentStrings.labelOrder = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelOrder);
  }
}

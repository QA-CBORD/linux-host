import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { OrderCheckinStatus } from '@sections/check-in/OrderCheckinStatus';
import { OrderInfo } from '@sections/ordering/shared/models/order-info.model';
import { ORDERING_STATUS_ICON_CLASS, ORDERING_STATUS_LABEL } from './recent-orders.config';
import { checkPaymentFailed } from '@sections/ordering/utils/transaction-check';

@Component({
  selector: 'st-recent-orders-list-item',
  templateUrl: './recent-orders-list-item.component.html',
  styleUrls: ['./recent-orders-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersListItemComponent implements OnInit {
  @Input() orderInfo: OrderInfo;
  @Output() onClicked: EventEmitter<OrderInfo> = new EventEmitter<OrderInfo>();
  @Output() onNavigateToCheckin: EventEmitter<OrderInfo> = new EventEmitter<OrderInfo>();
  orderCheckStatus = OrderCheckinStatus;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  status: string;
  iconClass: string;
  isPaymentFailed: boolean;

  constructor(private readonly orderingService: OrderingService) {}

  ngOnInit() {
    this.contentStrings.labelOrder = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelOrder);
    this.contentStrings.needCheckin = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.needCheckin);
    this.status = ORDERING_STATUS_LABEL[this.orderInfo.status];
    this.iconClass = ORDERING_STATUS_ICON_CLASS[this.orderInfo.status];
    this.isPaymentFailed = this.orderInfo.isWalkoutOrder && checkPaymentFailed(this.orderInfo);
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModifyPrepTimeModule } from '../../pipes/modify-prep-time';
import { OrderDetailOptions } from '@sections/ordering/services';
import { MerchantOrderTypesInfo } from '@sections/ordering';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';

@Component({
  selector: 'st-order-prep-time',
  templateUrl: 'order-prep-time.component.html',
  standalone: true,
  imports: [CommonModule, ModifyPrepTimeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPrepTime {
  @Input() orderDetailOptions: OrderDetailOptions;
  @Input() orderTypes: MerchantOrderTypesInfo;

  get prepTime() {
    const time =
      {
        [ORDER_TYPE.PICKUP]: this.orderTypes.pickupPrepTime,
        [ORDER_TYPE.DELIVERY]: this.orderTypes.deliveryPrepTime,
      }[this.orderDetailOptions.orderType] || 0;
    return `(${time} min)`;
  }

  get isAsap () {
    return this.orderDetailOptions.isASAP;
  }
}

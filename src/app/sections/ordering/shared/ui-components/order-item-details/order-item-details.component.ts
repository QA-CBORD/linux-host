import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderItem } from '../../models';

@Component({
  selector: 'st-order-item-details',
  templateUrl: './order-item-details.component.html',
  styleUrls: ['./order-item-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemDetailsComponent {
  @Input() orderItem: OrderItem;
  @Input() public mealBased: boolean;
}

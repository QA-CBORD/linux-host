import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';

@Component({
  selector: 'st-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCartComponent implements OnChanges, OnInit {
  @Input() menuItemsCount = 0;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(private readonly orderingService: OrderingService) {}

  ngOnChanges(changes: SimpleChanges) {
    const { menuItemsCount } = changes;
    if (menuItemsCount.currentValue !== null) {
      this.menuItemsCount = menuItemsCount.currentValue;
    }
  }

  ngOnInit(): void {
    this.contentStrings.buttonViewCart =
      this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonViewCart);
  }
}

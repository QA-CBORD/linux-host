import { Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'st-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCartComponent implements OnChanges {
  @Input() menuItemsCount: number = 0;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const { menuItemsCount } = changes;
    if (menuItemsCount.currentValue !== null) {
      this.menuItemsCount = menuItemsCount.currentValue;
    }
  }
}

import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { Router } from '@angular/router';

@Component({
  selector: 'st-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCartComponent implements OnChanges {
  @Input() menuItemsCount: number = 0;
  constructor(private readonly router: Router) {}

  ngOnChanges(changes) {
    if (changes.menuItemsCount.currentValue !== null) {
      this.menuItemsCount = changes.menuItemsCount.currentValue;
    }
  }

  redirectTo() {
    this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.cart], { skipLocationChange: true });
  }
}

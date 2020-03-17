import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_ROUTING, ORDERING_CONTENT_STRINGS } from '../../ordering.config';
import { NAVIGATE } from '../../../../app.global';
import { OrderingService, OrderingComponentContentStrings } from '@sections/ordering/services/ordering.service';

@Component({
  selector: 'st-menu-ordering',
  templateUrl: './menu-ordering.component.html',
  styleUrls: ['./menu-ordering.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuOrderingComponent implements OnInit {

  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  localRouting = LOCAL_ROUTING;

  constructor(private readonly router: Router, 
    private readonly orderingService: OrderingService) { }

  goToPage(pageRoute: string) {
    this.router.navigate([NAVIGATE.ordering, pageRoute], { skipLocationChange: true });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initContentStrings();
  }

  private initContentStrings() {
    this.contentStrings.labelSavedAddresses = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelSavedAddresses);
    this.contentStrings.labelFavorites = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelFavorites);
    this.contentStrings.labelRecentOrders = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelRecentOrders);
  }
}

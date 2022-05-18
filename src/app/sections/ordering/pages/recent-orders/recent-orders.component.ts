import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, finalize } from 'rxjs/operators';

import { CartService, MerchantService, OrderInfo } from '@sections/ordering';
import { LOCAL_ROUTING, ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { ORDERING_STATUS } from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { CheckingProcess } from '@sections/check-in/services/check-in-process-builder';
import { LoadingService } from '@core/service/loading/loading.service';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';

const renderingDelay = 1000;
@Component({
  selector: 'st-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersComponent implements OnInit {
  pendingOrders$: Observable<OrderInfo[]>;
  completedOrders$: Observable<OrderInfo[]>;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly router: Router,
    private readonly merchantService: MerchantService,
    private readonly orderingService: OrderingService,
    private readonly checkinProcess: CheckingProcess,
    private readonly loadingService: LoadingService,
    public readonly checkinService: CheckingServiceFacade,
    private readonly cartService: CartService,
  ) {}

  ngOnInit() {
    this.initOrders();
    this.initContentStrings();
  }

  async ionViewDidEnter() {
    setTimeout(async () => {
      await this.loadingService.closeSpinner();
    }, renderingDelay);
  }

  refreshRecentOrders({ target }) {
    this.merchantService
      .getRecentOrders()
      .pipe(
        take(1),
        finalize(() => target.complete())
      )
      .subscribe();
  }

  async onNavigateToCheckin(orderInfo) {
    await this.checkinProcess.start(orderInfo, false);
  }

  async onOrderPicked(order: OrderInfo): Promise<void> {
    this.cartService.currentOrderId = order.id;
    await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders, order.id]);
  }

  async back(): Promise<void> {
    await this.router.navigate([PATRON_NAVIGATION.ordering]);
  }

  private initOrders() {
    this.pendingOrders$ = this.merchantService.recentOrders$.pipe(map(this.getPendingOrders));
    this.completedOrders$ = this.merchantService.recentOrders$.pipe(map(this.getCompletedOrders));
  }

  private getPendingOrders(orders: OrderInfo[]): OrderInfo[] {
    return orders.filter((order: OrderInfo) => order.status === ORDERING_STATUS.PENDING);
  }

  private getCompletedOrders(orders: OrderInfo[]): OrderInfo[] {
    return orders.filter((order: OrderInfo) => order.status !== ORDERING_STATUS.PENDING);
  }

  private async initContentStrings() {
    this.contentStrings.buttonDashboardStartOrder = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonDashboardStartOrder
    );
    this.contentStrings.labelRecentOrders = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelRecentOrders
    );
    this.contentStrings.labelPendingOrders = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelPendingOrders
    );
    this.contentStrings.labelCompletedOrders = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelCompletedOrders
    );
    this.contentStrings.noRecentOrders = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.noRecentOrders
    );
    await this.checkinService.getContentStringByName('pickup_info').toPromise();
  }

  async close() {
    await this.loadingService.showSpinner();
    await this.router.navigate([PATRON_NAVIGATION.ordering]);
  }
}

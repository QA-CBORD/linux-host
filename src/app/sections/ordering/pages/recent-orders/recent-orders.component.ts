import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, firstValueFrom, Observable, take } from 'rxjs';

import { CartService, MerchantService, OrderInfo } from '@sections/ordering';
import { LOCAL_ROUTING, ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { CheckingProcess } from '@sections/check-in/services/check-in-process-builder';
import { LoadingService } from '@core/service/loading/loading.service';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { OrderFiltersActionSheetComponent } from '@sections/ordering/shared/ui-components/order-filters.action-sheet/order-filters.action-sheet.component';
import {
  ORDERING_STATUS_LABEL_LBL, ORDERS_PERIOD_LABEL,
} from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';
import { DateUtilObject, getAmountOfMonthFromPeriod } from '@sections/accounts/shared/ui-components/filter/date-util';

const renderingDelay = 1000;

@Component({
  selector: 'st-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersComponent implements OnInit {
  filteredOrders$: Observable<OrderInfo[]>;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly router: Router,
    private readonly merchantService: MerchantService,
    private readonly orderingService: OrderingService,
    private readonly checkinProcess: CheckingProcess,
    private readonly loadingService: LoadingService,
    public readonly checkinService: CheckingServiceFacade,
    private readonly cartService: CartService,
    private readonly modalController: ModalsService
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
      .getRecentOrdersPeriod()
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
    this.filteredOrders$ = this.merchantService.recentOrders$;
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

  filterChange({ period, status }) {
    this.getOrderByPeriod(period, status);
  }

  getOrderByPeriod(period: DateUtilObject, status: string) {
    this.loadingService.showSpinner();
    this.merchantService
      .getRecentOrdersPeriod(period, status)
      .pipe(take(1))
      .subscribe(
        () => this.loadingService.closeSpinner(),
        () => this.loadingService.closeSpinner()
      );
  }

  async onFilter() {
    const modal = await this.modalController.createActionSheet(
      {
        component: OrderFiltersActionSheetComponent,
        cssClass: 'order-options-action-sheet__filter',
        componentProps: {
          selectedPeriod: this.merchantService.period,
          selectedStatus: this.merchantService.orderStatus,
          periods: this.periods,
          statuses: this.statuses,
        },
      },
      true
    );

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.filterChange(data);
      }
    });
    await modal.present();
  }

  get statuses(): string[] {
    return [
      ORDERING_STATUS_LABEL_LBL.ALL,
      ORDERING_STATUS_LABEL_LBL.PENDING,
      ORDERING_STATUS_LABEL_LBL.COMPLETED,
      ORDERING_STATUS_LABEL_LBL.CANCELED,
    ];
  }

  get periods(): DateUtilObject[] {
    const arr = getAmountOfMonthFromPeriod(6);
    arr.unshift({ name: ORDERS_PERIOD_LABEL[0] });
    return arr;
  }
}

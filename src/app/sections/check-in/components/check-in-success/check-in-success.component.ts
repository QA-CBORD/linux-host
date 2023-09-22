import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { CheckingSuccessContentCsModel } from '@sections/check-in/contents-strings/check-in-content-string.model';
import { MerchantService, OrderDetailOptions, OrderInfo } from '@sections/ordering';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PATRON_NAVIGATION } from 'src/app/app.global';

@Component({
  templateUrl: './check-in-success.component.html',
  styleUrls: ['./check-in-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInSuccessComponent implements OnInit, AfterViewInit {
  order$: Observable<OrderInfo>;
  orderId: string;
  checkNumber: string;
  contentStrings: CheckingSuccessContentCsModel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  orderDetailOptions: OrderDetailOptions;

  constructor(
    private readonly router: Router,
    private readonly merchantService: MerchantService,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly resolver: RecentOrdersResolver,
    private readonly activatedRoute: ActivatedRoute,
    private readonly accessibilityService: AccessibilityService
  ) {}

  initContentString() {
    this.contentStrings = this.activatedRoute.snapshot.data.data.contentString as CheckingSuccessContentCsModel;
  }

  focusTitle() {
    this.accessibilityService.focusElementById('modal-mainTitle');
  }

  ngAfterViewInit(): void {
    this.focusTitle();
  }

  ngOnInit() {
    this.initContentString();
    this.setData();
  }

  ionViewWillEnter() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = true;
  }

  async ionViewWillLeave() {
    await this.resolver.resolve();
  }

  async ionViewDidLeave() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = false;
  }

  async goToRecentOrders() {
    await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders]);
  }

  private setData() {
    this.activatedRoute.queryParams.subscribe(response => {
      const { checkNumber, orderId, data, orderDetailOptions } = response;
      this.checkNumber = checkNumber;
      this.order$ = this.merchantService.recentOrders$.pipe(map(orders => orders.find(({ id }) => id === orderId)));
      this.data = JSON.parse(data);
      this.orderDetailOptions = JSON.parse(orderDetailOptions);
    });
  }
}

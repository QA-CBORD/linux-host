import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { CheckingSuccessContentCsModel } from '@sections/check-in/contents-strings/check-in-content-string.model';
import { CartService, MenuInfo, MerchantService } from '@sections/ordering';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { orderInfo } from '../check-in-pending/check-in-pending.component';

@Component({
  templateUrl: './check-in-success.component.html',
  styleUrls: ['./check-in-success.component.scss'],
})

export class CheckInSuccessComponent implements OnInit {
  total: number;
  orderId: string;
  data: orderInfo;
  checkNumber: number;
  contentString: CheckingSuccessContentCsModel;
  mealBased: boolean;
  menuInfo$: Observable<MenuInfo>;
  order$: any;

  constructor(
    private readonly router: Router,
    private readonly merchantService: MerchantService,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly resolver: RecentOrdersResolver,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cart: CartService,
  ) {}


  ngOnInit() {
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
    this.menuInfo$ = this.cart.menuInfo$;
    this.order$ = this.merchantService.recentOrders$.pipe(map(orders => orders.find(({ id }) => id === this.orderId)));
    this.activatedRoute.data.subscribe(response => {
      this.contentString = response.data.contentString;
    });
    this.activatedRoute.queryParams.subscribe(response => {
      const { total, orderId, data, checkNumber } = response;
      this.total = total;
      this.orderId = orderId;
      this.checkNumber = checkNumber;
      this.data = JSON.parse(data);
    });
  }
}

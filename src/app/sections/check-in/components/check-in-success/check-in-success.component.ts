import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { CheckingSuccessContentCsModel } from '@sections/check-in/contents-strings/checkin-content-string.model';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
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

  constructor(
    private readonly router: Router,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly resolver: RecentOrdersResolver,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setData();
  }

  ionViewWillEnter() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = true;
  }

  ionViewWillLeave() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = false;
  }

  goToRecentOrders() {
    this.resolver.resolve();
    this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders]);
  }

  private setData() {
    this.activatedRoute.data.subscribe(response => {
      this.contentString = response.data.cs;
    });
    this.activatedRoute.queryParams.subscribe(response => {
      const { total, orderId, data, checkNumber, mealbased } = response;
      this.total = total;
      this.orderId = orderId;
      this.checkNumber = checkNumber;
      this.mealBased = mealbased;
      this.data = JSON.parse(data);
    });
  }
}

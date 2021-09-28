import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { CheckingSuccessContentCsModel } from '@sections/check-in/contents-strings/check-in-content-string.model';
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
    private readonly activatedRoute: ActivatedRoute,
    private readonly loadingService: LoadingService
  ) {}


  ngOnInit() {
    this.setData();
  }

  ionViewWillEnter() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = true;
  }
  
  async ionViewDidLeave() {
    this.nativeStartupFacadeService.blockGlobalNavigationStatus = false;
    await this.resolver.resolve();
  }

  async goToRecentOrders() {
    await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.recentOrders]);
  }

  private setData() {
    this.activatedRoute.data.subscribe(response => {
      this.contentString = response.data.contentString;
    });
    this.activatedRoute.queryParams.subscribe(response => {
      const { total, orderId, data, checkNumber, mealBased } = response;
      this.total = total;
      this.orderId = orderId;
      this.checkNumber = checkNumber;
      this.mealBased = mealBased;
      this.data = JSON.parse(data);
    });
  }
}

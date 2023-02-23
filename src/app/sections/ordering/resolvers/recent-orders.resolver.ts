import { Resolve } from '@angular/router';
import { MerchantService, OrderInfo } from '@sections/ordering';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';

@Injectable()
export class RecentOrdersResolver implements Resolve<Promise<OrderInfo[]>> {

  constructor(private readonly merchantService: MerchantService,
              private readonly loadingService: LoadingService) {
  }

  resolve(): Promise<OrderInfo[]> {
    this.loadingService.showSpinner();
    return new Promise<OrderInfo[]>((resolve, reject) =>
      this.merchantService.getRecentOrdersPeriod()
        .pipe(take(1))
        .subscribe(
          (orders) => this.loadingService.closeSpinner().then(() => resolve(orders)),
          () => this.loadingService.closeSpinner().then(() => reject())),
    );
  }
}

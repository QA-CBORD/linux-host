import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantService } from '@sections/ordering';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { forkJoin } from 'rxjs';

import { Observable } from 'rxjs/internal/Observable';
import { map, take, tap } from 'rxjs/operators';
import { CheckingSuccessContentCsModel } from '../contents-strings/check-in-content-string.model';

@Injectable()
export class CheckinSuccessResolver implements Resolve<Observable<any>> {
  constructor(
    private readonly commonService: CommonService, 
    private readonly loadingService: LoadingService,
    private readonly merchantService: MerchantService) {}

  resolve(): Observable<any> {
    const checkinSuccess = this.commonService.loadContentString<CheckingSuccessContentCsModel>(
      ContentStringCategory.checkinSuccess
    );

    return forkJoin([checkinSuccess, this.merchantService.getRecentOrders()]).pipe(
      take(1),
      tap(() => {
        this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner();
      }),
      map(([contentString]) => ({ contentString }))
    );
  }
}

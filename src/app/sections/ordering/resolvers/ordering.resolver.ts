import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { MerchantInfo } from '@sections/ordering/shared/models';

import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { MerchantService } from '../services';

@Injectable()
export class OrderingResolver implements Resolve<Observable<MerchantInfo[]>> {
  constructor(private readonly merchantService: MerchantService, private readonly loadingService: LoadingService) {}
  resolve(): Observable<MerchantInfo[]> {
    this.loadingService.showSpinner();
    return this.merchantService.getMerchantsWithFavoriteInfo().pipe(
      delay(1000),
      tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner())
    );
  }
}

import { MerchantService } from './../../../services/merchant.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { FavoriteMerhantsService } from '../services/favorite-merhants.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantInfo } from '@sections/ordering';

@Injectable()
export class FavoriteMerhantsResolver implements Resolve<Observable<MerchantInfo[]>> {
  constructor(
    private readonly favoriteMerhantsService: FavoriteMerhantsService,
    private readonly loadingService: LoadingService,
    private readonly merchantService: MerchantService
  ) { }
  resolve(): Observable<MerchantInfo[]> {
    this.loadingService.showSpinner();
    return zip(this.favoriteMerhantsService
      .getFavoriteMerchants(), this.merchantService.menuMerchants$)
      .pipe(
        map(([favoriteMerchants, merchants]) =>
          favoriteMerchants.map(merchant => merchants.find(({ id }) => id === merchant.id))),
        tap(() => {
          this.loadingService.closeSpinner()
        }, () => this.loadingService.closeSpinner()));
  }
}

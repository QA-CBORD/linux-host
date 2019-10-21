import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FavoriteMerhantsService } from '../services/favorite-merhants.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantInfo } from '@sections/ordering';

@Injectable()
export class FavoriteMerhantsResolver implements Resolve<Observable<MerchantInfo[]>> {
  constructor(
    private readonly favoriteMerhantsService: FavoriteMerhantsService,
    private readonly loadingService: LoadingService
  ) {}
  resolve(): Observable<MerchantInfo[]> {
    this.loadingService.showSpinner();
    return this.favoriteMerhantsService
      .getFavoriteMerchants()
      .pipe(tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner()));
  }
}

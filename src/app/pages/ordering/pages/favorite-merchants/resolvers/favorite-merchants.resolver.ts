import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FavoriteMerhantsService } from '../services/favorite-merhants.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantInfo } from '@pages/ordering';

@Injectable()
export class FavoriteMerhantsResolver implements Resolve<Observable<MerchantInfo>> {
  constructor(private readonly favoriteMerhantsService: FavoriteMerhantsService, private readonly loadingService: LoadingService) { }
  resolve(): Observable<any> {
    this.loadingService.showSpinner();

    return this.favoriteMerhantsService.getFavoriteMerchants().pipe(
      tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner())
    );
  }
}

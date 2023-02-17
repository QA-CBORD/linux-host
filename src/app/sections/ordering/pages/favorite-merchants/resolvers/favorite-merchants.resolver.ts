import { MerchantService } from '@sections/ordering';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { FavoriteMerchantsService } from '../services/favorite-merchants.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantInfo } from '@sections/ordering';
import { mergeMatchArrayById } from '@core/utils/general-helpers';

@Injectable()
export class FavoriteMerchantsResolver implements Resolve<Observable<MerchantInfo[]>> {
  constructor(
    private readonly favoriteMerchantsService: FavoriteMerchantsService,
    private readonly loadingService: LoadingService,
    private readonly merchantService: MerchantService
  ) {}

  resolve(): Observable<MerchantInfo[]> {
    this.loadingService.showSpinner();
    return zip(this.favoriteMerchantsService.getFavoriteMerchants(), this.merchantService.menuMerchants$).pipe(
      map(
        ([favoriteMerchants, merchants]) => mergeMatchArrayById<MerchantInfo>(merchants, favoriteMerchants.map(fav => fav.id))
      ),
      finalize(() => this.loadingService.closeSpinner())
    );
  }
}

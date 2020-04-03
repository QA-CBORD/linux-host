import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MerchantInfo } from '@sections/ordering';
import { Observable } from 'rxjs';
import { ExploreService } from '@sections/explore/services/explore.service';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';

@Injectable()
export class MerchantResolverService implements Resolve<Observable<[MerchantInfo[], MerchantInfo[], MerchantInfo[]]>> {
  constructor(private readonly exploreService: ExploreService, private readonly loadingService: LoadingService) {
    this.loadingService.showSpinner();
  }

  resolve(): Observable<[MerchantInfo[], MerchantInfo[], MerchantInfo[]]> {
    return this.exploreService.getInitialMerchantData$().pipe(finalize(() => this.loadingService.closeSpinner()));
  }
}

import { Injectable } from '@angular/core';
import { MerchantInfo } from '@sections/ordering';
import { Observable } from 'rxjs';
import { ExploreService } from '@sections/explore/services/explore.service';
import { finalize, first } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';

@Injectable()
export class MerchantResolverService {
  constructor(
    private readonly exploreService: ExploreService,
    private readonly loadingService: LoadingService,
    ) {}

  resolve(): Observable<[MerchantInfo[], MerchantInfo[], MerchantInfo[]]> {
    this.loadingService.showSpinner();
    return this.exploreService.getInitialMerchantData$().pipe(
      first(),
      finalize(() => this.loadingService.closeSpinner())
    );
  }
}

import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ExploreService } from '@sections/explore/services/explore.service';
import { NAVIGATE } from '../../../app.global';
import { map, finalize } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';

@Injectable()
export class MerchantDetailsResolverService implements Resolve<boolean> {
  constructor(
    private readonly exploreService: ExploreService,
    private readonly router: Router,
    private readonly loadingService: LoadingService
  ) {}

  resolve(): Observable<boolean> {
    this.loadingService.showSpinner();
    return this.router.routerState.snapshot.url.includes(NAVIGATE.explore)
      ? of(true)
      : this.exploreService.getInitialMerchantData$().pipe(
          map(() => true),
          finalize(() => this.loadingService.closeSpinner())
        );
  }
}

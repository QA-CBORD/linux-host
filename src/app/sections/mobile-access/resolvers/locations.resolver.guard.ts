import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, tap, retryWhen, take } from 'rxjs/operators';
import { Observable, forkJoin, of, throwError } from 'rxjs';

import { MobileAccessService } from '../service';
import { MMobileLocationInfo } from '../model';
import { LoadingService } from '../../../core/service/loading/loading.service';
import { LOCAL_ROUTING } from '../mobile-acces.config';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';

@Injectable()
export class LocationsResolverGuard {
  constructor(
    private readonly mobileAccessService: MobileAccessService,
    private readonly router: Router,
    private readonly loader: LoadingService
  ) {}

  resolve(): Observable<[ContentStringInfo[], MMobileLocationInfo[]]> | Observable<boolean> {
    const snapshot = this.router.routerState.snapshot;
    if (!snapshot.url.includes(LOCAL_ROUTING.activate)) {
      return this.downloadData();
    }
    return of(true);
  }

  private downloadData(): Observable<[ContentStringInfo[], MMobileLocationInfo[]]> {
    this.loader.showSpinner();

    return forkJoin([
      this.mobileAccessService.initContentStringsList(),
      this.mobileAccessService.getLocations().pipe(
        take(1),
        retryWhen(errors =>
          errors.pipe(
            //log error message

            tap(() => {
              this.loader.closeSpinner();
            }),
            take(1)
          )
        ),
        catchError(e => {
          // TODO: paste here logic with retry button
          this.loader.closeSpinner();
          return throwError(e);
        })
      ),
    ]).pipe(tap(() => this.loader.closeSpinner()));
  }
}

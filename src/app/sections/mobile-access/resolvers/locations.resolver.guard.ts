import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

import { catchError, tap, retryWhen, take } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { MobileAccessService } from '../service';
import { MMobileLocationInfo } from '../model';
import { LoadingService } from '../../../core/service/loading/loading.service';
import { LOCAL_ROUTING } from '../mobile-acces.config';

@Injectable()
export class LocationsResolverGuard implements Resolve<Observable<MMobileLocationInfo[] | boolean>> {
  constructor(
    private readonly mobileAccessService: MobileAccessService,
    private readonly router: Router,
    private readonly loader: LoadingService
  ) {}

  resolve(): Observable<MMobileLocationInfo[] | boolean> {
    const snapshot = this.router.routerState.snapshot;
    if (!snapshot.url.includes(LOCAL_ROUTING.activate)) {
      return this.downloadData();
    }
    return of(true);
  }

  private downloadData(): Observable<MMobileLocationInfo[]> {
    this.loader.showSpinner();
    this.mobileAccessService
      .initContentStringsList()
      .pipe(take(1))
      .subscribe();

    return this.mobileAccessService.getLocations().pipe(
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
      }),
      tap(() => this.loader.closeSpinner())
    );
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Resolve } from '@angular/router/src/interfaces';

import { catchError, tap, retryWhen, delay, switchMap } from 'rxjs/operators';
import { Observable, of, throwError, timer } from 'rxjs';

import { MobileAccessService } from './service/mobile-access.service';
import { MMobileLocationInfo } from './model/mobile-access.interface';
import { LoadingService } from '../../core/service/loading/loading.service';

@Injectable()
export class LocationsResolverGuard implements Resolve<Observable<MMobileLocationInfo[] | boolean>> {
  private readonly spinnerMessage = 'Retrieving locations...';

  constructor(
    private readonly mobileAccessService: MobileAccessService,
    private readonly router: Router,
    private readonly loader: LoadingService
  ) {}

  resolve(): Observable<MMobileLocationInfo[] | boolean> {
    const snapshot = this.router.routerState.snapshot;
    if (!snapshot.url.includes('activate')) return this.downloadData();
    return of(true);
  }

  private downloadData(): Observable<MMobileLocationInfo[]> {
    this.mobileAccessService.watchLocation();
    this.loader.showSpinner(this.spinnerMessage);
    return timer(1500).pipe(
      switchMap(() =>
        this.mobileAccessService.getLocations().pipe(
          retryWhen(errors =>
            errors.pipe(
              //log error message
              tap(() => console.log('An error occurred while trying to retrieve your information.')),
              delay(1000)
            )
          ),
          catchError(e => {
            // TODO: paste here logic with retry button
            this.loader.closeSpinner();
            return throwError(e);
          }),
          tap(() => this.loader.closeSpinner())
        )
      )
    );
  }
}

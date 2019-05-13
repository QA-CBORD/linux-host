import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Resolve } from '@angular/router/src/interfaces';

import { catchError, tap, retryWhen, take } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { LoadingService } from '../../../core/service/loading/loading.service';
import { RewardsApiService } from '../services';

import { LOCAL_ROUTING } from '../rewards.config';

@Injectable()
export class RewardsResolverGuard implements Resolve<Observable<boolean>> {
  private readonly spinnerMessage = '';

  constructor(
    private readonly rewardsApiService: RewardsApiService,
    private readonly router: Router,
    private readonly loader: LoadingService
  ) {}

  resolve(): Observable<boolean> {
    const snapshot = this.router.routerState.snapshot;
    if (
      !snapshot.url.includes(LOCAL_ROUTING.levels) &&
      !snapshot.url.includes(LOCAL_ROUTING.store) &&
      !snapshot.url.includes(LOCAL_ROUTING.history)
    ) {
      return this.downloadData();
    }
    return of(true);
  }

  private downloadData(): Observable<boolean> {
    this.loader.showSpinner(this.spinnerMessage);
    this.rewardsApiService
      .initContentStringsList()
      .pipe(take(1))
      .subscribe();

    return this.rewardsApiService.getInitialRewardData().pipe(
      retryWhen(errors =>
        errors.pipe(
          //log error message
          tap(() => console.log('An error occurred while trying to retrieve your information.')),
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

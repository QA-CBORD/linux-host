import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Resolve } from '@angular/router/src/interfaces';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, retryWhen, take } from 'rxjs/operators';

import { LoadingService } from '../../../core/service/loading/loading.service';
import { RewardsService } from '../services';

import { MUserFulfillmentActivityInfo } from '../models';

@Injectable()
export class HistoryResolverGuard implements Resolve<Observable<MUserFulfillmentActivityInfo[]>> {
  constructor(
    private readonly rewardsService: RewardsService,
    private readonly router: Router,
    private readonly loader: LoadingService
  ) {}

  resolve(): Observable<MUserFulfillmentActivityInfo[]> {
    return this.downloadData();
  }

  private downloadData(): Observable<MUserFulfillmentActivityInfo[]> {
    this.loader.showSpinner();

    return this.rewardsService.getUserRewardHistoryInfo().pipe(
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

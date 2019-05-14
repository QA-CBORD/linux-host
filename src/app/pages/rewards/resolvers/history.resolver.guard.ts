import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, retryWhen, take } from 'rxjs/operators';

import { LoadingService } from '../../../core/service/loading/loading.service';
import { RewardsService } from '../services';

import { UserFulfillmentActivityInfo } from '../models';

@Injectable()
export class HistoryResolverGuard implements Resolve<Observable<UserFulfillmentActivityInfo[]>> {
  constructor(
    private readonly rewardsService: RewardsService,
    private readonly loader: LoadingService
  ) {}

  resolve(): Observable<UserFulfillmentActivityInfo[]> {
    return this.downloadData();
  }

  private downloadData(): Observable<UserFulfillmentActivityInfo[]> {
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

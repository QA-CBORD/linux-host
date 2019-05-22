import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';

import { catchError, tap, retryWhen, switchMap, take } from 'rxjs/operators';
import { combineLatest, Observable, throwError } from 'rxjs';

import { LoadingService } from '../../../core/service/loading/loading.service';
import { RewardsService } from '../services';

import { UserFulfillmentActivityInfo, UserRewardTrackInfo } from '../models';

@Injectable()
export class RewardsResolverGuard implements Resolve<Observable<[UserRewardTrackInfo, UserFulfillmentActivityInfo[]]>> {
  constructor(private readonly rewardsService: RewardsService, private readonly loader: LoadingService) {}

  resolve(): Observable<[UserRewardTrackInfo, UserFulfillmentActivityInfo[]]> {
    return this.downloadData();
  }

  private downloadData(): Observable<[UserRewardTrackInfo, UserFulfillmentActivityInfo[]]> {
    this.loader.showSpinner();
    return this.rewardsService.initContentStringsList().pipe(
      switchMap(() => this.rewardsService.getAllData()),
      take(1),
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

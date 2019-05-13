import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Resolve } from '@angular/router/src/interfaces';

import { catchError, tap, retryWhen, take, switchMap } from 'rxjs/operators';
import { combineLatest, Observable, throwError } from 'rxjs';

import { LoadingService } from '../../../core/service/loading/loading.service';
import { RewardsService } from '../services';

import { MUserFulfillmentActivityInfo, MUserRewardTrackInfo } from '../models';

@Injectable()
export class RewardsResolverGuard
  implements Resolve<Observable<[MUserRewardTrackInfo, MUserFulfillmentActivityInfo[]]>> {
  constructor(
    private readonly rewardsService: RewardsService,
    private readonly router: Router,
    private readonly loader: LoadingService
  ) {}

  resolve(): Observable<[MUserRewardTrackInfo, MUserFulfillmentActivityInfo[]]> {
    return this.downloadData();
  }

  private downloadData(): Observable<[MUserRewardTrackInfo, MUserFulfillmentActivityInfo[]]> {
    this.loader.showSpinner();
    return this.rewardsService.initContentStringsList().pipe(
      take(1),
      switchMap(() => {
        return combineLatest(
          this.rewardsService.getUserRewardTrackInfo(),
          this.rewardsService.getUserRewardHistoryInfo()
        ).pipe(take(1));
      }),
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

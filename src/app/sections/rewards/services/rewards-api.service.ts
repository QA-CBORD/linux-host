import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { UserFulfillmentActivityInfo, UserRewardTrackInfo } from '../models';
import { MessageResponse, ServiceParameters } from '../../../core/model/service/message-response.model';
import { Platform } from '@ionic/angular';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { ToastService } from '@core/service/toast/toast.service';

@Injectable()
export class RewardsApiService {
  private readonly serviceUrl = '/json/rewards';

  constructor(
    private readonly http: HttpClient,
    private readonly toastService: ToastService,
    private platform: Platform,
  ) {
  }

  getUserRewardTrackInfo(
    headerOnly = false,
    showToastOnError = true,
  ): Observable<UserRewardTrackInfo> {
    const postParams: ServiceParameters = { headerOnly };
    const queryConfig = new RPCQueryConfig('retrieveUserRewardTrackInfo', postParams, true);

    return this.http.post<MessageResponse<UserRewardTrackInfo[]>>(this.serviceUrl, queryConfig).pipe(
      map(({ response, exception }) => {
        if (exception !== null) {
          throw new Error(exception);
        }
        return Array.isArray(response) && response.length ? response[0] : null;
      }),
      this.onErrorHandler(showToastOnError),
    );
  }

  getUserRewardHistoryInfo(
    showToast = true,
    rewardTrackId: string = null,
    startDate: Date = null,
    endDate: Date = null,
    filters = null,
  ): Observable<UserFulfillmentActivityInfo[]> {
    const postParams: ServiceParameters = {
      rewardTrackId,
      startDate,
      endDate,
      filters,
    };
    const queryConfig = new RPCQueryConfig('retrieveUserRewardHistory', postParams, true);

    return this.http.post<MessageResponse<UserFulfillmentActivityInfo[]>>(this.serviceUrl, queryConfig).pipe(
      this.parseResponse(),
      this.onErrorHandler(showToast),
    );
  }

  optUserIntoRewardTrack(trackId: string, userId: string, showToastOnError = true): Observable<boolean> {
    const postParams: ServiceParameters = { trackId, userId };
    const queryConfig = new RPCQueryConfig('optUserIntoRewardTrack', postParams, true);

    return this.http.post<MessageResponse<boolean>>(this.serviceUrl, queryConfig).pipe(
      take(1),
      this.parseResponse(),
      this.onErrorHandler(showToastOnError),
    );
  }

  claimReward(rewardId: string, showToast = true) {
    const queryConfig = new RPCQueryConfig('claimRewardV2', { rewardId }, true);

    return this.http.post<MessageResponse<boolean>>(this.serviceUrl, queryConfig).pipe(
      this.parseResponse(),
      this.onErrorHandler(showToast),
    );
  }

  detectPlatform(name): boolean {
    return this.platform.is(name);
  }

  private onErrorHandler(showToastOnError = true) {
    return (source: Observable<any>) =>
      source.pipe(
        catchError(err => {
          showToastOnError && this.presentToast();
          return throwError(err);
        }),
      );
  }

  private parseResponse() {
    return (source: Observable<any>) =>
      source.pipe(
        map(({ response, exception }) => {
          if (exception !== null) {
            throw new Error(exception);
          }
          return response;
        }),
      );
  }

  private async presentToast(): Promise<void> {
    const message = `Something went wrong - please try again`;
    const isNativeDevicesEnv = this.detectPlatform('android') || this.detectPlatform('ios');
    await this.toastService.showToast({ message, toastButtons: [{ text: 'Dismiss' }], position: isNativeDevicesEnv ? 'bottom' : 'top' });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService, ServiceParameters } from '../../../core/service/base-service/base.service';

import { UserFulfillmentActivityInfo, UserRewardTrackInfo } from '../models';
import { MessageResponse } from '../../../core/model/service/message-response.model';
import { ToastController } from '@ionic/angular';

@Injectable()
export class RewardsApiService extends BaseService {
  private readonly serviceUrl = '/json/rewards';

  constructor(protected readonly http: HttpClient, private readonly toastController: ToastController) {
    super(http);
  }

  getUserRewardTrackInfo(headerOnly: boolean = false, showToast: boolean = false): Observable<UserRewardTrackInfo> {
    const methodName = 'retrieveUserRewardTrackInfo';
    const postParams: ServiceParameters = { headerOnly };
    return this.httpRequest<MessageResponse<UserRewardTrackInfo[]>>(this.serviceUrl, methodName, true, {
      ...postParams,
    }).pipe(
      map(({ response, exception }) => {
        if (exception !== null) {
          throw new Error(exception);
        }
        return Array.isArray(response) && response.length ? response[0] : null;
      }),
      this.onErrorHandler(true)
    );
  }

  getUserRewardHistoryInfo(
    showToast: boolean = false,
    rewardTrackId: string = null,
    startDate: Date = null,
    endDate: Date = null,
    filters: any = null
  ): Observable<UserFulfillmentActivityInfo[]> {
    const methodName = 'retrieveUserRewardHistory';
    const postParams: ServiceParameters = {
      rewardTrackId,
      startDate,
      endDate,
      filters,
    };
    return this.httpRequest<MessageResponse<UserFulfillmentActivityInfo[]>>(this.serviceUrl, methodName, true, {
      ...postParams,
    }).pipe(
      this.parseResponse(),
      this.onErrorHandler(true)
    );
  }

  optUserIntoRewardTrack(trackId: string, userId: string, showToast: boolean = false) {
    const methodName = 'optUserIntoRewardTrack';
    const postParams: ServiceParameters = { trackId, userId };
    return this.httpRequest<MessageResponse<boolean>>(this.serviceUrl, methodName, true, {
      ...postParams,
    }).pipe(
      this.parseResponse(),
      this.onErrorHandler(showToast)
    );
  }

  claimReward(rewardId: string, showToast: boolean = false): Observable<UserFulfillmentActivityInfo>{
    const methodName = 'claimRewardV2';

    return this.httpRequest<MessageResponse<UserFulfillmentActivityInfo>>(this.serviceUrl, methodName, true, { rewardId }).pipe(
      this.parseResponse(),
      this.onErrorHandler(true)
    );
  }

  private onErrorHandler(showToast: boolean = false) {
    return (source: Observable<any>) =>
      source.pipe(
        catchError(err => {
          showToast && this.presentToast();
          return throwError(err);
        })
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
        })
      );
  }

  private async presentToast() {
    const message = `something went wrong, try again later`;
    const toast = await this.toastController.create({
      message,
      duration: 5000,
    });
    toast.present();
  }
}

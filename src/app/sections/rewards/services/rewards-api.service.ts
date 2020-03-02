import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService, ServiceParameters } from '../../../core/service/base-service/base.service';

import { UserFulfillmentActivityInfo, UserRewardTrackInfo } from '../models';
import { MessageResponse } from '../../../core/model/service/message-response.model';
import { ToastController, Platform } from '@ionic/angular';

@Injectable()
export class RewardsApiService extends BaseService {
  private readonly serviceUrl = '/json/rewards';

  constructor(
    protected readonly http: HttpClient,
    private readonly toastController: ToastController,
    private platform: Platform
  ) {
    super(http);
  }

  getUserRewardTrackInfo(
    headerOnly: boolean = false,
    showToastOnError: boolean = true
  ): Observable<UserRewardTrackInfo> {
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
      this.onErrorHandler(showToastOnError)
    );
  }

  getUserRewardHistoryInfo(
    showToast: boolean = true,
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
      this.onErrorHandler(showToast)
    );
  }

  optUserIntoRewardTrack(trackId: string, userId: string, showToastOnError: boolean = true): Observable<boolean> {
    const methodName = 'optUserIntoRewardTrack';
    const postParams: ServiceParameters = { trackId, userId };
    return this.httpRequest<MessageResponse<boolean>>(this.serviceUrl, methodName, true, {
      ...postParams,
    }).pipe(
      this.parseResponse(),
      this.onErrorHandler(showToastOnError)
    );
  }

  claimReward(rewardId: string, showToast: boolean = true) {
    const methodName = 'claimRewardV2';

    return this.httpRequest<MessageResponse<boolean>>(this.serviceUrl, methodName, true, { rewardId }).pipe(
      this.parseResponse(),
      this.onErrorHandler(showToast)
    );
  }

  detectPlatform(name) {
    return this.platform.is(name);
  }

  private onErrorHandler(showToastOnError: boolean = true) {
    return (source: Observable<any>) =>
      source.pipe(
        catchError(err => {
          showToastOnError && this.presentToast();
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
    const isNativeDevicesEnv = this.detectPlatform('android') || this.detectPlatform('ios');
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      cssClass: 'exception-toast',
      position: isNativeDevicesEnv ? 'bottom' : 'top',
      closeButtonText: 'DISMISS',
      showCloseButton: true,
    });
    toast.present();
  }
}

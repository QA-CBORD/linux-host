import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { UserRewardTrackInfo } from '../../model/rewards/rewards.model';
import { MessageResponse, ServiceParameters } from '../../../core/model/service/message-response.model';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { ToastService } from '@core/service/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
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

  isPlatform(name): boolean {
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

  private async presentToast(): Promise<void> {
    const message = `something went wrong, try again later`;
    const isNativeDevicesEnv = this.isPlatform('android') || this.isPlatform('ios');
    await this.toastService.showToast({ message, toastButtons: [{ text: 'Dismiss' }], position: isNativeDevicesEnv ? 'bottom' : 'top'});
  }
}

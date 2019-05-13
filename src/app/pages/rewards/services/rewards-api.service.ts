import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService, ServiceParameters } from '../../../core/service/base-service/base.service';

import { MUserFulfillmentActivityInfo, MUserRewardTrackInfo } from '../models';
import { MessageResponse } from '../../../core/model/service/message-response.interface';

@Injectable()
export class RewardsApiService extends BaseService {
  private readonly serviceUrl = '/json/rewards';

  constructor(protected readonly http: HttpClient) {
    super(http);
  }

  getUserRewardTrackInfo(headerOnly: boolean = false): Observable<MUserRewardTrackInfo> {
    const methodName = 'retrieveUserRewardTrackInfo';
    const postParams: ServiceParameters = { headerOnly };
    return this.httpRequest<MessageResponse<MUserRewardTrackInfo[]>>(this.serviceUrl, methodName, true, {
      ...postParams,
    }).pipe(
      map(({ response, exception }) => {
        if (exception !== null) {
          throw new Error(exception);
        }
        return response !== null && response.length > 0 ? response[0] : null;
      })
    );
  }

  getUserRewardHistoryInfo(
    rewardTrackId: string = null,
    startDate: Date = null,
    endDate: Date = null,
    filters: any = null
  ): Observable<MUserFulfillmentActivityInfo[]> {
    const methodName = 'retrieveUserRewardHistory';
    const postParams: ServiceParameters = {
      rewardTrackId,
      startDate,
      endDate,
      filters,
    };
    return this.httpRequest<MessageResponse<MUserFulfillmentActivityInfo[]>>(this.serviceUrl, methodName, true, {
      ...postParams,
    }).pipe(
      map(({ response, exception }) => {
        if (exception !== null) {
          throw new Error(exception);
        }
        return response;
      })
    );
  }

  optUserIntoRewardTrack(trackId: string, userId: string) {
    const methodName = 'optUserIntoRewardTrack';
    const postParams: ServiceParameters = { trackId, userId };
    return this.httpRequest<MessageResponse<boolean>>(this.serviceUrl, methodName, true, {
      ...postParams,
    }).pipe(
      map(({ response, exception }) => {
        if (exception !== null) {
          throw new Error(exception);
        }
        return response;
      })
    );
  }
}

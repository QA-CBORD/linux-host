import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BaseService, ServiceParameters } from '../../../core/service/base-service/base.service';
import { ContentService } from '../../../core/service/content-service/content.service';

import { MContentStringInfo } from '../../../core/model/content/content-string-info.interface';
import { MUserFulfillmentActivityInfo, MUserRewardTrackInfo } from '../models';
import { MessageResponse } from '../../../core/model/service/message-response.interface';
import {ContentStringsParams, OPT_IN_STATUS} from '../rewards.config';

@Injectable()
export class RewardsApiService extends BaseService {
  private readonly serviceUrl = '/json/rewards';

  private readonly rewardTrack$: BehaviorSubject<MUserRewardTrackInfo> = new BehaviorSubject<MUserRewardTrackInfo>(
    null
  );
  private readonly rewardHistory$: BehaviorSubject<MUserFulfillmentActivityInfo[]> = new BehaviorSubject<
    MUserFulfillmentActivityInfo[]
  >([]);
  private rewardTrackInfo: MUserRewardTrackInfo;
  private rewardHistoryList: MUserFulfillmentActivityInfo[];

  private content;

  constructor(protected readonly http: HttpClient, private readonly contentService: ContentService) {
    super(http);
  }

  get rewardTrack(): Observable<MUserRewardTrackInfo> {
    return this.rewardTrack$.asObservable();
  }

  private set _rewardTrack(rewardTrackInfo: MUserRewardTrackInfo) {
    this.rewardTrackInfo = rewardTrackInfo;
    this.rewardTrack$.next(this.rewardTrackInfo);
  }

  get rewardHistory(): Observable<MUserFulfillmentActivityInfo[]> {
    return this.rewardHistory$.asObservable();
  }

  private set _rewardHistory(rewardHistory: MUserFulfillmentActivityInfo[]) {
    this.rewardHistoryList = rewardHistory;
    this.rewardHistory$.next(this.rewardHistoryList);
  }

  getInitialRewardData(): Observable<boolean> {
    return combineLatest(this.getUserRewardTrackInfo(), this.getUserRewardHistoryInfo()).pipe(
      map(([trackInfo, historyArray]: [MUserRewardTrackInfo, MUserFulfillmentActivityInfo[]]) => {
        this._rewardTrack = trackInfo;
        this._rewardHistory = historyArray;
        return true;
      })
    );
  }

  private getUserRewardTrackInfo(headerOnly: boolean = false): Observable<MUserRewardTrackInfo> {
    const methodName = 'retrieveUserRewardTrackInfo';
    const postParams: ServiceParameters = { headerOnly };
    return this.httpRequest<MessageResponse<MUserRewardTrackInfo[]>>(this.serviceUrl, methodName, true, {
      ...postParams,
    }).pipe(
      map(({ response, exception }) => {
        if (exception !== null) {
          throw new Error(exception);
        }
        const checkedResponse = response !== null && response.length > 0 ? response[0] : null;
        this._rewardTrack = checkedResponse;
        return checkedResponse;
      })
    );
  }

  private getUserRewardHistoryInfo(
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
        this._rewardHistory = response;
        return response;
      })
    );
  }

  initContentStringsList(): Observable<MContentStringInfo[]> {
    return this.contentService.retrieveContentStringList(ContentStringsParams).pipe(
      tap(res => {
        this.content = res.reduce((init, elem) => ({ ...init, [elem.name]: elem.value }), {});
      })
    );
  }

  getContentValueByName(name: string): string | undefined {
    return this.content[name];
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

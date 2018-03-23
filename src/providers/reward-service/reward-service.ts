import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { GETService } from "../get-service/get-service";
import { MessageResponse } from "../../models/service/message-response.interface";
import { UserRewardTrackInfo, RedeemableRewardInfo, UserTrackLevelInfo, UserFulfillmentActivityInfo } from '../../models/rewards/rewards.interface';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class RewardService extends GETService {

  private serviceURL: string = '/json/rewards';

  constructor(public http: Http) {
    super();
  }

  public retrieveUserRewardTrackInfo(headerOnly: boolean): Observable<UserRewardTrackInfo[]> {

    return Observable.create((observer: any) => {

      if (GETService.getSessionId() == null) {
        // Need a session to make the call so return error
        let error = new Error("Invalid session");
        return Observable.throw(error);
      }

      console.log('retrieveUserRewardTrackInfo SessionId: ' + GETService.getSessionId());

      let postParams = {
        method: 'retrieveUserRewardTrackInfo',
        params: {
          sessionId: GETService.getSessionId(),
          headerOnly: headerOnly
        }
      };

      console.log(JSON.stringify(postParams));

      this.http.post(this.baseUrl.concat(this.serviceURL), JSON.stringify(postParams), this.getOptions())
        .map(this.extractData)
        .do(this.logData)
        .subscribe(response => {
          observer.next(response.response);
          // data validation
          // throw errors
          observer.complete();
        },
          error => {
            // do error things
            observer.error(error);
          }
        )
    });
  }

  public claimReward(rewardId: string): Observable<boolean> {
    return Observable.create((observer: any) => {
      if (GETService.getSessionId() == null) {
        // Need a session to make the call so return error
        let error = new Error("Invalid session");
        return Observable.throw(error);
      }

      let postParams = {
        method: 'claimReward',
        params: {
          sessionId: GETService.getSessionId(),
          rewardId: rewardId
        }
      };

      console.log(JSON.stringify(postParams));

      this.http.post(this.baseUrl.concat(this.serviceURL), JSON.stringify(postParams), this.getOptions())
        .map(this.extractData)
        .do(this.logData)
        .subscribe(response => {
          observer.next(response.response);
          // data validation
          // throw errors
          observer.complete();
        },
          error => {
            // do error things
            observer.error(error);
          }
        )
    });
  }

  public retrieveRedeemableRewards(trackId: string): Observable<RedeemableRewardInfo[]> {
    return Observable.create((observer: any) => {
      if (GETService.getSessionId() == null) {
        // Need a session to make the call so return error
        let error = new Error("Invalid session");
        return Observable.throw(error);
      }

      let postParams = {
        method: 'retrieveRedeemableRewards',
        params: {
          sessionId: GETService.getSessionId(),
          trackId: trackId
        }
      };

      console.log(JSON.stringify(postParams));

      this.http.post(this.baseUrl.concat(this.serviceURL), JSON.stringify(postParams), this.getOptions())
        .map(this.extractData)
        .do(this.logData)
        .subscribe(response => {
          observer.next(response.response);
          // data validation
          // throw errors
          observer.complete();
        },
          error => {
            // do error things
            observer.error(error);
          }
        )
    });
  }

  public retrieveUserTrackLevel(trackId: string, level: number): Observable<UserTrackLevelInfo[]> {
    return Observable.create((observer: any) => {
      if (GETService.getSessionId() == null) {
        // Need a session to make the call so return error
        let error = new Error("Invalid session");
        return Observable.throw(error);
      }

      let postParams = {
        method: 'retrieveUserTrackLevel',
        params: {
          sessionId: GETService.getSessionId(),
          trackId: trackId,
          level: level
        }
      };

      console.log(JSON.stringify(postParams));

      this.http.post(this.baseUrl.concat(this.serviceURL), JSON.stringify(postParams), this.getOptions())
        .map(this.extractData)
        .do(this.logData)
        .subscribe(response => {
          observer.next(response.response);
          // data validation
          // throw errors
          observer.complete();
        },
          error => {
            // do error things
            observer.error(error);
          }
        )
    });



  }

  public retrieveUserRewardHistory(startDate: Date, endDate: Date, trackId: string, filters: any[]): Observable<UserFulfillmentActivityInfo[]> {
    return Observable.create((observer: any) => {
      if (GETService.getSessionId() == null) {
        // Need a session to make the call so return error
        let error = new Error("Invalid session");
        return Observable.throw(error);
      }

      let postParams = {
        method: 'retrieveUserRewardHistory',
        params: {
          sessionId: GETService.getSessionId(),
          startDate: startDate,
          endDate: endDate,
          trackId: trackId,
          filters: filters
        }
      };

      console.log(JSON.stringify(postParams));

      this.http.post(this.baseUrl.concat(this.serviceURL), JSON.stringify(postParams), this.getOptions())
        .map(this.extractData)
        .do(this.logData)
        .subscribe(response => {
          observer.next(response.response);
          // data validation
          // throw errors
          observer.complete();
        },
          error => {
            // do error things
            observer.error(error);
          }
        )
    });

  }
}

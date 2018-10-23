import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { GETService, ServiceParameters } from "../get-service/get-service";
import { UserRewardTrackInfo, RedeemableRewardInfo, UserTrackLevelInfo, UserFulfillmentActivityInfo } from '../../models/rewards/rewards.interface';

@Injectable()
export class RewardService extends GETService {

  private serviceUrl: string = '/json/rewards';


  /**
   * User opt-in to the Rewards Program for a particular track
   * 
   * @param rewardTrackId   ID of reward track in which the user would like to opt-in
   */
  public optInUser(rewardTrackId: string): Observable<boolean> {

    return Observable.create((observer: any) => {

      let postParams: ServiceParameters = {
        userId: '', // get user id
        trackId: rewardTrackId
      };

      console.log(JSON.stringify(postParams));

      this.httpRequest(this.serviceUrl, 'optUserIntoRewardTrack', true, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });

  }

  /**
   *  Get Track Information list for this institution
   * 
   * @param headerOnly Only retrieve top level information about tracks
   */
  public retrieveUserRewardTrackInfo(headerOnly: boolean): Observable<UserRewardTrackInfo[]> {

    return Observable.create((observer: any) => {

      let postParams: ServiceParameters = {
        "headerOnly": headerOnly
      };

      console.log(JSON.stringify(postParams));

      this.httpRequest(this.serviceUrl, 'retrieveUserRewardTrackInfo', true, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });

  }

  /**
   * Atttempt to claim a reward
   * 
   * @param rewardId  ID of reward to be claimed
   */
  public claimReward(rewardId: string): Observable<boolean> {

    return Observable.create((observer: any) => {

      let postParams: ServiceParameters = {
        rewardId: rewardId
      };

      console.log(JSON.stringify(postParams));

      this.httpRequest(this.serviceUrl, 'claimReward', true, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });

  }

  /**
   *  Get Reward Information for all 'Claimable' reward items (Points)
   * 
   * @param trackId   ID of current Reward Track
   */
  public retrieveRedeemableRewards(trackId: string): Observable<RedeemableRewardInfo[]> {

    return Observable.create((observer: any) => {

      let postParams: ServiceParameters = {
        trackId: trackId
      };

      console.log(JSON.stringify(postParams));

      this.httpRequest(this.serviceUrl, 'retrieveRedeemableRewards', true, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });

  }

  /**
   * Get Reward Information for all Reward Levels
   * 
   * @param trackId   ID of current Reward Track
   * @param level     Desired level for which to retrieve info
   */
  public retrieveUserTrackLevel(trackId: string, level: number): Observable<UserTrackLevelInfo[]> {

    return Observable.create((observer: any) => {

      let postParams: ServiceParameters = {
        trackId: trackId,
        level: level
      };

      console.log(JSON.stringify(postParams));

      this.httpRequest(this.serviceUrl, 'retrieveUserTrackLevel', true, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });

  }

  /**
   *  Get list of Reward History items
   * 
   * @param trackId     ID of desired Reward Track
   * @param startDate   Date constraint for start of History item list (typically Reward Track start date)
   * @param endDate     Date constraint for end of History item list (typically Reward Track end date)
   * @param filters     Not used yet. It's here for future expansion
   */
  public retrieveUserRewardHistory(trackId: string, startDate: Date, endDate: Date, filters: any[]): Observable<UserFulfillmentActivityInfo[]> {

    return Observable.create((observer: any) => {

      let postParams: ServiceParameters = {
        startDate: startDate,
        endDate: endDate,
        trackId: trackId,
        filters: filters
      };

      console.log(JSON.stringify(postParams));

      this.httpRequest(this.serviceUrl, 'retrieveUserRewardHistory', true, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });

  }
}

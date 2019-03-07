import { Injectable } from '@angular/core';

import { RewardService } from '../../services/reward-service/reward-service';

import { Observable } from 'rxjs/Observable';

import { MUserRewardTrackInfo, MUserFulfillmentActivityInfo, MUserTrackLevelInfo } from '../../models/rewards/rewards.interface'



@Injectable()
export class RewardsProvider {

  constructor(
    public rewardService: RewardService
  ) {
  }

/**
   * User opt-in to the Rewards Program for a particular track
   * 
   * @param rewardTrackId   ID of reward track in which the user would like to opt-in
   */
  optInUser(rewardTrackId: string): Observable<boolean> {
    return this.rewardService.optInUser(rewardTrackId);
  }

  /**
   *  Get list of the Instituions available Reward Tracks
   */
  getUserRewardsData(): Observable<MUserRewardTrackInfo[]> {
    return this.rewardService.retrieveUserRewardTrackInfo(false);
  }

  /**
   *  Get list of Reward History items
   * 
   * @param trackId     ID of desired Reward Track
   * @param startDate   Date constraint for start of History item list (typically Reward Track start date)
   * @param endDate     Date constraint for end of History item list (typically Reward Track end date)
   * @param filters     Not used yet. It's here for future expansion
   */
  getUserRewardHistory(trackID: string, trackStartDate: Date, trackEndDate: Date): Observable<MUserFulfillmentActivityInfo[]> {
    var filters = null;
    return this.rewardService.retrieveUserRewardHistory(trackID, trackStartDate, trackEndDate, filters);
  }

  logError(message: any) {
    console.error("Show Error:");
    console.error(message);
  }
}

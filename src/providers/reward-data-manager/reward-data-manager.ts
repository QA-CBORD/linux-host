import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { SessionService } from '../../providers/session-service/session-service';
import { RewardService } from '../../providers/reward-service/reward-service';
import { UserRewardTrackInfo, UserFulfillmentActivityInfo } from '../../models/rewards/rewards.interface'
import { DataCache } from '../data-cache/data-cache';

@Injectable()
export class RewardsDataManager {

  public static readonly DATA_USERREWARDTRACKINFO_UPDATED = "data:userRewardTrackInfo:updated";
  public static readonly DATA_USERFULFILLMENTACTIVITYINFO_UPDATED = "data:userFulfillmentActivityInfo:updated";

  public userRewardTrackInfo: UserRewardTrackInfo = null;
  public userFulfillmentActivityInfo: UserFulfillmentActivityInfo[] = null;

  constructor(
    public events: Events,
    public sessionService: SessionService, 
    public rewardService: RewardService,
    public dataCache: DataCache
  ) {

  }

  /**
   * This will retrieve the sessions current user's RewardTrackInfo and RewardHistory
   */
  getUserRewardsData(refresh: boolean = false) {
    if (refresh) {
      this.getUserRewardTrackInfo();
    } else {
      this.dataCache.get("userRewardTrackInfo").then((res: UserRewardTrackInfo) => {
        console.log("Reward Track Info: Cache");
        this.userRewardTrackInfo = res;
        return this.dataCache.get("userFulfillmentActivityInfo");
      }).then((res: UserFulfillmentActivityInfo[]) => {
        this.userFulfillmentActivityInfo = res;
        this.events.publish(RewardsDataManager.DATA_USERREWARDTRACKINFO_UPDATED, this.userRewardTrackInfo);
        this.events.publish(RewardsDataManager.DATA_USERFULFILLMENTACTIVITYINFO_UPDATED, this.userFulfillmentActivityInfo);
      }).catch((err) => {
        console.log("Reward Track Info: Service Call");
        this.getUserRewardTrackInfo();
      });
    }
  }

  getUserRewardTrackInfo() {
    this.rewardService.retrieveUserRewardTrackInfo(false)
    .subscribe(
      rewardTrackInfo => {
        this.getUserRewardTrackInfoResponse(rewardTrackInfo);
      },
      error => {
        this.logError(error);
      },
      () => {
        // complete
        console.log("RetrieveUserRewardTrackInfo Complete");
      }
    )
    
  }

  getUserRewardTrackInfoResponse(userRewardTrackInfo: any) {
    if (userRewardTrackInfo && userRewardTrackInfo.length > 0) {
      // set datas and do more things with it
      this.userRewardTrackInfo = userRewardTrackInfo[0];
      this.dataCache.set("userRewardTrackInfo", userRewardTrackInfo[0]);
      this.events.publish(RewardsDataManager.DATA_USERREWARDTRACKINFO_UPDATED, this.userRewardTrackInfo);
      this.getUserRewardHistory();
    } else {
      // publish the bad data to be handled by subscribers
      this.events.publish(RewardsDataManager.DATA_USERREWARDTRACKINFO_UPDATED, this.userRewardTrackInfo);
    }
  }

  getUserRewardHistory() {
    var startDate: Date = this.userRewardTrackInfo.trackEndDate;
    var endDate: Date = this.userRewardTrackInfo.trackStartDate;
    var trackId: string = this.userRewardTrackInfo.trackID;
    var filters = null;
    this.rewardService.retrieveUserRewardHistory(startDate, endDate, trackId, filters).subscribe(
      ((data: UserFulfillmentActivityInfo[]) => this.getUserRewardHistoryResponse(data)),
      ((error) => this.logError(error))
    )
  }

  getUserRewardHistoryResponse(userFulfillmentActivityInfo: any) {
    this.userFulfillmentActivityInfo = userFulfillmentActivityInfo;
    this.dataCache.set("userFulfillmentActivityInfo", userFulfillmentActivityInfo);

    this.events.publish(RewardsDataManager.DATA_USERFULFILLMENTACTIVITYINFO_UPDATED, this.userFulfillmentActivityInfo);
  }

  logError(message: any) {
    console.error("Show Error:");
    console.error(message);
  }
}

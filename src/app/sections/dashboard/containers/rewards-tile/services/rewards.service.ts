import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { UserRewardTrackInfo, UserFulfillmentActivityInfo, UserTrackLevelInfo, LEVEL_STATUS, CLAIM_STATUS, RedeemableRewardInfo, OPT_IN_STATUS } from 'src/app/core/model/rewards/rewards.model';
import { RewardsApiService } from 'src/app/core/service/rewards/rewards-api.service';
import { UserService } from '@core/service/user-service/user.service';
import { Settings } from 'src/app/app.global';
import { ConfigurationService } from '@core/service/configuration/configuration.service';

@Injectable()
export class RewardsService {
  private readonly rewardTrack$: BehaviorSubject<UserRewardTrackInfo> = new BehaviorSubject<UserRewardTrackInfo>(null);
 
  private rewardTrackInfo: UserRewardTrackInfo;

  constructor(private readonly rewardsApi: RewardsApiService, private readonly userService: UserService, private readonly configService: ConfigurationService) {}

  get rewardTrack(): Observable<UserRewardTrackInfo> {
    return this.rewardTrack$.asObservable();
  }

  private set _rewardTrack(rewardTrackInfo: UserRewardTrackInfo) {
    this.rewardTrackInfo = { ...rewardTrackInfo };
    this.rewardTrack$.next({ ...this.rewardTrackInfo });
  }


  getUserRewardTrackInfo(showToastOnError?: boolean): Observable<UserRewardTrackInfo> {
    return this.rewardsApi
      .getUserRewardTrackInfo(true, showToastOnError)
      .pipe(tap(trackInfo => (this._rewardTrack = trackInfo)));
  }

  
  getUserOptInStatus(): Observable<OPT_IN_STATUS> {
    return this.rewardTrack.pipe(map(({ userOptInStatus }) => userOptInStatus));
  }


  private getLevelStatus({ level, userClaimableRewards: rewards }: UserTrackLevelInfo, userLevel: number): number {
    if (userLevel < level) {
      return LEVEL_STATUS.locked;
    }
    for (let i = 0; i < rewards.length; i++) {
      if (rewards[i].claimStatus === CLAIM_STATUS.claimed) {
        return LEVEL_STATUS.claimed;
      }
      if (rewards[i].claimStatus === CLAIM_STATUS.received) {
        return LEVEL_STATUS.received;
      }
    }
    return LEVEL_STATUS.unlocked;
  }

  private sortByLevel(levelInfoArray: UserTrackLevelInfo[]): UserTrackLevelInfo[] {
    return levelInfoArray.sort(({ level: a }, { level: b }) => a - b);
  }

  private getExpToNextLevel(levels: UserTrackLevelInfo[], currentLevel: number, currentPoints: number): number | null {
    const nextLevel = levels.find(({ level }) => level === currentLevel);
    return nextLevel.requiredPoints - currentPoints;
  }

  private sortByTime(activityInfos: UserFulfillmentActivityInfo[]): UserFulfillmentActivityInfo[] {
    return activityInfos.sort(
      ({ receivedTime: a }, { receivedTime: b }) => Date.parse(b.toString()) - Date.parse(a.toString())
    );
  }

  isRewardsEnabled(): Observable<boolean> {
    return this.userService.userData.pipe(
      switchMap(({ institutionId }) => this.configService.getSetting(institutionId, Settings.Setting.REWARDS_ENABLED)),
      map(({ value }) => Boolean(Number(value)))
    );
  }

  

}

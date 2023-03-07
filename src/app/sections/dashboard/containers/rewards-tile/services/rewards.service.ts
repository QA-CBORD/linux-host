import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  UserRewardTrackInfo,
  UserFulfillmentActivityInfo,
  UserTrackLevelInfo,
  LEVEL_STATUS,
  CLAIM_STATUS,
  OPT_IN_STATUS,
} from 'src/app/core/model/rewards/rewards.model';
import { RewardsApiService } from 'src/app/core/service/rewards/rewards-api.service';
import { Settings } from 'src/app/app.global';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Injectable()
export class RewardsService {
  private readonly _rewardTrack$: BehaviorSubject<UserRewardTrackInfo> = new BehaviorSubject<UserRewardTrackInfo>(null);

  private rewardTrackInfo: UserRewardTrackInfo;

  constructor(
    private readonly rewardsApi: RewardsApiService,
    private readonly settingsFacadeService: SettingsFacadeService
  ) {}

  get rewardTrack$(): Observable<UserRewardTrackInfo> {
    return this._rewardTrack$.asObservable();
  }

  private set _rewardTrack(rewardTrackInfo: UserRewardTrackInfo) {
    this.rewardTrackInfo = { ...rewardTrackInfo };
    this._rewardTrack$.next({ ...this.rewardTrackInfo });
  }

  getUserRewardTrackInfo(showToastOnError?: boolean): Observable<UserRewardTrackInfo> {
    return this.rewardsApi
      .getUserRewardTrackInfo(true, showToastOnError)
      .pipe(tap(trackInfo => (this._rewardTrack = trackInfo)));
  }

  getUserOptInStatus(): Observable<OPT_IN_STATUS> {
    return this._rewardTrack$.pipe(map(({ userOptInStatus }) => userOptInStatus));
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
    return this.settingsFacadeService.getSetting(Settings.Setting.REWARDS_ENABLED).pipe(
      map(({ value }) => Boolean(Number(value)))
    );
  }
}

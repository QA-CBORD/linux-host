import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, zip } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';

import { RewardsApiService } from './rewards-api.service';
import { ContentService } from '../../../core/service/content-service/content.service';

import { CLAIM_STATUS, ContentStringsParams, LEVEL_STATUS, LOCAL_ROUTING, OPT_IN_STATUS } from '../rewards.config';
import { RedeemableRewardInfo, UserFulfillmentActivityInfo, UserRewardTrackInfo, UserTrackLevelInfo } from '../models';
import { TabsConfig } from '../../../core/model/tabs/tabs.model';
import { ContentStringInfo } from '../../../core/model/content/content-string-info.model';

@Injectable()
export class RewardsService {
  private readonly rewardTrack$: BehaviorSubject<UserRewardTrackInfo> = new BehaviorSubject<UserRewardTrackInfo>(null);
  private readonly rewardHistory$: BehaviorSubject<UserFulfillmentActivityInfo[]> = new BehaviorSubject<
    UserFulfillmentActivityInfo[]
  >([]);
  private rewardTrackInfo: UserRewardTrackInfo;
  private rewardHistoryList: UserFulfillmentActivityInfo[];

  private content;

  constructor(private rewardsApi: RewardsApiService, private contentService: ContentService) {}

  get rewardTrack(): Observable<UserRewardTrackInfo> {
    return this.rewardTrack$.asObservable();
  }

  private set _rewardTrack(rewardTrackInfo: UserRewardTrackInfo) {
    this.rewardTrackInfo = { ...rewardTrackInfo };
    this.rewardTrack$.next({ ...this.rewardTrackInfo });
  }

  get rewardHistory(): Observable<UserFulfillmentActivityInfo[]> {
    return zip(this.rewardTrack, this.rewardHistory$.asObservable()).pipe(
      map(([{ trackLevels, redeemableRewards }, rewardHistory]) => {
        const arr = [];
        const levelArr = trackLevels.reduce(
          (total, currentValue) => [...total, ...currentValue.userClaimableRewards],
          []
        );
        const rewardsArr = [...redeemableRewards, ...levelArr];

        rewardsArr.forEach(({ id, description, shortDescription }) => {
          const findRewards = rewardHistory.find(
            reward => reward.rewardId === id && reward.status === CLAIM_STATUS.received
          );

          if (findRewards) {
            arr.push({ ...findRewards, description, shortDescription });
          }
        });

        return arr;
      })
    );
  }

  private set _rewardHistory(rewardHistory: UserFulfillmentActivityInfo[]) {
    this.rewardHistoryList = [...rewardHistory];
    this.rewardHistory$.next([...this.rewardHistoryList]);
  }

  getUserRewardTrackInfo(): Observable<UserRewardTrackInfo> {
    return this.rewardsApi.getUserRewardTrackInfo().pipe(tap(trackInfo => (this._rewardTrack = trackInfo)));
  }

  getUserRewardHistoryInfo(): Observable<UserFulfillmentActivityInfo[]> {
    return this.rewardsApi.getUserRewardHistoryInfo().pipe(tap(historyArray => (this._rewardHistory = historyArray)));
  }

  getUserOptInStatus(): Observable<OPT_IN_STATUS> {
    return this.rewardTrack.pipe(map(({ userOptInStatus }) => userOptInStatus));
  }

  getRewardsTabsConfig(): Observable<TabsConfig> {
    return this.rewardTrack.pipe(
      map(({ hasLevels, hasRedeemableRewards }) => {
        const tabConfig: TabsConfig = { tabs: [] };

        if (hasLevels) {
          tabConfig.tabs.push({ name: 'Levels', route: LOCAL_ROUTING.levels });
        }
        if (hasRedeemableRewards) {
          tabConfig.tabs.push({ name: 'Store', route: LOCAL_ROUTING.store });
        }

        tabConfig.tabs.push({ name: 'History', route: LOCAL_ROUTING.history });

        return tabConfig;
      })
    );
  }

  getTrackLevels(): Observable<UserTrackLevelInfo[]> {
    return this.rewardTrack.pipe(
      map(userInfo => {
        const levels = this.expandLevelInfoArray(userInfo);

        console.log(levels);
        return this.sortByLevel(levels);
      })
    );
  }

  private expandLevelInfoArray(userInfo: UserRewardTrackInfo): UserTrackLevelInfo[] {
    return userInfo.trackLevels.map(levelInfo => {
      levelInfo = { ...levelInfo, status: this.getLevelStatus(levelInfo, userInfo.userLevel) };
      return { ...levelInfo, description: this.getLevelDescription(levelInfo, userInfo) };
    });
  }

  private getLevelStatus({ level, userClaimableRewards: rewards }: UserTrackLevelInfo, userLevel: number): number {
    if (userLevel < level) return LEVEL_STATUS.locked;
    for (let i = 0; i < rewards.length; i++) {
      if (rewards[i].claimStatus === CLAIM_STATUS.claimed) return LEVEL_STATUS.claimed;
      if (rewards[i].claimStatus === CLAIM_STATUS.received) return LEVEL_STATUS.received;
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

  private getLevelDescription(
    { level, status, userClaimableRewards: rewards }: UserTrackLevelInfo,
    { userExperiencePoints: points, trackLevels }: UserRewardTrackInfo
  ): string {
    switch (status) {
      case LEVEL_STATUS.locked:
        const requiredXP = this.getExpToNextLevel(trackLevels, level, points);
        return `${requiredXP} XP away from reward`;
      case LEVEL_STATUS.claimed:
        return '1 Active Reward';
      case LEVEL_STATUS.received:
        return 'Reward Claimed';
      case LEVEL_STATUS.unlocked:
        return rewards.length > 0 ? 'Claim 1 Reward' : 'No offers currently available';
      default:
        return '';
    }
  }

  getStoreRewards(): Observable<RedeemableRewardInfo[]> {
    return this.rewardTrack.pipe(map(({ redeemableRewards }) => redeemableRewards));
  }

  getStoreActiveRewards(): Observable<RedeemableRewardInfo[]> {
    return zip(this.rewardTrack, this.rewardHistory).pipe(
      map(([{ redeemableRewards }, historyArray]) => {
        const activeStoreRewards: RedeemableRewardInfo[] = [];

        if (historyArray.length === 0) {
          return activeStoreRewards;
        }
        historyArray.forEach(({ rewardId, id }) => {
          const reward = redeemableRewards.find(reward => reward.id === rewardId);

          if (reward) {
            activeStoreRewards.push({ ...reward, id });
          }
        });

        return activeStoreRewards;
      }),
      take(1)
    );
  }

  initContentStringsList(): Observable<ContentStringInfo[]> {
    return this.contentService.retrieveContentStringList(ContentStringsParams).pipe(
      tap(res => {
        this.content = res.reduce((init, elem) => ({ ...init, [elem.name]: elem.value }), {});
      })
    );
  }

  getContentValueByName(name: string): string | undefined {
    return this.content[name];
  }
}

import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

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

  constructor(private readonly rewardsApi: RewardsApiService, private readonly contentService: ContentService) {}

  get rewardTrack(): Observable<UserRewardTrackInfo> {
    return this.rewardTrack$.asObservable();
  }

  get rewardHistory(): Observable<UserFulfillmentActivityInfo[]> {
    return this.rewardHistory$.asObservable();
  }

  private set _rewardTrack(rewardTrackInfo: UserRewardTrackInfo) {
    this.rewardTrackInfo = { ...rewardTrackInfo };
    this.rewardTrack$.next({ ...this.rewardTrackInfo });
  }

  private set _rewardHistory(rewardHistory: UserFulfillmentActivityInfo[]) {
    this.rewardHistoryList = [...rewardHistory];
    this.rewardHistory$.next([...this.rewardHistoryList]);
  }

  filterHistoryByStatus(status: CLAIM_STATUS): Observable<UserFulfillmentActivityInfo[]> {
    return zip(this.combineAllRewards(), this.rewardHistory).pipe(
      map(([rewards, rewardHistory]) => this.extractFromHistoryByStatus(rewardHistory, rewards, status))
    );
  }

  combineAllRewards(): Observable<RedeemableRewardInfo[]> {
    return this.rewardTrack.pipe(
      map(({ trackLevels, redeemableRewards }) => {
        let rewards = trackLevels.reduce((total, { userClaimableRewards }) => [...total, ...userClaimableRewards], []);

        return [...redeemableRewards, ...rewards];
      })
    );
  }

  getAllData(): Observable<any> {
    return zip(this.getUserRewardTrackInfo(), this.getUserRewardHistoryInfo());
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

        return this.sortByLevel(levels);
      })
    );
  }

  getStoreRewards(): Observable<RedeemableRewardInfo[]> {
    return this.rewardTrack.pipe(map(({ redeemableRewards }) => redeemableRewards));
  }

  getStoreActiveRewards(): Observable<UserFulfillmentActivityInfo[]> {
    return this.filterHistoryByStatus(CLAIM_STATUS.claimed);
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

  private extractFromHistoryByStatus(
    history: UserFulfillmentActivityInfo[],
    rewards: RedeemableRewardInfo[],
    status: CLAIM_STATUS
  ): UserFulfillmentActivityInfo[] {
    const cash = {};
    const res = [];

    for (let i = 0; i < history.length; i++) {
      if (history[i].status !== status) {
        continue;
      }
      let reward;
      if (!cash[history[i].rewardId]) {
        reward = rewards.find(reward => reward.id === history[i].rewardId);
      } else {
        reward = cash[history[i].rewardId];
      }

      if (reward) {
        cash[reward.id] = reward;
        res.push({ ...history[i], shortDescription: reward.shortDescription, description: reward.description });
      }
    }

    return res;
  }

  private expandLevelInfoArray(userInfo: UserRewardTrackInfo): UserTrackLevelInfo[] {
    return userInfo.trackLevels.map(levelInfo => {
      levelInfo = { ...levelInfo, status: this.getLevelStatus(levelInfo, userInfo.userLevel) };
      return { ...levelInfo, description: this.getLevelDescription(levelInfo, userInfo) };
    });
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
}

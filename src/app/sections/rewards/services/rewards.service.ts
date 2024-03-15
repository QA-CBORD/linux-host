import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, zip } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { RewardsApiService } from './rewards-api.service';

import {
  CLAIM_STATUS,
  CONTENT_STRINGS,
  ContentStringsParams,
  GenericContentStringsParams,
  LEVEL_STATUS,
  LOCAL_ROUTING,
  OPT_IN_STATUS,
} from '../rewards.config';
import { RedeemableRewardInfo, UserFulfillmentActivityInfo, UserRewardTrackInfo, UserTrackLevelInfo } from '../models';
import { TabsConfig } from '../../../core/model/tabs/tabs.model';
import { ContentStringInfo } from '../../../core/model/content/content-string-info.model';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';

@Injectable()
export class RewardsService {
  private readonly rewardTrack$: BehaviorSubject<UserRewardTrackInfo> = new BehaviorSubject<UserRewardTrackInfo>(null);
  private readonly rewardHistory$: BehaviorSubject<UserFulfillmentActivityInfo[]> = new BehaviorSubject<
    UserFulfillmentActivityInfo[]
  >([]);
  private rewardTrackInfo: UserRewardTrackInfo;
  private rewardHistoryList: UserFulfillmentActivityInfo[];

  private content;

  constructor(
    private readonly rewardsApi: RewardsApiService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService
  ) {}

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

  getHistoryListRewards(): Observable<UserFulfillmentActivityInfo[]> {
    return zip(this.combineAllRewards(), this.rewardHistory).pipe(
      map(([rewards, rewardHistory]) => {
        const history = this.extractFromHistoryByStatus(rewardHistory, rewards, CLAIM_STATUS.received, true);
        return this.sortByTime(history);
      })
    );
  }

  combineAllRewards(): Observable<RedeemableRewardInfo[]> {
    return this.rewardTrack.pipe(
      map(({ trackLevels = [], redeemableRewards = [] }) => {
        const rewards = trackLevels.reduce(
          (total, { userClaimableRewards }) => [...total, ...userClaimableRewards],
          []
        );

        return [...redeemableRewards, ...rewards];
      })
    );
  }

  getAllData(showToastOnError?: boolean): Observable<[UserRewardTrackInfo, UserFulfillmentActivityInfo[]]> {
    return zip(this.getUserRewardTrackInfo(showToastOnError), this.getUserRewardHistoryInfo(showToastOnError));
  }

  getUserRewardTrackInfo(showToastOnError?: boolean): Observable<UserRewardTrackInfo> {
    return this.rewardsApi
      .getUserRewardTrackInfo(showToastOnError)
      .pipe(tap(trackInfo => (this._rewardTrack = trackInfo)));
  }

  getUserRewardHistoryInfo(showToastOnError?: boolean): Observable<UserFulfillmentActivityInfo[]> {
    return this.rewardsApi
      .getUserRewardHistoryInfo(showToastOnError)
      .pipe(tap(historyArray => (this._rewardHistory = historyArray)));
  }

  getUserOptInStatus(): Observable<OPT_IN_STATUS> {
    return this.rewardTrack.pipe(map(({ userOptInStatus }) => userOptInStatus));
  }

  getRewardsTabsConfig(): Observable<TabsConfig> {
    return this.rewardTrack.pipe(
      map(({ hasLevels, hasRedeemableRewards }) => {
        const tabConfig: TabsConfig = { tabs: [] };

        if (hasLevels) {
          tabConfig.tabs.push({
            name: this.getContentValueByName(CONTENT_STRINGS.levelTabTitle) || 'Levels',
            route: LOCAL_ROUTING.levels,
            active: true,
          });
        }
        if (hasRedeemableRewards) {
          tabConfig.tabs.push({
            name: this.getContentValueByName(CONTENT_STRINGS.storeTabTitle) || 'Store',
            route: LOCAL_ROUTING.store,
            active: !hasLevels,
          });
        }

        tabConfig.tabs.push({
          name: this.getContentValueByName(CONTENT_STRINGS.historyTabTitle) || 'History',
          route: LOCAL_ROUTING.history,
          active: false,
        });

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
    return combineLatest(this.rewardTrack, this.rewardHistory).pipe(
      map(([{ redeemableRewards }, rewardHistory]) =>
        this.extractFromHistoryByStatus(rewardHistory, redeemableRewards, CLAIM_STATUS.claimed, false)
      )
    );
  }

  initContentStringsList(): Observable<ContentStringInfo[]> {
    return combineLatest(
      this.contentStringsFacadeService.retrieveContentStringListByRequest(ContentStringsParams),
      this.contentStringsFacadeService.retrieveContentStringListByRequest(GenericContentStringsParams)
    ).pipe(
      map(([res, res0]) => {
        const finalArray = [...res, ...res0];
        this.content = finalArray.reduce((init, elem) => ({ ...init, [elem.name]: elem.value }), {});
        return finalArray;
      }),
      take(1)
    );
  }

  getContentValueByName(name: string): string {
    return this.content[name] || '';
  }

  extractFromHistoryByRewardId(rewardId: string): UserFulfillmentActivityInfo {
    return this.rewardHistoryList.find(item => item.rewardId === rewardId);
  }

  private extractFromHistoryByStatus(
    history: UserFulfillmentActivityInfo[],
    rewards: RedeemableRewardInfo[],
    status: CLAIM_STATUS,
    isHistoryTab: boolean
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
        if (!reward && isHistoryTab) {
          reward = history[i];
        }
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

  private sortByTime(activityInfos: UserFulfillmentActivityInfo[]): UserFulfillmentActivityInfo[] {
    return activityInfos.sort(
      ({ receivedTime: a }, { receivedTime: b }) => Date.parse(b.toString()) - Date.parse(a.toString())
    );
  }

  private getLevelDescription(
    { level, status, userClaimableRewards: rewards }: UserTrackLevelInfo,
    { userExperiencePoints: points, trackLevels }: UserRewardTrackInfo
  ): string {
    switch (status) {
      case LEVEL_STATUS.locked:
        // eslint-disable-next-line no-case-declarations
        const requiredXP = this.getExpToNextLevel(trackLevels, level, points);
        return `${requiredXP} ${this.getContentValueByName(CONTENT_STRINGS.xpAwayFromRewardLabel)}`;
      case LEVEL_STATUS.claimed:
        return `1 ${this.getContentValueByName(CONTENT_STRINGS.activeRewardLabel)}`;
      case LEVEL_STATUS.received:
        return this.getContentValueByName(CONTENT_STRINGS.rewardClaimedLabel);
      case LEVEL_STATUS.unlocked:
        return rewards.length > 0
          ? this.getContentValueByName(CONTENT_STRINGS.claimTitle)
          : this.getContentValueByName(CONTENT_STRINGS.noOffersLabel);
      default:
        return '';
    }
  }
}

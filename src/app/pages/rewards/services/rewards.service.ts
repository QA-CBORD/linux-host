import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { RewardsApiService } from './rewards-api.service';
import { ContentService } from '../../../core/service/content-service/content.service';

import { CLAIM_STATUS, ContentStringsParams, LEVEL_STATUS, LOCAL_ROUTING, OPT_IN_STATUS } from '../rewards.config';
import { ContentStringInfo } from '../../../core/model/content/content-string-info.model';
import { LevelInfo, RedeemableRewardInfo, UserFulfillmentActivityInfo, UserRewardTrackInfo } from '../models';
import { tabsConfig } from '../../../core/model/tabs/tabs.model';

@Injectable()
export class RewardsService {
  private readonly rewardTrack$: BehaviorSubject<UserRewardTrackInfo> = new BehaviorSubject<UserRewardTrackInfo>(
    null
  );
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
    return this.rewardHistory$.asObservable();
  }

  private set _rewardHistory(rewardHistory: UserFulfillmentActivityInfo[]) {
    this.rewardHistoryList = { ...rewardHistory };
    this.rewardHistory$.next({ ...this.rewardHistoryList });
  }

  getUserRewardTrackInfo(): Observable<UserRewardTrackInfo> {
    return this.rewardsApi.getUserRewardTrackInfo().pipe(tap(trackInfo => (this._rewardTrack = trackInfo)));
  }

  getUserRewardHistoryInfo(): Observable<UserFulfillmentActivityInfo[]> {
    return this.rewardsApi.getUserRewardHistoryInfo().pipe(tap(historyArray => (this._rewardHistory = historyArray)));
  }

  getUserOptInStatus(): Observable<OPT_IN_STATUS> {
    return this.rewardTrack.pipe(
      switchMap(trackInfo => {
        return of(trackInfo.userOptInStatus);
      })
    );
  }

  getRewardsTabsConfig(): Observable<tabsConfig> {
    return this.rewardTrack.pipe(
      switchMap(trackInfo => {
        let tabConfig: tabsConfig = { tabs: [] };
        if (trackInfo.hasLevels) {
          tabConfig.tabs.push({ name: 'Levels', route: LOCAL_ROUTING.levels });
        }
        if (trackInfo.hasRedeemableRewards) {
          tabConfig.tabs.push({ name: 'Store', route: LOCAL_ROUTING.store });
        }
        tabConfig.tabs.push({ name: 'History', route: LOCAL_ROUTING.history });
        return of(tabConfig);
      })
    );
  }

  getTrackLevels(): Observable<LevelInfo[]> {
    return this.rewardTrack.pipe(
      switchMap(trackInfo => {
        let levelInfoArray: LevelInfo[] = [];
        trackInfo.trackLevels.forEach((level, i) => {
          let levelInfo: LevelInfo = {
            level: level.level,
            name: level.name,
            requiredPoints: level.requiredPoints,
            status: LEVEL_STATUS.unlocked,
            rewards: [],
          };
          const levelLocked: boolean = trackInfo.userLevel <= level.level;
          let levelClaimed: boolean = false;
          let levelReceived: boolean = false;
          trackInfo.trackLevels[i].userClaimableRewards.forEach(reward => {
            levelInfo.rewards.push(reward);
            const claimStatus = reward.claimStatus;
            levelClaimed = claimStatus === CLAIM_STATUS.claimed;
            levelReceived = claimStatus === CLAIM_STATUS.received;
          });
          levelInfo.status = levelLocked
            ? LEVEL_STATUS.locked
            : levelClaimed
            ? LEVEL_STATUS.claimed
            : levelReceived
            ? LEVEL_STATUS.received
            : LEVEL_STATUS.unlocked;
          levelInfoArray.push(levelInfo);
        });
        return of(
          levelInfoArray.sort((a, b) => {
            return a.level > b.level ? 1 : a.level < b.level ? -1 : 0;
          })
        );
      })
    );
  }

  getStoreRewards(): Observable<RedeemableRewardInfo[]> {
    return this.rewardTrack.pipe(
      switchMap(trackInfo => {
        return of(trackInfo.redeemableRewards);
      })
    );
  }

  getStoreActiveRewards(): Observable<RedeemableRewardInfo[]> {
    return combineLatest(this.rewardTrack, this.rewardHistory).pipe(
      take(1),
      switchMap(([rewardTrack, historyArray]) => {
        if (historyArray.length <= 0) {
          return of([]);
        }
        let activeStoreRewards: RedeemableRewardInfo[] = [];
        historyArray.forEach(item => {
          const reward = this.getStoreItemById(item.rewardId, rewardTrack.redeemableRewards);
          if (reward !== null) {
            activeStoreRewards.push(reward);
          }
        });
        return of(activeStoreRewards);
      })
    );
  }

  private getStoreItemById(rewardId: string, storeRewardsArray: RedeemableRewardInfo[]): RedeemableRewardInfo {
    storeRewardsArray.forEach(reward => {
      if (reward.id === rewardId) {
        return { ...reward };
      }
    });
    return null;
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

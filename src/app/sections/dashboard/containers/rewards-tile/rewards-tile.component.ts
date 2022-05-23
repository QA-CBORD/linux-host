import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { finalize, map, take } from 'rxjs/operators';
import { RewardsService } from './services/rewards.service';
import { UserTrackLevelInfo } from '@sections/rewards';
import { Observable } from 'rxjs';
import { UserRewardTrackInfo } from '@core/model/rewards/rewards.model';

@Component({
  selector: 'st-rewards-tile',
  templateUrl: './rewards-tile.component.html',
  styleUrls: ['./rewards-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RewardsTileComponent implements OnInit {
  isLoadingData = true;
  rewardTrackInfo$: Observable<UserRewardTrackInfo>;
  currentLvlInfo$: Observable<UserTrackLevelInfo>;
  nextLvlRequirePoints$: Observable<number | null>;
  userPointsSpent$: Observable<number>;

  constructor(private readonly rewardsService: RewardsService) {
  }

  ngOnInit() {
    this.getUserRewardTrackInfo();
  }

  getUserRewardTrackInfo() {
    this.rewardTrackInfo$ = this.rewardsService.getUserRewardTrackInfo().pipe(
      take(1),
      finalize(() => this.isLoadingData = false));

    this.currentLvlInfo$ = this.rewardTrackInfo$.pipe(
      map(({ trackLevels, userLevel }) => trackLevels.find(({ level }) => level === userLevel)));

    this.currentLvlInfo$ = this.rewardTrackInfo$.pipe(
      map(({ trackLevels, userLevel }) => trackLevels.find(({ level }) => level === userLevel)));

    this.nextLvlRequirePoints$ = this.rewardTrackInfo$.pipe(
      map(({ trackLevels, userLevel }) => {
        const nextLevel = trackLevels.find(({ level }) => level === userLevel + 1);
        return nextLevel ? nextLevel.requiredPoints : null;
      }));

    this.userPointsSpent$ = this.rewardTrackInfo$.pipe(map(({ userExperiencePoints }) => userExperiencePoints));
  }
}

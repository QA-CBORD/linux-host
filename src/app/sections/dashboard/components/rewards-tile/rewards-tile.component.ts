import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RewardsService } from '../../../rewards/services';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserRewardTrackInfo } from 'src/app/core/model/rewards/rewards.model';
import { UserTrackLevelInfo } from 'src/app/sections/rewards';

@Component({
  selector: 'st-rewards-tile',
  templateUrl: './rewards-tile.component.html',
  styleUrls: ['./rewards-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RewardsTileComponent implements OnInit {
  trackInfo$: Observable<UserRewardTrackInfo>;
  currentLevelInfo$: Observable<UserTrackLevelInfo>;
  levels$: Observable<UserTrackLevelInfo[]>;
  nextLevelPoints$: Observable<number>;

  levelInfo;
  currentPointsSpent;
  nextLevelPoints;
  pointsBalance;
  width;
  expToNextLvl;


  constructor(private readonly rewardsService: RewardsService) {}

  ngOnInit() {
    this.trackInfo$ = this.rewardsService.rewardTrack;
    this.currentLevelInfo$ = this.rewardsService.rewardTrack.pipe(
      map(({ userLevel, trackLevels }) => trackLevels.find(({ level }) => level === userLevel))
    );
    this.levels$ = this.rewardsService.getTrackLevels();
    this.nextLevelPoints$ = this.rewardsService.rewardTrack.pipe(
      map(({ userLevel, trackLevels }) => {
        const nextLevel = trackLevels.find(({ level }) => level === userLevel + 1);

        return trackLevels.find(({ level }) => level === userLevel + 1) ? nextLevel.requiredPoints : null;
      })
    );

    this.currentLevelInfo$.pipe(take(1)).subscribe(r => {
      this.levelInfo = r;
    });

    this.trackInfo$.pipe(take(1)).subscribe(r => {
      this.currentPointsSpent = r.userExperiencePoints;
    });

    this.nextLevelPoints$.pipe(take(1)).subscribe(r => {
      this.nextLevelPoints = r;
    });
    
    this.width = this.widthFunc();
    this.expToNextLvl = this.expToNextLvlFunc();
  }

  widthFunc(): number {
    const percent = (this.currentPointsSpent / this.nextLevelPoints) * 100;

    return percent > 100 || !this.nextLevelPoints ? 100 : percent;
  }

  expToNextLvlFunc(): string {
    if (!this.nextLevelPoints$) return 'Max Level';

    return `${this.currentPointsSpent}/${this.nextLevelPoints}XP`;
  }
}

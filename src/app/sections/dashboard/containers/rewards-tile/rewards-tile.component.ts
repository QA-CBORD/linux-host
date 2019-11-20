import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RewardsService } from './services/rewards.service';

@Component({
  selector: 'st-rewards-tile',
  templateUrl: './rewards-tile.component.html',
  styleUrls: ['./rewards-tile.component.scss'],
  
})
export class RewardsTileComponent implements OnInit {
  userLevel;
  userLevelName;
  currentPointsSpent;
  nextLevelPoints;
  pointsBalance;

  width;
  expToNextLvl;

  constructor(private readonly rewardsService: RewardsService) {}

  ngOnInit() {
    this.rewardsService
      .getUserRewardTrackInfo()
      .pipe(take(1))
      .subscribe(({ userLevel, trackLevels, userExperiencePoints, userCurrentPoints }) => {
        this.userLevel = userLevel;
        this.userLevelName = trackLevels.pop().name;
        this.pointsBalance = userExperiencePoints;
        this.currentPointsSpent = userCurrentPoints;
      });

    this.rewardsService
      .getUserRewardTrackInfo()
      .pipe(
        map(({ userLevel, trackLevels }) => {
          const nextLevel = trackLevels.find(({ level }) => level === userLevel + 1);

          return trackLevels.find(({ level }) => level === userLevel + 1) ? nextLevel.requiredPoints : null;
        })
      ).pipe(take(1))
      .subscribe(nextLevelPoints => this.nextLevelPoints = nextLevelPoints);

    this.width = this.calculateWidth();
    this.expToNextLvl = this.calculateExpToNextLvl();
  }

  calculateWidth(): number {
    const percent = (this.currentPointsSpent / this.nextLevelPoints) * 100;

    return percent > 100 || !this.nextLevelPoints ? 100 : percent;
  }

  calculateExpToNextLvl(): string {
    if (!this.nextLevelPoints) return 'Max Level';

    return `${this.currentPointsSpent}/${this.nextLevelPoints}XP`;
  }
}

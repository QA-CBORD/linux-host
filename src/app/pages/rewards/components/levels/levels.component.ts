import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RewardsService } from '../../services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRewardTrackInfo, UserTrackLevelInfo } from '../../models';

@Component({
  selector: 'st-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelsComponent implements OnInit {
  trackInfo$: Observable<UserRewardTrackInfo>;
  currentLevelInfo$: Observable<UserTrackLevelInfo>;

  constructor(private readonly rewardsService: RewardsService) {
  }

  ngOnInit() {
    this.trackInfo$ = this.rewardsService.rewardTrack;
    this.currentLevelInfo$ = this.rewardsService.rewardTrack.pipe(map(({ userLevel, trackLevels }) =>
      trackLevels.find(({ level }) => level === 5),
    ));
  }
}

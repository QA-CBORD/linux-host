import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RewardsService } from '../../services';
import { UserRewardTrackInfo, UserTrackLevelInfo } from '../../models';

@Component({
  selector: 'st-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelsComponent implements OnInit, AfterViewInit, OnDestroy {
  trackInfo$: Observable<UserRewardTrackInfo>;
  currentLevelInfo$: Observable<UserTrackLevelInfo>;
  levels$: Observable<UserTrackLevelInfo[]>;
  nextLevelPoints$: Observable<number>;

  constructor(private readonly rewardsService: RewardsService) {}


  ngAfterViewInit() {
    // location.replace(`${location.origin}`);
  }

  ngOnDestroy(): void {

    // console.log(location)
    // location.replace(`${location.origin}`)
  }

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
  }
}

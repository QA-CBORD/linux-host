import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserTrackLevelInfo } from '../../../pages/rewards/models';

@Component({
  selector: 'st-progress-bar',
  templateUrl: './st-progress-bar.component.html',
  styleUrls: ['./st-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StProgressBarComponent {
  @Input() currentPointsSpent: number;
  @Input() levelInfo: UserTrackLevelInfo;

  constructor() {}

  get width(): number {
    const percent = (this.currentPointsSpent / this.levelInfo.requiredPoints) * 100;
    return percent > 100 ? 100 : percent;
  }

}


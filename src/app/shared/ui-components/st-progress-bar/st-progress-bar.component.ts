import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { UserTrackLevelInfo } from '@sections/rewards';

@Component({
  selector: 'st-progress-bar',
  templateUrl: './st-progress-bar.component.html',
  styleUrls: ['./st-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StProgressBarComponent {
  @Input() currentPointsSpent: number = 0;
  @Input() currentLevelInfo: UserTrackLevelInfo = {} as UserTrackLevelInfo;
  @Input() nextLevelPoints: number = null;

  get width(): number {
    const percent = (this.currentPointsSpent / this.nextLevelPoints) * 100;

    return percent > 100 || !this.nextLevelPoints ? 100 : percent;
  }

  get expToNextLvl(): string {
    if (!this.nextLevelPoints) return 'Max Level';

    return `${this.currentPointsSpent}/${this.nextLevelPoints}XP`;
  }
}

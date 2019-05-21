import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { UserTrackLevelInfo } from '../../../../models';
import { CLAIM_STATUS, LEVEL_STATUS } from '../../../../rewards.config';

@Component({
  selector: 'st-expand-item',
  templateUrl: './expand-item.component.html',
  styleUrls: ['./expand-item.component.scss', '../expand-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandItemComponent {
  @Input() levelInfo: UserTrackLevelInfo;
  @Input() currentLevel: number;
  @Output() onClickExpand: EventEmitter<number> = new EventEmitter<number>();
  show: boolean = false;

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  get levelClass(): string {
    const baseClass = 'progress__level';
    const passed = `${baseClass}--passed`;
    const active = `${baseClass}--active`;
    const { level } = this.levelInfo;
    const modifier = level <= this.currentLevel && (level === this.currentLevel ? active : passed);

    return `${baseClass} ${modifier || ''}`;
  }

  onExpandHandle() {
    this.onClickExpand.emit((this.show = !this.show) ? this.levelInfo.level : null);
  }

  closeExpand() {
    this.show = false;
    this.cdRef.detectChanges();
  }

  isLockedItem(reward) {
    return reward.claimLevel > this.currentLevel;
  }

  isUnearnedItem(reward) {
    return (
      reward.claimStatus === CLAIM_STATUS.unearned &&
      (reward.claimLevel < this.currentLevel ||
        (reward.claimStatus === CLAIM_STATUS.unearned && reward.status !== LEVEL_STATUS.received))
    );
  }
}

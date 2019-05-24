import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { ClaimableRewardInfo, UserTrackLevelInfo } from '../../../../models';
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
    const giftGotten = `${baseClass}--passed`;
    const activeGift = `${baseClass}--active`;
    const claimed = `${baseClass}--claimed`;
    const current = `${baseClass}--current`;
    const modifier =
      this.levelInfo.level <= this.currentLevel
        ? this.hasLevelRewardToClaim && !this.hasNoRewards
          ? activeGift
          : this.hasLevelReceivedReward
          ? giftGotten
          : claimed
        : '';
    const currentLvl = this.isCurrentLvl ? current : '';

    return `${baseClass} ${modifier} ${currentLvl}`;
  }

  get hasLevelRewardToClaim(): boolean {
    return this.levelInfo.status === LEVEL_STATUS.unlocked;
  }

  get hasNoRewards(): boolean {
    return !this.levelInfo.userClaimableRewards.length;
  }

  private get isCurrentLvl(): boolean {
    return this.levelInfo.level === this.currentLevel;
  }

  private get hasLevelReceivedReward(): boolean {
    return this.levelInfo.status === LEVEL_STATUS.received;
  }

  onExpandHandle() {
    this.onClickExpand.emit((this.show = !this.show) ? this.levelInfo.level : null);
  }

  closeExpand() {
    this.show = false;
    this.cdRef.detectChanges();
  }

  isLockedItem(reward): boolean {
    return reward.claimLevel > this.currentLevel;
  }

  isUnearnedItem(reward): boolean {
    return reward.claimStatus === CLAIM_STATUS.unearned && this.levelInfo.status !== LEVEL_STATUS.unlocked;
  }

  trackFn(rewardInfo: ClaimableRewardInfo): string {
    return rewardInfo.id;
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { ClaimableRewardInfo, UserTrackLevelInfo } from '../../../../models';
import { CLAIM_STATUS, LEVEL_STATUS } from '../../../../rewards.config';

@Component({
  selector: 'st-expand-item',
  templateUrl: './expand-item.component.html',
  styleUrls: ['./expand-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandItemComponent {
  @Input() levelInfo: UserTrackLevelInfo;
  @Input() currentLevel: number;
  @Output() onClickExpand: EventEmitter<number> = new EventEmitter<number>();
  show = false;

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  get levelClass(): string {
    const baseClass = 'progress__level';
    const current = `${baseClass}--current`;
    const modifier = this.getModifier(baseClass);
    const currentLvl = this.isCurrentLvl ? current : '';

    return `${baseClass} ${modifier} ${currentLvl}`;
  }

  get isUnlocked(): boolean {
    return this.levelInfo.status === LEVEL_STATUS.unlocked;
  }

  get hasRewardClaimed(): boolean {
    return this.levelInfo.status === LEVEL_STATUS.claimed;
  }

  get isLevelLocked(): boolean {
    return this.levelInfo.status === LEVEL_STATUS.locked;
  }

  get hasRewardReceived(): boolean {
    return this.levelInfo.status === LEVEL_STATUS.received;
  }

  get hasRewards(): boolean {
    return !!this.levelInfo.userClaimableRewards.length;
  }

  get icon(): string {
    const gift = '/assets/icon/gift-white.svg';
    const qr = '/assets/icon/qr-code-blue.svg';

    return this.hasRewardClaimed ? qr : gift;
  }

  private get isCurrentLvl(): boolean {
    return this.levelInfo.level === this.currentLevel;
  }

  private get hasLevelReceivedReward(): boolean {
    return this.levelInfo.status === LEVEL_STATUS.received;
  }

  private getModifier(baseClass: string): string {
    if (this.levelInfo.level > this.currentLevel) return '';
    const giftGotten = `${baseClass}--passed`;
    const activeGift = `${baseClass}--active`;
    const claimed = `${baseClass}--claimed`;
    const scan = `${baseClass}--scan`;

    return this.isUnlocked && this.hasRewards
      ? activeGift
      : this.hasLevelReceivedReward
      ? giftGotten
      : this.hasRewardClaimed
      ? `${claimed} ${scan}`
      : claimed;
  }

  onExpandHandle() {
    // eslint-disable-next-line no-cond-assign
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

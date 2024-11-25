import { Component, OnInit } from '@angular/core';
import { RewardsService } from '../../services';
import { Observable } from 'rxjs';
import { RedeemableRewardInfo, UserFulfillmentActivityInfo, UserRewardTrackInfo } from '../../models';
import { CONTENT_STRINGS } from '../../rewards.config';

@Component({
  selector: 'st-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  rewards: Observable<RedeemableRewardInfo[]>;
  activeRewards: Observable<UserFulfillmentActivityInfo[]>;
  track: Observable<UserRewardTrackInfo>;
  contentString: { [key: string]: string };

  constructor(private readonly rewardsService: RewardsService) {
    this.initContentStrings();
  }

  ngOnInit() {
    this.rewards = this.rewardsService.getStoreRewards();
    this.track = this.rewardsService.rewardTrack;
    this.activeRewards = this.rewardsService.getStoreActiveRewards();
  }

  trackByFn(index, { id }): string {
    return id;
  }

  private initContentStrings() {
    const activeRewardsLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.activeRewardsLabel);
    const claimInstructionsLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.claimInstructionsLabel);

    this.contentString = {
      activeRewardsLabel,
      claimInstructionsLabel,
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { RewardsService } from '../../services';
import { zip } from 'rxjs';
import { RedeemableRewardInfo, UserFulfillmentActivityInfo, UserRewardTrackInfo } from '../../models';

@Component({
  selector: 'st-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  rewards: RedeemableRewardInfo[];
  activeRewards: UserFulfillmentActivityInfo[];
  track: UserRewardTrackInfo;

  constructor(private readonly rewardsService: RewardsService) {}

  ngOnInit() {
    zip(
      this.rewardsService.getStoreRewards(),
      this.rewardsService.getStoreActiveRewards(),
      this.rewardsService.rewardTrack
    ).subscribe(([rewards, activeRewards, track]) => {
      this.track = track;
      this.rewards = rewards;
      this.activeRewards = activeRewards;
    });
  }
}

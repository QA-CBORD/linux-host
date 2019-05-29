import { Component, OnInit } from '@angular/core';
import { RewardsService } from '../../services';
import { Observable } from 'rxjs';
import { RedeemableRewardInfo, UserFulfillmentActivityInfo, UserRewardTrackInfo } from '../../models';

@Component({
  selector: 'st-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  rewards: Observable<RedeemableRewardInfo[]>;
  activeRewards: Observable<UserFulfillmentActivityInfo[]>;
  track: Observable<UserRewardTrackInfo>;

  constructor(private readonly rewardsService: RewardsService) {}

  ngOnInit() {
    this.rewards = this.rewardsService.getStoreRewards();
    this.track = this.rewardsService.rewardTrack;
    this.activeRewards = this.rewardsService.getStoreActiveRewards();
  }

  trackByFn(index, { id }): string {
    return id;
  }
}

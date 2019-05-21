import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ClaimableRewardInfo, RedeemableRewardInfo, UserFulfillmentActivityInfo } from '../../models';
import { RewardsPopoverComponent } from '../rewards-popover';
import { RewardsApiService } from '../../services';
import { LEVEL_STATUS } from '../../rewards.config';

@Component({
  selector: 'st-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent implements OnInit {
  [x: string]: any;
  @Input() environment: string;
  @Input() item: RedeemableRewardInfo | UserFulfillmentActivityInfo | ClaimableRewardInfo;
  @Input() active: boolean;
  @Input() currentPoints: number;
  @Input() userLevel: number;
  @Input() statusLevel: number;

  constructor(private readonly popoverCtrl: PopoverController, private readonly rewardsApi: RewardsApiService) {}

  ngOnInit() {}
  get disabledStoreReward(): boolean {
    return !this.isHistoryEnv && this.currentPoints < this.item['pointCost'];
  }

  get isHistoryEnv(): boolean {
    return this.environment === 'history';
  }

  get isStoreEnv(): boolean {
    return this.environment === 'store';
  }

  get isLevelsEnv(): boolean {
    return this.environment === 'levels';
  }

  async openPopover(data, scan = false) {
    if (
      this.isHistoryEnv ||
      !(this.isStoreEnv && (this.active || this.currentPoints >= this.item['pointCost'])) ||
      (this.isLevelsEnv && this.statusLevel === LEVEL_STATUS.received)
    ) {
      return;
    }

    const popover = await this.popoverCtrl.create({
      component: RewardsPopoverComponent,
      componentProps: {
        data: { ...data },
        scan,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ data }) => {
      if (data === 'REDEEM') {
        this.rewardsApi.claimReward(this.item.id).subscribe((res: boolean) => {
          if (res) {
            this.openPopover(this.item, true);
          }
        });
      }
    });

    return await popover.present();
  }

  isLowerThenCurrentLevel(item) {
    return item.claimLevel <= this.userLevel;
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RedeemableRewardInfo, UserFulfillmentActivityInfo } from '../../models';
import { RewardsPopoverComponent } from '../rewards-popover';
import { RewardsApiService } from '../../services';
import { LEVEL_STATUS } from '../../rewards.config';
import { PopupTypes } from '../../rewards.config';
import { take } from 'rxjs/operators';

@Component({
  selector: 'st-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Input() environment: string;
  @Input() item: RedeemableRewardInfo | UserFulfillmentActivityInfo;
  @Input() active: boolean;
  @Input() currentPoints: number;
  @Input() userLevel: number;
  @Input() statusLevel: number;

  constructor(private readonly popoverCtrl: PopoverController, private readonly rewardsApi: RewardsApiService) {}

  get disabledStoreReward(): boolean {
    return !this.isHistoryEnv && this.currentPoints < this.item['pointCost'];
  }

  get type(): string {
    return this.active ? PopupTypes.SCAN : PopupTypes.REDEEM;
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

  async openPopover(data, type: string = PopupTypes.REDEEM) {
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
        type,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ data }) => {
      if (data === PopupTypes.REDEEM) {
        this.rewardsApi
          .claimReward(this.item.id)
          .pipe(take(1))
          .subscribe((res: boolean) => {
            if (res) {
              this.openPopover(this.item, PopupTypes.SCAN);
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

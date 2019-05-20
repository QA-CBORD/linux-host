import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RedeemableRewardInfo, UserFulfillmentActivityInfo } from '../../models';
import { RewardsPopoverComponent } from '../rewards-popover';
import { RewardsApiService } from '../../services';

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

  constructor(private readonly popoverCtrl: PopoverController, private readonly rewardsApi: RewardsApiService) {}

  get disabledStoreReward(): boolean {
    return !this.isHistoryEnv() && this.currentPoints < this.item['pointCost'];
  }

  isHistoryEnv(): boolean {
    return this.environment === 'history';
  }

  async openPopover(data, scan = false) {
    if (!(!this.isHistoryEnv() && (this.active || this.currentPoints >= this.item['pointCost']))) {
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
        // this.openPopover(this.item, true);
      }
    });

    return await popover.present();
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RewardsPopoverComponent } from '../rewards-popover';
import { finalize, map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RedeemableRewardInfo, UserFulfillmentActivityInfo, UserRewardTrackInfo } from '@sections/rewards/models';
import { RewardsApiService, RewardsService } from '@sections/rewards/services';
import { LoadingService } from '@core/service/loading/loading.service';
import { CLAIM_STATUS, CONTENT_STRINGS, LEVEL_STATUS, PopupTypes } from '@sections/rewards/rewards.config';
import { BUTTON_TYPE } from '@core/utils/buttons.config';

@Component({
  selector: 'st-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Input() environment: string;
  @Input() item: RedeemableRewardInfo;
  @Input() active: boolean;
  @Input() currentPoints: number;
  @Input() userLevel: number;
  @Input() statusLevel: number;
  contentString: { [key: string]: string };

  constructor(
    private readonly popoverCtrl: PopoverController,
    private readonly rewardsApi: RewardsApiService,
    private readonly rewardsService: RewardsService,
    private readonly loadingService: LoadingService,
  ) {
    this.initContentStrings();
  }

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

  get isClaimed(): boolean {
    return this.item.claimStatus === CLAIM_STATUS.claimed;
  }

  get isReceived(): boolean {
    return this.item.claimStatus === CLAIM_STATUS.received;
  }

  get isUnearned(): boolean {
    return this.item.claimStatus === CLAIM_STATUS.unearned;
  }

  get listItemScoreValue() {
    return this.item['rewardLevel']
      ? `${this.contentString.levelLabel} ${this.item['rewardLevel']}`
      : `${this.item['pointsSpent'] || this.item['pointCost'] || 0} ${this.contentString.pointsCostLabel}`;
  }

  get isLowerThenCurrentLevel(): boolean {
    return this.item.claimLevel <= this.userLevel;
  }

  async openPopover(data: RedeemableRewardInfo, type: PopupTypes = this.defaultPopoverAction(data.claimStatus)) {
    if (this.preventOpenPopover()) {
      return;
    }

    if (this.isLevelsEnv && type === PopupTypes.SCAN) {
      const historyItem = this.rewardsService.extractFromHistoryByRewardId(data.id);
      const historyItemId = (historyItem && historyItem.id) || data.id;

      data = { ...data, id: historyItemId };
    }

    const popover = await this.popoverCtrl.create({
      component: RewardsPopoverComponent,
      componentProps: {
        data: { ...data },
        type,
      },
      cssClass: 'sc-popover',
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ role }) => this.onDismissPopoverHandler(role as BUTTON_TYPE, type));

    return await popover.present();
  }

  private onDismissPopoverHandler(role: BUTTON_TYPE, type: PopupTypes) {
    if (role === BUTTON_TYPE.CLOSE && type === PopupTypes.SCAN) {
      this.rewardsService
        .getAllData()
        .pipe(take(1))
        .subscribe();
    }
    if (role === BUTTON_TYPE.REDEEM || role === BUTTON_TYPE.CLAIM) {
      this.rewardsApi
        .claimReward(this.item.id)
        .pipe(
          take(1),
          switchMap(res => this.refreshData().pipe(take(1),map(() => res))),
        )
        .subscribe(res => {
          const type = res.status === CLAIM_STATUS.claimed ? PopupTypes.SCAN : PopupTypes.SUCCESS;

          this.openPopover(
            { ...res, shortDescription: this.item.shortDescription, description: this.item.description },
            type,
          );
        });
    }
  }

  private refreshData(): Observable<[UserRewardTrackInfo, UserFulfillmentActivityInfo[]]> {
    this.loadingService.showSpinner();
    return this.rewardsService.getAllData().pipe(
      take(1),
      finalize(() => this.loadingService.closeSpinner()),
    );
  }

  private defaultPopoverAction(claimStatus): PopupTypes {
    const isUnearnedStatus = claimStatus === CLAIM_STATUS.unearned;
    const isClaimedStatus = claimStatus === CLAIM_STATUS.claimed;

    return this.active || isClaimedStatus ? PopupTypes.SCAN : isUnearnedStatus ? PopupTypes.CLAIM : PopupTypes.REDEEM;
  }

  private preventOpenPopover(): boolean {
    return (
      this.isHistoryEnv ||
      (this.isStoreEnv && !(this.active || this.currentPoints >= this.item['pointCost'])) ||
      (this.isLevelsEnv && this.statusLevel === LEVEL_STATUS.received)
    );
  }

  private initContentStrings() {
    const levelLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.levelLabel);
    const pointsCostLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.pointsCostLabel);
    const scanLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.scanLabel);
    const claimLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.claimLabel);
    const redeemLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.redeemLabel);
    const claimedLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.claimedLabel);

    this.contentString = { levelLabel, pointsCostLabel, scanLabel, claimLabel, redeemLabel, claimedLabel };
  }
}

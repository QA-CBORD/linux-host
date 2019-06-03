import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RedeemableRewardInfo } from '../../models';
import { RewardsPopoverComponent } from '../rewards-popover';
import { RewardsApiService, RewardsService } from '../../services';
import { CLAIM_STATUS, CONTENT_STRINGS, LEVEL_STATUS } from '../../rewards.config';
import { PopupTypes } from '../../rewards.config';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '../../../../core/service/loading/loading.service';
import { BUTTON_TYPE } from '../../../../core/utils/buttons.config';

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
    private readonly loadingService: LoadingService
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

  get listItemScoreValue() {
    return this.item['rewardLevel']
      ? `${this.contentString.levelLabel} ${this.item['rewardLevel']}`
      : `${this.item['pointsSpent'] || this.item['pointCost'] || 0} ${this.contentString.pointsCostLabel}`;
  }

  async openPopover(data, type: string = this.defaultPopoverAction(data.claimStatus)) {
    if (this.preventOpenPopover()) {
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

    popover.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.REDEEM || role === BUTTON_TYPE.CLAIM) {
        this.rewardsApi
          .claimReward(this.item.id)
          .pipe(
            switchMap(res => this.refreshData().pipe(map(() => res))),
            take(1)
          )
          .subscribe(res => {
            const type = res.status === CLAIM_STATUS.claimed ? PopupTypes.SCAN : PopupTypes.SUCCESS;

            this.openPopover(this.item, type);
          });
      }
    });

    return await popover.present();
  }

  isLowerThenCurrentLevel(item): boolean {
    return item.claimLevel <= this.userLevel;
  }

  private refreshData(): Observable<any> {
    this.loadingService.showSpinner();
    return this.rewardsService.getAllData().pipe(
      tap(() => this.loadingService.closeSpinner()),
      catchError(e => {
        this.loadingService.closeSpinner();
        return throwError(e);
      })
    );
  }

  private defaultPopoverAction(claimStatus): string {
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

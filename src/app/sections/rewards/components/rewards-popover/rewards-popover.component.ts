import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import bwipjs from 'bwip-angular2';
import { RedeemableRewardInfo, UserFulfillmentActivityInfo } from '@sections/rewards/models';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { RewardsService } from '@sections/rewards/services';
import { PopupTypes, CONTENT_STRINGS } from '@sections/rewards/rewards.config';
import { buttons } from '@core/utils/buttons.config';
import { PopupButton } from '@core/model/button/popup-button.model';


@Component({
  selector: 'st-rewards-popover',
  templateUrl: './rewards-popover.component.html',
  styleUrls: ['./rewards-popover.component.scss'],
})
export class RewardsPopoverComponent implements OnInit, AfterViewInit {
  @Input() data: RedeemableRewardInfo;
  @Input() type: string;
  popoverConfig: PopoverConfig<string>;
  contentString: { [key: string]: string };

  constructor(private rewardsService: RewardsService) {
    this.initContentStrings();
  }

  get scan(): boolean {
    return this.type === PopupTypes.SCAN;
  }

  get redeem(): boolean {
    return this.type === PopupTypes.REDEEM;
  }

  get success(): boolean {
    return this.type === PopupTypes.SUCCESS;
  }

  get claim(): boolean {
    return this.type === PopupTypes.CLAIM;
  }

  get optIn(): boolean {
    return this.type === PopupTypes.OPT_IN;
  }

  ngOnInit() {
    this.popoverConfig = {
      title: this.getTitle(this.type),
      type: this.type,
      buttons: this.configureButtons(this.type),
      message: this.getMessage(this.data),
      code: this.getCode(this.type, this.data),
    };
  }

  ngAfterViewInit() {
    this.type === PopupTypes.SCAN && this.initBarcode();
  }

  // TODO fix after pre-demo (string affects align!)

  private getCode(type: string, data: RedeemableRewardInfo | UserFulfillmentActivityInfo): string {
    if (type === PopupTypes.SCAN) {
      return data.id;
    }
    if (type === PopupTypes.SUCCESS) {
      return ' ';
    }

    return '';
  }

  private getMessage({ name = null, itemName = null, description }: RedeemableRewardInfo): { [key: string]: string } {
    return {
      title: name || itemName,
      description: description,
    };
  }

  private configureButtons(type: string): PopupButton[] {
    switch (type) {
      case PopupTypes.CLAIM:
        return [
          { ...buttons.CANCEL, label: this.contentString.cancelButton },
          { ...buttons.CLAIM, label: this.contentString.claimButton },
        ];
      case PopupTypes.REDEEM:
        return [
          { ...buttons.CANCEL, label: this.contentString.cancelButton },
          { ...buttons.REDEEM, label: this.contentString.redeemButton },
        ];
      case PopupTypes.RETRY:
        return [{ ...buttons.RETRY, label: this.contentString.retryButton }];
      case PopupTypes.OPT_IN:
        return [{ ...buttons.OPT_IN, label: this.contentString.optInBtn }];
      default:
        return [{ ...buttons.CLOSE, label: this.contentString.closeButton }];
    }
  }

  private getTitle(type: string): string {
    switch (type) {
      case PopupTypes.REDEEM:
        return this.contentString.redeemTitle;
      case PopupTypes.SCAN:
        return this.contentString.scanCodeTitle;
      case PopupTypes.SUCCESS:
        return this.contentString.successTitle;
      case PopupTypes.CLAIM:
        return this.contentString.claimTitle;
      case PopupTypes.RETRY:
        return this.contentString.retryTitle;
      default:
        return '';
    }
  }

  private initBarcode() {
    bwipjs(
      'barcodeCanvas',
      {
        bcid: 'qrcode',
        text: this.popoverConfig.code,
        includetext: false,
      },
      () => { return; }
    );
  }

  private initContentStrings() {
    const levelLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.levelLabel);
    const pointsCostLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.pointsCostLabel);
    const scanLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.scanLabel);
    const claimLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.claimLabel);
    const redeemLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.redeemLabel);
    const claimedLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.claimedLabel);
    const claimButton = this.rewardsService.getContentValueByName(CONTENT_STRINGS.claimButton);
    const redeemButton = this.rewardsService.getContentValueByName(CONTENT_STRINGS.redeemButton);
    const retryButton = this.rewardsService.getContentValueByName(CONTENT_STRINGS.retryBtn);
    const closeButton = this.rewardsService.getContentValueByName(CONTENT_STRINGS.closeBtn);
    const cancelButton = this.rewardsService.getContentValueByName(CONTENT_STRINGS.cancelBtn);
    const successTitle = this.rewardsService.getContentValueByName(CONTENT_STRINGS.successTitle);
    const claimTitle = this.rewardsService.getContentValueByName(CONTENT_STRINGS.claimTitle);
    const redeemTitle = this.rewardsService.getContentValueByName(CONTENT_STRINGS.redeemTitle);
    const scanCodeTitle = this.rewardsService.getContentValueByName(CONTENT_STRINGS.scanCodeTitle);
    const retryTitle = this.rewardsService.getContentValueByName(CONTENT_STRINGS.retryTitle);
    const scanCodeDescription = this.rewardsService.getContentValueByName(CONTENT_STRINGS.scanCodeDescription);
    const optInBtn = this.rewardsService.getContentValueByName(CONTENT_STRINGS.optInBtn);

    this.contentString = {
      optInBtn,
      levelLabel,
      pointsCostLabel,
      scanLabel,
      claimLabel,
      redeemLabel,
      claimedLabel,
      claimButton,
      redeemButton,
      retryButton,
      closeButton,
      cancelButton,
      successTitle,
      claimTitle,
      redeemTitle,
      scanCodeTitle,
      retryTitle,
      scanCodeDescription,
    };
  }
}

import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import bwipjs from 'bwip-angular2';

import { Message, popoverConfig } from '../../../../core/model/popover/popover.model';
import { buttons } from '../../../../core/utils/buttons.config';
import { CONTENT_STRINGS, PopupTypes } from '../../rewards.config';
import { RedeemableRewardInfo, UserFulfillmentActivityInfo } from '../../models';
import { PopupButton } from '../../../../core/model/button';
import { RewardsService } from '../../services';

@Component({
  selector: 'st-rewards-popover',
  templateUrl: './rewards-popover.component.html',
  styleUrls: ['./rewards-popover.component.scss'],
})
export class RewardsPopoverComponent implements OnInit, AfterViewInit {
  @Input() data: RedeemableRewardInfo;
  @Input() type: string;
  popoverConfig: popoverConfig;
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

  private getMessage({ name = null, itemName = null, shortDescription }: RedeemableRewardInfo): Message {
    return {
      title: name || itemName,
      description: shortDescription,
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
      (err, cvs) => {}
    );
  }

  private initContentStrings() {
    let levelLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.levelLabel);
    let pointsCostLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.pointsCostLabel);
    let scanLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.scanLabel);
    let claimLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.claimLabel);
    let redeemLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.redeemLabel);
    let claimedLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.claimedLabel);
    let claimButton = this.rewardsService.getContentValueByName(CONTENT_STRINGS.claimButton);
    let redeemButton = this.rewardsService.getContentValueByName(CONTENT_STRINGS.redeemButton);
    let retryButton = this.rewardsService.getContentValueByName(CONTENT_STRINGS.retryBtn);
    let closeButton = this.rewardsService.getContentValueByName(CONTENT_STRINGS.closeBtn);
    let cancelButton = this.rewardsService.getContentValueByName(CONTENT_STRINGS.cancelBtn);
    let successTitle = this.rewardsService.getContentValueByName(CONTENT_STRINGS.successTitle);
    let claimTitle = this.rewardsService.getContentValueByName(CONTENT_STRINGS.claimTitle);
    let redeemTitle = this.rewardsService.getContentValueByName(CONTENT_STRINGS.redeemTitle);
    let scanCodeTitle = this.rewardsService.getContentValueByName(CONTENT_STRINGS.scanCodeTitle);
    let retryTitle = this.rewardsService.getContentValueByName(CONTENT_STRINGS.retryTitle);
    let scanCodeDescription = this.rewardsService.getContentValueByName(CONTENT_STRINGS.scanCodeDescription);
    let optInBtn = this.rewardsService.getContentValueByName(CONTENT_STRINGS.optInBtn);

    levelLabel = levelLabel || '';
    pointsCostLabel = pointsCostLabel || '';
    scanLabel = scanLabel || '';
    claimLabel = claimLabel || '';
    redeemLabel = redeemLabel || '';
    claimedLabel = claimedLabel || '';
    claimButton = claimButton || '';
    redeemButton = redeemButton || '';
    retryButton = retryButton || '';
    closeButton = closeButton || '';
    cancelButton = cancelButton || '';
    successTitle = successTitle || '';
    claimTitle = claimTitle || '';
    redeemTitle = redeemTitle || '';
    scanCodeTitle = scanCodeTitle || '';
    retryTitle = retryTitle || '';
    scanCodeDescription = scanCodeDescription || '';
    optInBtn = optInBtn || '';

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

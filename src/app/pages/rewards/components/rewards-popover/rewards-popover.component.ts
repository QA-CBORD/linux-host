import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import bwipjs from 'bwip-angular2';

import { Message, popoverConfig } from '../../../../core/model/popover/popover.model';
import { buttons } from '../../../../core/utils/buttons.config';
import { PopupTypes } from '../../rewards.config';
import { RedeemableRewardInfo, UserFulfillmentActivityInfo } from '../../models';
import { PopupButton } from '../../../../core/model/button';

@Component({
  selector: 'st-rewards-popover',
  templateUrl: './rewards-popover.component.html',
  styleUrls: ['./rewards-popover.component.scss'],
})
export class RewardsPopoverComponent implements OnInit, AfterViewInit {
  @Input() data: RedeemableRewardInfo;
  @Input() type: string;
  popoverConfig: popoverConfig;

  constructor() {}

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
        return [buttons.CANCEL, buttons.CLAIM];
      case PopupTypes.REDEEM:
        return [buttons.CANCEL, buttons.REDEEM];
      case PopupTypes.RETRY:
        return [buttons.RETRY];
      case PopupTypes.OPT_IN:
        return [buttons.OPT_IN];
      default:
        return [buttons.CLOSE];
    }
  }

  private getTitle(type: string): string {
    switch (type) {
      case PopupTypes.REDEEM:
        return popoverTitles.redeem;
      case PopupTypes.SCAN:
        return popoverTitles.scan;
      case PopupTypes.SUCCESS:
        return popoverTitles.success;
      case PopupTypes.CLAIM:
        return popoverTitles.claim;
      case PopupTypes.RETRY:
        return popoverTitles.retry;
      case PopupTypes.OPT_IN:
        return popoverTitles.optIn;
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
}

enum popoverTitles {
  redeem = 'Redeem Reward',
  scan = 'Scan Code',
  success = 'Success',
  claim = 'Claim Reward',
  retry = 'Retry get it',
  optIn = 'Opt in modal',
}

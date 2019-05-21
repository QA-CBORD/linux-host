import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import bwipjs from 'bwip-angular2';

import { popoverConfig } from '../../../../core/model/popover/popover.model';
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
  @Input() data: RedeemableRewardInfo | UserFulfillmentActivityInfo;
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

  ngOnInit() {
    this.popoverConfig = {
      title: this.getTitle(this.type),
      type: this.type,
      buttons: this.configureButtons(),
      message: this.data,
      code: this.getCode(),
    };
  }

  ngAfterViewInit() {
    this.type === PopupTypes.SCAN && this.initBarcode();
  }

  // jestkii kostil

  private getCode(): string {
    if (this.type === PopupTypes.SCAN) {
      return this.data.id;
    }
    if (this.type === PopupTypes.SUCCESS) {
      return ' ';
    }

    return '';
  }

  private configureButtons(): PopupButton[] {
    const close = [buttons.CLOSE];
    const redeem = [buttons.CANCEL, buttons.REDEEM];
    const claim = [buttons.CANCEL, buttons.REDEEM];

    switch (this.type) {
      case PopupTypes.CLAIM:
        return claim;
      case PopupTypes.REDEEM:
        return redeem;
      default:
        return close;
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
}

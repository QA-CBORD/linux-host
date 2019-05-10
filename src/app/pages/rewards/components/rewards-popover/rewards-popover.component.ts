import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import bwipjs from 'bwip-angular2';
import { popoverConfig } from '../../../../core/model/popover/popover.model';
import { buttons } from '../../../../core/utils/buttons.config';

@Component({
  selector: 'st-rewards-popover',
  templateUrl: './rewards-popover.component.html',
  styleUrls: ['./rewards-popover.component.scss'],
})
export class RewardsPopoverComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  popoverConfig: popoverConfig;
  constructor() {}

  ngOnInit() {
    const condition = true;

    this.popoverConfig = {
      title: condition ? popoverTitles.redeemTittle : popoverTitles.scanTittle,
      type: condition ? PopupTypes.REDEEM : PopupTypes.SCAN,
      buttons: this.configureButtons(condition),
      message: this.data,
    };
  }

  ngAfterViewInit() {
    // this.initBarcode();
  }

  configureButtons(condition) {
    const scanBtns = [buttons.OKAY];
    const redeemBtns = [buttons.CANCEL, buttons.REDEEM];

    return condition ? redeemBtns : scanBtns;
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
  redeemTittle = 'Redeem Reward',
  scanTittle = 'Scan Code',
}

enum PopupTypes {
  REDEEM = 'REDEEM',
  SCAN = 'SCAN',
}

import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { popoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons } from 'src/app/core/utils/buttons.config';
import bwipjs from 'bwip-angular2';

@Component({
  selector: 'mobile-access-popover',
  templateUrl: './mobile-access-popover.component.html',
  styleUrls: ['./mobile-access-popover.component.scss'],
})
export class MobileAccessPopoverComponent implements OnInit, AfterViewInit {
  @Input() data: any;

  popoverConfig: popoverConfig;

  constructor(private popoverCtrl: PopoverController, barcodeScanner: BarcodeScanner) {}

  ngOnInit() {
    this.initPopover();
  }

  ngAfterViewInit() {
    this.initBarcode();
  }

  initPopover() {
    const { message, responseCode, showBarCode, showTempCode, validityTime, issuedCode } = this.data;

    if (responseCode !== null) {
      const error: boolean = responseCode !== '00' || false;

      this.popoverConfig = {
        ...this.popoverConfig,
        title: error ? popoverTitles.errorTittle : popoverTitles.successTittle,
        type: error ? PopupTypes.ERROR : PopupTypes.SUCCESS,
        buttons: this.configureButtons(!error),
      };
    } else {
      const barcodeCondition = showBarCode === 1 && showTempCode === 1;

      this.popoverConfig = {
        ...this.popoverConfig,
        title: barcodeCondition ? popoverTitles.barcodeTitle : popoverTitles.codeTittle,
        type: barcodeCondition ? PopupTypes.BARCODE : PopupTypes.CODE,
        buttons: this.configureButtons(true),
      };
    }

    // FOR NATIVE CODE (ANDROID, IOS ), for future:
    // const generatedBarcode =
    // this.barcodeScanner
    //   .encode(this.barcodeScanner.Encode.TEXT_TYPE, 'testText')
    //   .then(success => console.log(success), error => console.log(error));

    this.popoverConfig = {
      ...this.popoverConfig,
      message,
      code: issuedCode,
      validityTime,
    };
  }

  async onFinishTimeout(closeModal = 'CANCEL') {
    await this.popoverCtrl.dismiss(closeModal);
  }

  private initBarcode() {
    bwipjs(
      'barcodeCanvas',
      {
        bcid: 'pdf417',
        text: this.popoverConfig.code,
        includetext: false,
      },
      (err, cvs) => {}
    );
  }

  configureButtons(condition) {
    const successBtns = [buttons.OKAY];
    const errorBtns = [buttons.CANCEL, buttons.RETRY];

    return condition ? successBtns : errorBtns;
  }
}

enum PopupTypes {
  BARCODE = 'BARCODE',
  CODE = 'CODE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

enum popoverTitles {
  codeTittle = 'Enter Code',
  successTittle = 'Success!',
  errorTittle = 'Error',
  barcodeTitle = 'Scan Barcode',
}

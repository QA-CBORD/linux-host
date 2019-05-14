import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { popoverConfig } from 'src/app/core/model/popover/popover.model';
import bwipjs from 'bwip-angular2';
import { CONTENT_STRINGS } from '../mobile-acces.config';
import { MobileAccessService } from '../service';

@Component({
  selector: 'mobile-access-popover',
  templateUrl: './mobile-access-popover.component.html',
  styleUrls: ['./mobile-access-popover.component.scss'],
})
export class MobileAccessPopoverComponent implements OnInit, AfterViewInit {
  @Input() data: any;

  popoverConfig: popoverConfig;
  contentString: { [key: string]: string };

  constructor(
    private popoverCtrl: PopoverController,
    barcodeScanner: BarcodeScanner,
    private mobileAccessService: MobileAccessService
  ) {}

  ngOnInit() {
    this.setContentStrings();
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
        title: error ? this.contentString.errorResponseDialogHeader : this.contentString.successResponseDialogHeader,
        type: error ? PopupTypes.ERROR : PopupTypes.SUCCESS,
        buttons: this.configureButtons(!error),
      };
    } else {
      const barcodeCondition = showBarCode === 1 && showTempCode === 1;

      this.popoverConfig = {
        ...this.popoverConfig,
        title: barcodeCondition ? this.contentString.scanBarcodeDialogHeader : this.contentString.enterCodeDialogHeader,
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
    const successBtns = [
      {
        label: this.contentString.closeBtn,
        class: 'filled',
        shape: 'round',
        strong: false,
        fill: 'default',
      },
    ];
    const errorBtns = [
      {
        label: this.contentString.cancelBtn,
        class: 'clear',
        shape: 'round',
        strong: true,
        fill: 'clear',
      },
      {
        label: this.contentString.retryBtn,
        class: 'filled',
        shape: 'round',
        strong: false,
        fill: 'default',
      },
    ];

    return condition ? successBtns : errorBtns;
  }

  private setContentStrings() {
    let errorResponseDialogHeader = this.mobileAccessService.getContentValueByName(
      CONTENT_STRINGS.errorResponseDialogHeader
    );
    let successResponseDialogHeader = this.mobileAccessService.getContentValueByName(
      CONTENT_STRINGS.successResponseDialogHeader
    );
    let scanBarcodeDialogHeader = this.mobileAccessService.getContentValueByName(
      CONTENT_STRINGS.scanBarcodeDialogHeader
    );
    let enterCodeDialogHeader = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.enterCodeDialogHeader);
    let closeBtn = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.closeBtn);
    let retryBtn = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.retryBtn);
    let cancelBtn = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.cancelBtn);

    errorResponseDialogHeader = errorResponseDialogHeader ? errorResponseDialogHeader : '';
    successResponseDialogHeader = successResponseDialogHeader ? successResponseDialogHeader : '';
    scanBarcodeDialogHeader = scanBarcodeDialogHeader ? scanBarcodeDialogHeader : '';
    enterCodeDialogHeader = enterCodeDialogHeader ? enterCodeDialogHeader : '';
    closeBtn = closeBtn ? closeBtn : '';
    retryBtn = retryBtn ? retryBtn : '';
    cancelBtn = cancelBtn ? cancelBtn : '';

    this.contentString = {
      errorResponseDialogHeader,
      successResponseDialogHeader,
      scanBarcodeDialogHeader,
      enterCodeDialogHeader,
      closeBtn,
      retryBtn,
      cancelBtn,
    };
  }
}

enum PopupTypes {
  BARCODE = 'BARCODE',
  CODE = 'CODE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

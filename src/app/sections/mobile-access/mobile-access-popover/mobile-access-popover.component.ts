import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';
import bwipjs from 'bwip-angular2';
import { CONTENT_STRINGS } from '../mobile-acces.config';
import { MobileAccessService } from '../service';
import { buttons } from '../../../core/utils/buttons.config';

@Component({
  selector: 'mobile-access-popover',
  templateUrl: './mobile-access-popover.component.html',
  styleUrls: ['./mobile-access-popover.component.scss'],
})
export class MobileAccessPopoverComponent implements OnInit, AfterViewInit {
  @Input() data: any;

  popoverConfig: PopoverConfig<string>;
  contentString: { [key: string]: string };

  constructor(private popoverCtrl: PopoverController, private mobileAccessService: MobileAccessService) {}

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
      (err, cvs) => {
        return;
      }
    );
  }

  configureButtons(condition) {
    const successBtns = [{ ...buttons.OKAY, label: this.contentString.closeBtn }];
    const errorBtns = [
      { ...buttons.CANCEL, label: this.contentString.cancelBtn },
      { ...buttons.RETRY, label: this.contentString.retryBtn },
    ];
    return condition ? successBtns : errorBtns;
  }

  private setContentStrings() {
    const errorResponseDialogHeader = this.mobileAccessService.getContentValueByName(
      CONTENT_STRINGS.errorResponseDialogHeader
    );
    const successResponseDialogHeader = this.mobileAccessService.getContentValueByName(
      CONTENT_STRINGS.successResponseDialogHeader
    );
    const scanBarcodeDialogHeader = this.mobileAccessService.getContentValueByName(
      CONTENT_STRINGS.scanBarcodeDialogHeader
    );
    const enterCodeDialogHeader = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.enterCodeDialogHeader);
    const closeBtn = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.closeBtn);
    const retryBtn = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.retryBtn);
    const cancelBtn = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.cancelBtn);

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

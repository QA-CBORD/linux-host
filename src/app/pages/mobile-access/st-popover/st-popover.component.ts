import { Component, OnInit, Input } from '@angular/core';
import { Events, PopoverController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'st-popover',
  templateUrl: './st-popover.component.html',
  styleUrls: ['./st-popover.component.scss'],
})
export class StPopoverComponent implements OnInit {
  @Input() data: any;

  private popoverConfig: popoverConfig;

  constructor(private events: Events, private popoverCtrl: PopoverController, barcodeScanner: BarcodeScanner) {}

  ngOnInit() {
    this.initPopover();
  }

  async closeModal(closeModal) {
    await this.popoverCtrl.dismiss(closeModal);
  }

  initPopover() {
    const { message, responseCode, showBarCode, showTempCode, validityTime, issuedCode } = this.data;
    const error: boolean = responseCode !== '00' || false;
    const barcodeCondition = showBarCode === 1 && showTempCode === 1;

    const successBtns = [
      {
        label: 'OKAY',
        class: 'filled',
        shape: 'round',
        strong: false,
        fill: 'default',
      },
    ];
    const errorBtns = [
      {
        label: 'CANCEL',
        class: 'clear',
        shape: 'round',
        strong: true,
        fill: 'clear',
      },
      {
        label: 'RETRY',
        class: 'filled',
        shape: 'round',
        strong: false,
        fill: 'default',
      },
    ];

    if (responseCode !== null) {
      this.popoverConfig = {
        ...this.popoverConfig,
        title: error ? popoverTitles.errorTittle : popoverTitles.successTittle,
        type: error ? PopupTypes.ERROR : PopupTypes.SUCCESS,
        buttons: error ? errorBtns : successBtns,
      };
    } else {
      this.popoverConfig = {
        ...this.popoverConfig,
        title: barcodeCondition ? popoverTitles.barcodeTitle : popoverTitles.codeTittle,
        type: error ? PopupTypes.BARCODE : PopupTypes.CODE,
        buttons: successBtns,
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

interface popoverConfig {
  type: string;
  title: string;
  message: string;
  code: string;
  validityTime: number;
  buttons: any[];
}

import { Component, OnInit, Input } from '@angular/core';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons } from '../../../core/utils/buttons.config';

@Component({
  selector: 'st-global-popover',
  templateUrl: './st-global-popover.component.html',
  styleUrls: ['./st-global-popover.component.scss'],
})
export class StGlobalPopoverComponent implements OnInit {
  @Input() data: any;

  popoverConfig: PopoverConfig;
  contentString: { [key: string]: string };

  constructor() {}

  ngOnInit() {
    // this.setContentStrings();
    this.initPopover();
  }

  initPopover() {
    const { message, title, isRetryBtnExist } = this.data;

    this.popoverConfig = {
      ...this.popoverConfig,
      title,
      message,
      buttons: this.configureButtons(isRetryBtnExist),
    };
  }

  configureButtons(isRetryBtnExist) {
    if (!isRetryBtnExist) {
      return [{ ...buttons.CLOSE, label: 'CLOSE' }];
    }

    return [{ ...buttons.CLOSE, label: 'CLOSE' }, { ...buttons.RETRY, label: 'RETRY' }];
  }

  // private setContentStrings() {
  //   const errorResponseDialogHeader = this.mobileAccessService.getContentValueByName(
  //     CONTENT_STRINGS.errorResponseDialogHeader,
  //   );
  //   const successResponseDialogHeader = this.mobileAccessService.getContentValueByName(
  //     CONTENT_STRINGS.successResponseDialogHeader,
  //   );
  //   const scanBarcodeDialogHeader = this.mobileAccessService.getContentValueByName(
  //     CONTENT_STRINGS.scanBarcodeDialogHeader,
  //   );
  //   const enterCodeDialogHeader = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.enterCodeDialogHeader);
  //   const closeBtn = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.closeBtn);
  //   const retryBtn = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.retryBtn);
  //   const cancelBtn = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.cancelBtn);
  //
  //   this.contentString = {
  //     errorResponseDialogHeader,
  //     successResponseDialogHeader,
  //     scanBarcodeDialogHeader,
  //     enterCodeDialogHeader,
  //     closeBtn,
  //     retryBtn,
  //     cancelBtn,
  //   };
  // }
}

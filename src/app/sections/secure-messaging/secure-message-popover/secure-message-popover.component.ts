import { Component, OnInit, Input } from '@angular/core';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons } from '../../../core/utils/buttons.config';

@Component({
  selector: 'secure-message-popover',
  templateUrl: './secure-message-popover.component.html',
  styleUrls: ['./secure-message-popover.component.scss'],
})
export class SecureMessagePopoverComponent implements OnInit {
  @Input() data: any;

  popoverConfig: PopoverConfig<string>;
  contentString: { [key: string]: string };

  ngOnInit() {
    this.initPopover();
  }

  initPopover() {
    const { message, title } = this.data;

    this.popoverConfig = {
      ...this.popoverConfig,
      title,
      message,
      buttons: this.configureButtons(),
    };
  }

  configureButtons() {
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

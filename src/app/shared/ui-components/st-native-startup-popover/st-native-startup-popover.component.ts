import { Component, OnInit, Input } from '@angular/core';
import { StPopoverComponentDataModel } from '@shared/model/st-popover-data.model';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';

@Component({
  selector: 'st-native-startup-popover',
  templateUrl: './st-native-startup-popover.component.html',
  styleUrls: ['./st-native-startup-popover.component.scss'],
})
export class StNativeStartupPopoverComponent implements OnInit {
  @Input() data: StPopoverComponentDataModel;

  popoverConfig: PopoverConfig<string>;
  contentString: { [key: string]: string };

  ngOnInit() {
    // this.setContentStrings();
    this.initPopover();
  }

  initPopover() {
    const { message, title, buttons } = this.data;

    this.popoverConfig = {
      ...this.popoverConfig,
      title,
      message,
      buttons,
    };
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

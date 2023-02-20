import { Component, OnInit, Input } from '@angular/core';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons as BUTTONS } from '@core/utils/buttons.config';
import { PopupButton } from '@core/model/button';
import { StPopoverComponentDataModel } from '@shared/model/st-popover-data.model';

@Component({
  selector: 'st-global-popover',
  templateUrl: './st-global-popover.component.html',
  styleUrls: ['./st-global-popover.component.scss'],
})
export class StGlobalPopoverComponent implements OnInit {
  @Input() data: StPopoverComponentDataModel;

  popoverConfig: PopoverConfig<string>;
  contentString: { [key: string]: string };

  ngOnInit(): void {
    this.initPopover();
  }

  initPopover(): void {
    const { message, title, buttons, showClose } = this.data;

    this.popoverConfig = {
      ...this.popoverConfig,
      title,
      message,
      buttons: this.resolveButtons(buttons, showClose),
    };
  }

  resolveButtons(buttons = [], showCancelBtn = true): PopupButton[] {
    if (buttons.length && !showCancelBtn) {
      return buttons;
    }
    const cancelBtn = { ...BUTTONS.CLOSE, label: 'CLOSE' };
    return buttons.length ? [cancelBtn, ...buttons] : [cancelBtn];
  }
}

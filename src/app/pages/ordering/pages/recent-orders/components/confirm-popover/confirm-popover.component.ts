import { Component, Input, OnInit } from '@angular/core';
import { PopoverConfig } from "@core/model/popover/popover.model";
import { PopupTypes } from "@pages/rewards/rewards.config";
import { buttons } from "@core/utils/buttons.config";

@Component({
  selector: 'st-confirm-popover',
  templateUrl: './confirm-popover.component.html',
  styleUrls: ['./confirm-popover.component.scss'],
})
export class ConfirmPopoverComponent implements OnInit {
  @Input() data: { [key: string]: string };
  config: PopoverConfig;

  constructor() {}

  ngOnInit() {
    this.config = {
      type: PopupTypes.CANCEL,
      title: 'Cancel order?',
      buttons: [{ ...buttons.NO, label: 'no' }, { ...buttons.CANCELING_AGREEMENT, label: 'yes, cancel order' }],
      message: '',
      code: '',
      closeBtn: true,
    };

    this.config = {...this.config, ...this.data};
  }

}

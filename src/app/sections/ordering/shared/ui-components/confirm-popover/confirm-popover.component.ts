import { Component, Input, OnInit } from '@angular/core';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { PopupTypes } from '@sections/rewards/rewards.config';

@Component({
  selector: 'st-confirm-popover',
  templateUrl: './confirm-popover.component.html',
})
export class ConfirmPopoverComponent implements OnInit {
  @Input() data: { [key: string]: string };
  config: PopoverConfig<string>;

  ngOnInit() {
    this.config = {
      type: PopupTypes.CANCEL,
      title: '',
      buttons: [],
      message: '',
      code: '',
      closeBtn: true,
    };

    this.config = { ...this.config, ...this.data };
  }
}

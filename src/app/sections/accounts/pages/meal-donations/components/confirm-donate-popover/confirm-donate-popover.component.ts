import { Component, OnInit, Input } from '@angular/core';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons } from 'src/app/core/utils/buttons.config';

@Component({
  selector: 'confirm-donate-popover',
  templateUrl: './confirm-donate-popover.component.html',
  styleUrls: ['./confirm-donate-popover.component.scss'],
})
export class ConfirmDonatePopoverComponent implements OnInit {
  @Input() data: { [key: string]: string };

  popoverConfig: PopoverConfig;
  contentString: { [key: string]: string };

  constructor() {}

  ngOnInit() {
    this.initPopover();
  }

  initPopover() {
    this.popoverConfig = {
      title: 'Confirm Donate',
      type: 'SUCCESS',
      buttons: [{ ...buttons.CANCEL, label: 'CANCEL' }, { ...buttons.OKAY, label: 'DONATE' }],
      message: this.data,
    };
  }
}

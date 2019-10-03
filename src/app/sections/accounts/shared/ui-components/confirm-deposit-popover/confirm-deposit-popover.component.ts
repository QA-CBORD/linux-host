import { Component, OnInit, Input } from '@angular/core';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons } from 'src/app/core/utils/buttons.config';

@Component({
  selector: 'confirm-deposit-popover',
  templateUrl: './confirm-deposit-popover.component.html',
  styleUrls: ['./confirm-deposit-popover.component.scss'],
})
export class ConfirmDepositPopoverComponent implements OnInit {
  @Input() data: any;

  popoverConfig: PopoverConfig;
  contentString: { [key: string]: string };

  constructor() { }

  ngOnInit() {
    this.initPopover();
  }

  initPopover() {
    this.popoverConfig = {
      title: 'Confirm Deposit',
      type: 'SUCCESS',
      buttons: [{ ...buttons.CANCEL, label: 'CANCEL' }, { ...buttons.OKAY, label: 'DEPOSIT' }],
      message: this.data,
    };
  }
}

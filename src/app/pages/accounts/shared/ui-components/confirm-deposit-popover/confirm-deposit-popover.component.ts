import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { popoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons } from 'src/app/core/utils/buttons.config';

@Component({
  selector: 'confirm-deposit-popover',
  templateUrl: './confirm-deposit-popover.component.html',
  styleUrls: ['./confirm-deposit-popover.component.scss'],
})
export class ConfirmDepositPopoverComponent implements OnInit {
  @Input() data: any;

  popoverConfig: popoverConfig;
  contentString: { [key: string]: string };

  constructor(private popoverCtrl: PopoverController) {}

  ngOnInit() {
    this.initPopover();
  }

  initPopover() {
    // const { message, responseCode, showBarCode, showTempCode, validityTime, issuedCode } = this.data;

    this.popoverConfig = {
      title: 'Confirm Deposit',
      type: 'SUCCESS',
      buttons: [{ ...buttons.CANCEL, label: 'CANCEL' }, { ...buttons.OKAY, label: 'DEPOSIT' }],
      message: 'test',
    };
  }
}

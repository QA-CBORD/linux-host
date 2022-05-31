import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { buttons } from '@core/utils/buttons.config';

@Component({
  selector: 'st-confirm-fee-popover',
  templateUrl: './confirm-fee-popover.component.html',
  styleUrls: ['./confirm-fee-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmFeePopover implements OnInit {
  @Input() data: any;
  @Input() contentString: any;
  @Input() intructions?: any;
  popoverConfig: PopoverConfig<string | number>;

  ngOnInit() {
    this.setContentString();
    this.initPopover();
  }

  initPopover() {
    const { title, cancelButton, okButton } = this.contentString;
    this.popoverConfig = {
      title: title,
      type: 'SUCCESS',
      buttons: [{ ...buttons.CANCEL, label: cancelButton }, { ...buttons.OKAY, label: okButton }],
      message: this.data,
    };
  }

  get showDepositInstructions(): string {
    return this.intructions;
  }

  private setContentString() {
    this.contentString = {
      title: 'Confirm Payment',
      endingIn: 'ending in',
      okButton: 'Confirm',
      cancelButton: 'Cancel',
      paymentMethod: 'Card Type',
      depositAmount: 'Deposit Amount',
      account: 'Account',
    };
  }
}

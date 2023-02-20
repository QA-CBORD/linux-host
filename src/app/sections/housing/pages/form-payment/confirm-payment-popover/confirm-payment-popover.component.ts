import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { buttons } from '@core/utils/buttons.config';

@Component({
  selector: 'st-confirm-payment-popover',
  templateUrl: './confirm-payment-popover.component.html',
  styleUrls: ['./confirm-payment-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPaymentPopover implements OnInit {
  @Input() data: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() contentString: any;
  @Input() intructions?: string;
  popoverConfig: PopoverConfig<string | number>;
  disclaimer: string;

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

  get showDisclaimer(): string {
    return this.disclaimer;
  }

  private setContentString() {
    this.contentString = {
      title: 'Confirm Payment',
      endingIn: 'ending in',
      okButton: 'Confirm',
      cancelButton: 'Cancel',
      paymentMethod: 'Payment method',
      depositAmount: 'Amount',
      account: 'Account',
    };

    this.intructions =
      'Card Policy: As the storage database, USAePay is responsible for the processing of your card information for payment to this institution.';
    this.disclaimer = 'Once your payment is accepted, your Housing Form will be submitted and cannot be edited. ';
  }
}

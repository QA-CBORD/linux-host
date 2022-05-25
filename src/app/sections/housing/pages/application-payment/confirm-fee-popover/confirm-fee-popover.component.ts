import { Component, Input, OnInit } from '@angular/core';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { buttons } from '@core/utils/buttons.config';
import { ConfirmDepositCs } from '@sections/accounts/pages/deposit-page/deposit-page.content.string';

@Component({
  selector: 'st-confirm-fee-popover',
  templateUrl: './confirm-fee-popover.component.html',
  styleUrls: ['./confirm-fee-popover.component.scss'],
})
export class ConfirmPaymentPopover implements OnInit {
  @Input() data: any;
  @Input() contentString: ConfirmDepositCs = {} as any;
  @Input() intructions?: any;
  popoverConfig: PopoverConfig<string | number>;

  constructor() {}

  ngOnInit() {
    this.initPopover();
  }

  initPopover() {
    const { title, lblOkButton, lblCancelButton } = this.contentString;
    this.popoverConfig = {
      title: title,
      type: 'SUCCESS',
      buttons: [{ ...buttons.CANCEL, label: lblCancelButton }, { ...buttons.OKAY, label: lblOkButton }],
      message: this.data,
    };
  }

  get showDepositInstructions(): string {
    return this.popoverConfig.message['billme']
      ? this.contentString.depositReviewBillMe
      : this.contentString.depositReviewCredit || this.intructions;
  }
}

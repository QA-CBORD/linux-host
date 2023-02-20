import { Component, OnInit, Input } from '@angular/core';
import { ConfirmDepositCs } from '@sections/accounts/pages/deposit-page/deposit-page.content.string';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons } from 'src/app/core/utils/buttons.config';
@Component({
  selector: 'confirm-deposit-popover',
  templateUrl: './confirm-deposit-popover.component.html',
  styleUrls: ['./confirm-deposit-popover.component.scss'],
})
export class ConfirmDepositPopoverComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() contentString: ConfirmDepositCs = {} as any;
  @Input() instructions?: string;
  popoverConfig: PopoverConfig<string | number>;

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
      :  this.contentString.depositReviewCredit || this.instructions;
  }
}

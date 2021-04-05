import { Component, OnInit, Input } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons } from 'src/app/core/utils/buttons.config';
import { ConfirmDepositCsModel } from './confirm-deposit-content-string.model';

@Component({
  selector: 'confirm-deposit-popover',
  templateUrl: './confirm-deposit-popover.component.html',
  styleUrls: ['./confirm-deposit-popover.component.scss'],
})
export class ConfirmDepositPopoverComponent implements OnInit {
  @Input() data: any;
  @Input() contentString: ConfirmDepositCsModel;
  popoverConfig: PopoverConfig<string | number>;

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

  get showDepositInstructions(): boolean {
    return (this.popoverConfig.message['billme'] ? this.data.depositReviewBillMe : this.data.depositReviewCredit);
  }
}

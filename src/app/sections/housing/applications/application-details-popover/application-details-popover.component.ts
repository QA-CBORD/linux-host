import { Component, Input, OnInit } from '@angular/core';
import { PopoverConfig } from '@core/model/popover/popover.model';

@Component({
  selector: 'st-application-details-popover',
  templateUrl: './application-details-popover.component.html',
  styleUrls: ['./application-details-popover.component.scss'],
})
export class ApplicationDetailsPopover implements OnInit {
  popoverConfig: PopoverConfig<string>;

  constructor() {}

  ngOnInit(): void {
    this.initPopover();
  }

  initPopover() {
    this.popoverConfig = {
      title: 'Application Details',
      closeBtn: true,
      message: {
        name: 'MXD2 23.1.29 Appl Pmt Roommate',
        created: '01/28/23',
        firstSubmitted: '01/29/23',
        lastSubmitted: '01/30/23',
      },
      ...this.popoverConfig,
    };
  }

  longText(length: number) {
    const maxTextLength = 30;
    return length > maxTextLength ? 'long-font': '';
  }
}

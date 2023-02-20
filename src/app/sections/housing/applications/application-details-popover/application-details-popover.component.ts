import { Component, Input, OnInit } from '@angular/core';
import { PopoverConfig } from '@core/model/popover/popover.model';

@Component({
  selector: 'st-application-details-popover',
  templateUrl: './application-details-popover.component.html',
  styleUrls: ['./application-details-popover.component.scss'],
})
export class ApplicationDetailsPopover implements OnInit {
  popoverConfig: PopoverConfig<string>;
  @Input() data: any = {};
  constructor() {}

  ngOnInit(): void {
    this.initPopover();
  }

  initPopover() {
    this.popoverConfig = {
      title: 'Application Details',
      closeBtn: true,
      ...this.popoverConfig,
    };
  }
}

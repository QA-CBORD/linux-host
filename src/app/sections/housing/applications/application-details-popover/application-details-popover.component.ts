import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { ShortApplicationDetails } from './short-application-details';

@Component({
  selector: 'st-application-details-popover',
  templateUrl: './application-details-popover.component.html',
  styleUrls: ['./application-details-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationDetailsPopover implements OnInit {
  popoverConfig: PopoverConfig<string>;
  @Input() details: ShortApplicationDetails;

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

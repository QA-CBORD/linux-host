import { Component, OnInit, Input } from '@angular/core';
import { PopoverConfig } from 'src/app/core/model/popover/popover.model';
import { buttons } from 'src/app/core/utils/buttons.config';

@Component({
  selector: 'success-popover',
  templateUrl: './success-popover.component.html',
  styleUrls: ['./success-popover.component.scss'],
})
export class SuccessPopoverComponent implements OnInit {
  @Input() data: any;

  popoverConfig: PopoverConfig;
  contentString: { [key: string]: string };

  ngOnInit() {
    this.initPopover();
  }

  initPopover() {
    this.popoverConfig = {
      title: 'Successful operation',
      type: 'SUCCESS',
      buttons: [{ ...buttons.OKAY, label: 'OKAY' }],
      message: 'Card was successfully added',
    };
  }
}

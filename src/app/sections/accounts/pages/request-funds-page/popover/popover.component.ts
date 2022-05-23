import { Component, Input, OnInit } from '@angular/core';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { PopupTypes } from '@sections/rewards/rewards.config';
import { buttons } from '@core/utils/buttons.config';

@Component({
  selector: 'st-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() data: { [key: string]: string };
  config: PopoverConfig<string>;

  ngOnInit() {
    this.config = {
      type: PopupTypes.CANCEL,
      title: null,
      buttons: [{ ...buttons.CLOSE, label: 'done' }],
      message: '',
      code: 'center',
    };
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { PopupTypes } from '@sections/rewards/rewards.config';
import { buttons } from '@core/utils/buttons.config';

@Component({
  selector: 'st-item-detail-modal',
  templateUrl: './item-detail-modal.component.html',
  styleUrls: ['./item-detail-modal.component.scss'],
})
export class ItemDetailModalComponent implements OnInit {
  @Input() message: string;
  config: PopoverConfig<string>;

  ngOnInit() {
    this.config = {
      type: PopupTypes.SUCCESS,
      title: null,
      buttons: [{ ...buttons.OKAY, label: 'ok' }],
      message: '',
      code: '',
    };
  }

}
